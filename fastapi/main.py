from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models, database

# Create Tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

origins = [
    "http://localhost:5173",    # React port
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Allowed frontend URLs
    allow_credentials=True,
    allow_methods=["*"],          # Allow all HTTP methods
    allow_headers=["*"],          # Allow all headers
)


# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally :
        db.close()


# Pydantic model
class ItemSchema(BaseModel):
    name:str
    

@app.get("/items")
def get_items(db: Session = Depends(get_db)):
    return db.query(models.Item).all()


@app.post("/items")
def create_item(item : ItemSchema,db:Session = Depends(get_db)):
    db_item = models.Item(name= item.name)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/items/{item_id}")
def update_item(item_id:int, item:ItemSchema,db:Session= Depends(get_db)):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not db_item:
        return {"error":"Item not found"}
    db_item.name = item.name  
    db.commit()
    db.refresh(db_item)
    
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db:Session = Depends(get_db)):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not db_item:
        return {"error":"Item not found"}
    db.delete(db_item)
    db.commit()
    
    return {"message":"Item deleted successfully"}