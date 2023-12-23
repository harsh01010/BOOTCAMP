import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
/*
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 2, packed: true },
];
*/

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdateItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm("Are you sure to clear the list?");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onUpdateItems={handleUpdateItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

/*
state vs props
state:
internal data,owned by component
can be updated by the component itself
used to make components interactive


props:
external data,owned by parent component
similar to function parameters
read-only
receiving new props causes component to re-render.usually when the parent's state has been updated
used by parent to configure child component

types of state:
local state
global state
we should always start with local state

we can only pass proms from parent to it's children not between siblings , this problem can be handled by createing the state in the parent and passing it as props to children.(lift state up to first common parent)
since we cannot update the props , we can also pass the setState function in props which can be used to update the state variable of the parent component.

*/
