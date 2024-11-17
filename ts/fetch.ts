export type User = {
  id: number;
  name: string;
  email: string;
};

const BASE_URL = "http://localhost:7000/users";

export async function fetchUsers() {
  const users = (await fetch(BASE_URL).then((res) => res.json())) as User;
  return users;
}

export async function saveUser(user: User) {
  const isAdding = user.id === 0;
  const url = isAdding ? BASE_URL : `${BASE_URL}/${user.id}`;
  const newer = await fetch(url, {
    method: isAdding ? "POST" : "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  return newer as User; //Promise에 <any>가 아닌 User로 줄려고
}
//fetchUsers().then((users) => console.log("users:", users));

export async function deleteUser(id: number) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export async function updateUser(user: User) {}
