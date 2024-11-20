const express = require("express");
const app = express();
//app.use(middle) - 모든요청에서 미들웨어 실행
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
//app.use('/ttt',middle) - ttt로시작하는 모든요청에서 실행
app.use("/ttt/:id", (req, res, next) => {
  console.log("ttt-use!!");
  next();
});
//app.get('ttt',middle) - ttt로시작하는 get요청에서
app.get("/ttt/:id", (req, res) => {
  console.log("ttt-get!!");
  //console.log("req.params>>", req.params);
  //console.log("req.query>>", req.query);
  const id = req.params.id; //const {id}=req.params
  const name = req.query.name;
  if (!id || !name) {
    res.status(403).send("Input the name");
    return;
  }
  res.send({ id, name });
});

let users = [{ id: 1, name: "Hong", email: "hong@gmail.com" }];

app.post("/users", (req, res) => {
  const { email, name } = req.body;
  console.log("req.body>>", req.body);
  console.log("body: ", email, name);
  const id = Math.max(...users.map(({ id }) => id), 0) + 1;

  const user = { id, email, name };
  users.push(user);
  res.status(200).send(user);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.patch("/users/:id", (req, res) => {
  const { id: userid } = req.params;
  const { email, name } = req.body;
  const user = users.find(({ id }) => id === +userid);
  if (!user) {
    return res.status(404).send({ message: "Not Found User" });
  }
  user.email = email;
  user.name = name;
  res.send(user); //성공
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = [...users.filter((user) => user.id != id)];
  res.send({ message: "Ok" });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server's started on ${PORT}...`);
  console.log("http://localhost:" + PORT + "/ttt/100?name=hong");
});
