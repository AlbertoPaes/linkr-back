import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../config/db.js"

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows: users } = await db.query(`SELECT * 
    FROM users 
    WHERE email=$1
    `, [email]);

    const [user] = users
    if (!user) {
      return res.sendStatus(401);
    }
  
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.query(`INSERT INTO sessions (token, "userId") 
      VALUES ($1, $2)
      `, [token, user.id])
      return res.send(token);
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

    const existingUser = await db.query(`
    SELECT * 
    FROM users 
    WHERE email=$1
    `,[user.email]);

    if(existingUser.rowCount > 0){
      return res.sendStatus(409).send("There is already a user registered with this email!");
    }

    delete user.confirmPassword;

    await db.query(`
    INSERT INTO users (name,email,password,image)
    VALUES ($1,$2,$3,$4)
    `,[user.name,user.email,passwordHash,user.image]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

const modulesAuthController = { signUp,signIn };
export default modulesAuthController;