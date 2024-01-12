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
  function handleSplitBalUpdate(val) {
    console.log(allFriends[0].id === allFriends[1].id);
    console.log(val, selectedFriend.id);
    setAllFriends((friends) =>
      friends.map((friend) =>
        friend.name === selectedFriend.name
          ? { ...friend, balance: friend.balance + val }
          : friend
      )
    );
    setSelectedFriend(null);
  }
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
          onSplitBill={handleSplitBalUpdate}
        ></FormSplitBill>
      )}
    </div>
  );
}
