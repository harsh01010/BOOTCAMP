export default function Item({ item, onDeleteItems, onUpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onUpdateItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity + " "}
        {item.description}
      </span>
      <button onClick={(e) => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
