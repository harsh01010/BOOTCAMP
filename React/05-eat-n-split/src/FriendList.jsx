import Friend from "./Friend";
export default function FriendList({
  allFriends,
  selectedFriend,
  bal,
  onSelection,
}) {
  const friends = allFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          bal={bal}
          onSelection={onSelection}
        ></Friend>
      ))}
    </ul>
  );
}
