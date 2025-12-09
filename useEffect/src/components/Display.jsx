const Display = ({ items }) => {
  return (
    <div>
      <h1>Items from Backend</h1>
      {items.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default Display;
