import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;
const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, "G@#FCs5,2Bpy!wN}YCVE", {
    expiresIn: maxAge
  });
};


exports.changePass = async (req, res) => {
  const id = req.body.user;
  const enteredCode = req.body.passcode;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(enteredCode, salt, function(err, hash) {
      console.log("saltRounds");
      console.log(saltRounds);
      console.log(salt);
      console.log(hash);
      User.findByIdAndUpdate({ _id: id }, { password: hash }, () => {
        res.status(200).json({
          message: "updated"
        });
      });
    });
  });
};

exports.authPass = async (req, res) => {
  const enteredCode = req.body.code;
  const phoneNumber = req.body.phone;
  try {
    const auth = { phone: phoneNumber };
    const userInfo = await User.findOne(auth);
    if (userInfo) {
      bcrypt.compare(enteredCode, userInfo.password, function(err, result) {
        if (result) {
          const token = createToken(userInfo._id);
          res
            .status(201)
            .json({ auth: true, userInfo: userInfo, authKey: token });
        } else {
          res.status(201).json({ auth: false });
        }
      });
    } else {
      res.status(201).json({ auth: false });
    }
  } catch (error) {
    res.status(201).json({ auth: false });
    console.log(error);
  }
};

exports.authGoogle = async (req, res) => {
  const googleId = req.body.googleId;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const profilePic = req.body.profilePic;
  try {
    const userInfo = await User.findOne({ googleId: googleId });
    if (userInfo) {
      const token = createToken(userInfo._id);
      res.status(201).json({ auth: true, userInfo: userInfo, authKey: token });
    } else {
      const NewUser = { googleId, name, surname, email, profilePic };
      const createdUser = await User.create(NewUser);
      const token = createToken(createdUser._id);
      res
        .status(201)
        .json({ auth: true, userInfo: createdUser, authKey: token });
    }
  } catch (error) {}
};

exports.auth = async (req, res) => {
  console.log("token taken");
  let token = req.body.token;
  if (token) {
    console.log("token verifing");
    jwt.verify(token, "G@#FCs5,2Bpy!wN}YCVE", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        //console.log("id: " + decodedToken.id);
        const userInfo = await User.findById(decodedToken.id).select("phone email name surname birthDay profilePic");
        console.log("token verifing ok");
        //console.log("userinfobeforeid: " + userInfo);
        res.status(201).json({ user: userInfo });
      }
    });
  } else {
    res.status(201).json({ user: null });
  }
};

exports.update = async (req, res) => {
  let id = req.body.id;
  let where = req.body.where;
  let value = req.body.value;
  if (where != "phone") {
    try {
      User.findByIdAndUpdate({ _id: id }, { [where]: value }, () => {
        res.status(200).json({
          message: "updated"
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    await generateSMS(value);
    res.status(200).json({
      message: "generated"
    });
  }
};

exports.newUser = async (req, res) => {
  const user = req.body.user;
  const phone = user.phone;
  const isset = await User.findOne({ phone });

  if (isset != null && isset != undefined) {
    res.status(201).json({ user: isset, message: "Bu numara kullanılmakta" });
  } else {
    const newuser = await User.create(user);
    res
      .status(201)
      .json({ user: newuser, message: "Kullanıcı Kaydı Başarılı" });
  }
};


