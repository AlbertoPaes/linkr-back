import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { authRepository } from "../repositories/authRepository.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows: users } = await authRepository.getByEmail(email);

    const [user] = users
    if (!user) {
      return res.sendStatus(401);
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      const body = { token, image: user.image }
      await authRepository.createSession(token,user.id);
      return res.status(200).send(body);
    }
    res.sendStatus(401); // Unauthorized
  } catch (err) {
    console.log("Error logging in user.", err);
    res.status(500).send("Error logging in user.");
  }
};

const signUp = async (req, res) => {
  const user = req.body;

  try {
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(user.password, SALT);

    const existingUser = await authRepository.getByEmail(user.email);

    if (existingUser.rowCount > 0) {
      return res.sendStatus(409).send("There is already a user registered with this email!");
    }

    delete user.confirmPassword;
    await authRepository.createUser(user.name, user.email, passwordHash, user.image);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const modulesAuthController = { signUp, signIn };
export default modulesAuthController;