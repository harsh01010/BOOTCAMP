import Button from "./Button";
export default function Friend({ friend, selectedFriend, bal, onSelection }) {
  //if (friend.id === selectedFriend.id) friend.balance = bal;
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {-1 * friend.balance}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>You and Your Friend are Even.</p>}

      <Button click={handleSelection}>
        {selectedFriend === friend ? "Close" : "Select"}
      </Button>
    </li>
  );
  function handleSelection() {
    if (selectedFriend === friend) onSelection(null);
    else onSelection(friend);
  }
}
