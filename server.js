import { compareSync, hashSync } from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import JWT from "jsonwebtoken";
import { Cow, User } from "./models.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/reg", async (req, res) => {
  const { name, email, password, birthYear } = req.body ?? {};
  if (!(name && email && password && birthYear))
    return res.status(400).json({ msg: "Missing attributes!" });
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser)
    return res.status(409).json({ msg: "Email already taken!" });
  await User.create({ name, email, password: hashSync(password), birthYear });
  res.json({ msg: "Success!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!(email && password))
    return res.status(400).json({ msg: "Missing attributes!" });
  const user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(404).json({ msg: "No user exists with that email!" });
  if (!compareSync(password, user.password))
    return res.status(401).json({ msg: "Wrong password!" });
  res.json({
    msg: "Success!",
    token: JWT.sign({ UserId: user.id }, process.env.SECRET),
  });
});

app.get("/allCow", async (req, res) => res.json(await Cow.findAll()));

async function Auth(req, res, next) {
  try {
    const token = req.headers.authorization.replace(/^Bearer /, "");
    const UserId = JWT.verify(token, process.env.SECRET).UserId;
    res.locals.user = await User.findByPk(UserId);
    next();
  } catch {
    res.status(401).json({ msg: "You must be logged in to do this!" });
  }
}

app.post("/buyCow", Auth, async (req, res) => {
  const { name, age, gender } = req.body ?? {};
  if (!(name && age && gender))
    return res.status(400).json({ msg: "Missing attributes!" });
  await res.locals.user.createCow({ name, age, gender });
  res.json({ msg: "Success!" });
});

app.delete("/sellCow/:id", Auth, async (req, res) => {
  const id = req.params.id ?? {};
  if (!id) return res.status(400).json({ msg: "Missing parameter!" });
  const cow = await Cow.findByPk(id);
  if (!cow) return res.status(404).json({ msg: "Cow not found!" });
  await cow.destroy();
  res.json({ msg: "Success!" });
});

app.get("/getCow", Auth, async (req, res) =>
  res.json(await res.locals.user.getCows()),
);

const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port}`));
