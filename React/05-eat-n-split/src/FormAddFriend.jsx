import { useState } from "react";
import Button from "./Button";
export default function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState(`https://i.pravatar.cc/48`);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !url) return;
    const id = crypto.randomUUID;
    console.log(id);
    const newFriend = {
      id,
      name,
      image: `${url}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend((p) => [...p, newFriend]);

    setName("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤼 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📸 Image URl</label>
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
}
