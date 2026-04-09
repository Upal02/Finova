const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser, findUserByEmail } = require("../models/userModel");
const { signupSchema, loginSchema } = require("../validation/authValidation");
const { SECRET_KEY } = require("../env");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await createUser({
      ...req.body,
      password: hashedPassword,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const user = await findUserByEmail(req.body.email);

    if (!user) return res.status(404).json("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};