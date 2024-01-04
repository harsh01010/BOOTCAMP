import { useState } from "react";
import Button from "./Button";
export default function FormSplitBill({ selectedFriend, setBal, bal }) {
  const [bill, setBill] = useState(0);
  const [exp, setExp] = useState(0);
  const [friendBill, setFriendBill] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    const pay = e.target[3].value;
    if (pay === "user") setBal(friendBill);
    else setBal(-exp);
    console.log(bal);
    setBill(0);
    setExp(0);
    setFriendBill(0);
  }
  function handleBill(e) {
    setBill(Number(e.target.value));
    setFriendBill(e.target.value - exp);
  }
  function handleExp(e) {
    setExp(Number(e.target.value));
    setFriendBill(bill - e.target.value);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input type="text" value={bill} onChange={handleBill} />
      <label>💸 Your expense</label>
      <input type="text" value={exp} onChange={handleExp} />
      <label>👬 {selectedFriend.name}'s bill</label>
      <input type="text" disabled value={String(friendBill)} />

      <label>🤑 who is paying the bill</label>
      <select>
        <option value={"user"}>You</option>
        <option value={"friend"}>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
