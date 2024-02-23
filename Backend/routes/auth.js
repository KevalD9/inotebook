const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "$Kev@l";

//Route - 1 => Create a user using : POST "/api/auth/createuser". No Login Required
router.post(
  "/createuser",
  //Express-validator error for body fields
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    //If there are error then send them back in the response with status as Bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      //check whether user with this email already exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry User with same email is already existing." });
      }

      //Create a hash of password using bcryptjs package.
      var salt = await bcrypt.genSaltSync(10);
      var securePwd = await bcrypt.hashSync(req.body.password, salt);

      //Othewise create user with body data and save it to database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePwd,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Problem." });
    }

    //res.json(user);
  }
);

//Route - 2 => Authenticate User : POST "/api/auth/login". No Login Required
router.post(
  "/login",
  //Express-validator error for body fields
  [
    body("email").isEmail().withMessage("Enter a valid e-mail address."),
    body("password").exists().withMessage("Password cannot be blank."),
  ],
  async (req, res) => {
    //If there are error then send them back in the response with status as Bad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    //Destructur email & pwd value from user input
    const { email, password } = req.body;

    try {
      //check whether user with this email already exists or not
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please, Use correct login credentials." });
      }

      const comparePwd = await bcrypt.compareSync(password, user.password);
      if (!comparePwd) {
        return res
          .status(400)
          .json({ error: "Please, Use correct login credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Problem." });
    }
  }
);

//Route - 3 => Get Loggined in User details using : POST "/api/auth/getuser". Login Required.
router.post("/getuser", fetchUser ,async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Problem." });
      }
});

module.exports = router;
