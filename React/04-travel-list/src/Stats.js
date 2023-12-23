export default function Stats({ items }) {
  const total = items.length; // derived state
  const checked = items.reduce((acc, item) => {
    if (item.packed) acc += 1;
    return acc;
  }, 0);
  const percentage = Math.round((checked / total) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everything needed 🚁"
          : `You have ${total} items on your list , and you already packed ${checked}(
          ${percentage}%)`}
      </em>
    </footer>
  );
}
