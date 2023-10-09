import User from "../models/user.js";
import { ValidateLogin } from "../validation/login.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Fonction pour créer un nouvel utilisateur
export async function createUser(req, res) {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    const { name, email } = newUser;
    return res.status(200).json({ name, email });
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({
      errors: err?.errors?.map((e) => e.message) || [
        "An error occurred during user creation.",
      ],
    });
  }
}

// Fonction pour récupérer la liste des utilisateurs
export async function getUsers(req, res) {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    return res.status(200).json(users);
  } catch {
    return res.status(404).json(null);
  }
}

// Fonction pour afficher les détails d'un utilisateur
export async function getUser(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    const { id, name, email } = user;
    return res.status(200).json({ id, name, email });
  } catch {
    return res.json({ errors: ["User not found"] });
  }
}

// Fonction pour mettre à jour un utilisateur
export async function updateUser(req, res) {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ errors: ["User not found"] });
    }

    const newUserData = await user.update(req.body);
    const { id, name, email } = newUserData;
    return res.status(200).json({ id, name, email });
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
}

// Fonction pour supprimer un utilisateur
export async function deleteUser(req, res) {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ errors: ["User not found"] });
    }

    await user.destroy();
    return res.status(200);
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
}

export async function Login(req, res) {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    console.log(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (!user) {
          errors.email = "User Not Found";
          res.status(404).json(errors);
        } else {
          bcrypt
            .compare(req.body.password, user.password_hash)
            .then((isMatch) => {
              if (!isMatch) {
                errors.password = "incorrect information";
                res.status(401).json(errors);
              } else {
                var token = jwt.sign(
                  {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                  },
                  process.env.TOKEN_SECRET,
                  { expiresIn: process.env.TOKEN_EXPIRATION }
                );
                res.status(200).json({
                  message: "success",
                  token: "Bearer " + token,
                });
              }
            });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
}
