let users = [];

function trimStr(str) {
  return str.trim().toLowerCase();
}

function addUser(user) {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  const isExist = users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom
  );

  if (!isExist) users.push(user);

  return { isExist: !!isExist, user: isExist || user };
}

const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

const removeUser = ({ name, room }) => {
  users = users.filter((user) => user.name !== name && user.room === room);
  return { name, room };
};

module.exports = { addUser, getRoomUsers, removeUser };
