const User = require("../models/user");

async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      code: 200,
      data: { message: "Please complete the information first." },
    });
  }
  try {
    const user = await User.findOne({ email }, null, {
      collation: { locale: "en", strength: 2 },
    });
    if (user && user.active) {
      const pass = await user.comparePassword(password);
      if (pass) {
        return req.logIn(user, function (err) {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
      }
      return res.json({
        code: 200,
        data: { message: "The email or password is incorrect, please check and try it again." },
      });
    }
    return res.json({
      code: 200,
      data: { message: `Cannot find email: ${email}, you should register first.` },
    });
  } catch (error) {
    return next(error);
  }
}

async function register(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.json({
      code: 200,
      data: "Please complete the information first.",
    });
  }
  const result = await User.findOne({ email }, null, {
    collation: { locale: "en", strength: 2 },
  });
  if (result) {
    return res.json({
      code: 200,
      data: "The email address has registered, you can log in directly.",
    });
  }
  const user = new User({
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  });
  try {
    await user.save();
    return res.json({
      code: 200,
      data: "Registration complete! You can login with your new account now.",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { login, register };
