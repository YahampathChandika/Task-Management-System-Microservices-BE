const bcrypt = require("bcrypt");
const authService = require("../service/auth.service");
const { sign } = require("jsonwebtoken");

//Login User
async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await authService.login(username);

    if (!user) {
      return res.json({
        status: 400,
        error: true,
        payload: "Invalid Username or Password",
      });
    } else {
      bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) {
          res.status(400).json({
            error: true,
            payload: "Invalid Username or Password",
          });
        } else {
          const accessToken = sign(
            { username: user.username, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.status(200).json({
            error: false,
            payload: accessToken,
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

module.exports = {
  login,
};
