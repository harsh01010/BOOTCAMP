export default function Button({ click, children }) {
  return (
    <button className="button" onClick={click}>
      {children}
    </button>
  );
}
