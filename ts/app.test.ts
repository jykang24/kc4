import { deleteUser, saveUser, fetchUsers } from "./fetch";

const HONG = { id: 1, name: "Hong", email: "hong@gmail.com" };
const KIM = { id: 2, email: "ttochi0105@naver.com", name: "JY" };
const KIM2 = { id: 2, email: "new@gmail.com", name: "newname" };
const afterPostUsers = [HONG, KIM];
const afterPostUsers2 = [HONG, KIM2];

// jest.mock("./fetch", () => ({
//   fetchUsers: () => afterPostUsers,
//   saveUser: () => KIM,
// }));

describe("fetch- /users", () => {
  test("users - get", async () => {
    const users = await fetchUsers();
    expect(users).toEqual(HONG);
  });

  test("users - post", async () => {
    const name = KIM.name;
    const email = KIM.email;
    const user = await saveUser({ name, email, id: 0 });
    expect(user).toEqual(KIM);
  });
  test("users - get", async () => {
    const users = await fetchUsers();
    expect(users).toEqual(afterPostUsers);
    //expect(users).toBeUndefined();
    //expect(users).toBe(undefined);
  });

  //UPDATE짜보기 수정한거 확인후 DELETE
  //test("users-update", async () => {});
  test("users - patch", async () => {
    const email = KIM2.email;
    const name = KIM2.name;

    const user = await saveUser({ name, email, id: 2 });
    expect(user).toEqual(KIM2);
  });

  test("users - get - afterPatch", async () => {
    const users = await fetchUsers();
    expect(users).toEqual(afterPostUsers2);
    //expect(users).toBeUndefined();
    //expect(users).toBe(undefined);
  });

  test("users - delete", async () => {
    const users = await deleteUser(KIM.id);
    expect(users).toEqual({ message: "Ok" });
  });

  test("users - get", async () => {
    const users = await fetchUsers();
    expect(users).toEqual([{ id: 1, name: "Hong", email: "hong@gmail.com" }]);
  });
});
