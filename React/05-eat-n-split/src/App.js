import { useState } from "react";
import Button from "./Button";
import FormSplitBill from "./FormSplitBill";
import FormAddFriend from "./FormAddFriend";
import FriendList from "./FriendList";
export default function App() {
  const [addFriend, setAddfriend] = useState(false);
  function handleShowAddFriend() {
    setAddfriend((show) => !show);
  }
  const [allFriends, setAllFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleSelection(friend) {
    setSelectedFriend(friend);
  }
  const [bal, setBal] = useState(0);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          allFriends={allFriends}
          selectedFriend={selectedFriend}
          setBal={bal}
          onSelection={handleSelection}
        />
        {addFriend && <FormAddFriend onAddFriend={setAllFriends} />}
        <Button click={handleShowAddFriend}>
          {!addFriend ? "Add friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setBal={setBal}
          bal={bal}
        ></FormSplitBill>
      )}
    </div>
  );
}
