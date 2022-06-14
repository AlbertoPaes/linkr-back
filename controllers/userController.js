import db from "../config/db.js"
import bcrypt from "bcrypt";

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
      return res.sendStatus(409);
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

const modulesSignUpController = { signUp };
export default modulesSignUpController;