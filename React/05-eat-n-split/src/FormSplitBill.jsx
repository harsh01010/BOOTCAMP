import { useState } from "react";
import Button from "./Button";
export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [exp, setExp] = useState("");
  const [friendBill, setFriendBill] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const pay = e.target[3].value;
    onSplitBill(pay === "user" ? Number(friendBill) : -Number(exp));
    setBill(0);
    setExp(0);
    setFriendBill(0);
  }
  function handleBill(e) {
    setBill(e.target.value);
    setFriendBill(String(Number(e.target.value) - Number(exp)));
  }
  function handleExp(e) {
    setExp(e.target.value);
    setFriendBill(String(Number(bill) - Number(e.target.value)));
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
