const User = require("../models/User");
const util = require("../util");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const user_id = id ? { _id: id } : {};

    const users = await User.find(user_id).sort({ name: 1 });

    res.json(users);
  },

  async signin(req, res) {
    // "Basic YWduc3Vwb3J0ZUBnbWFpbC5jb206Z29tZXNkYWNvc3Rh"
    const [, hash] = req.headers.authorization.split(" ");
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");
    try {
      const signinUser = await User.findOne({ email, password });
      if (signinUser) {
        res.send({
          signinUser,
          token: util.getToken(signinUser),
        });
      } else {
        res.status(401).send({ message: "Invalid Data."});
      }
    } catch (error) {
      res.send(401, error);
    }
  },

  async delete(req, res) {
    const deletedUser = await User.findById(req.params.id);
    if (deletedUser) {
      await deletedUser.remove();
      res.send({ message: "Cred Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
  },

  async updated(req, res) {
    const user_id = req.params.id;
    const user = await User.findById(user_id);

    const { name, email, password } = req.body;

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;

      const updatedUser = await user.save();

      if (updatedUser) {
        res.send({
          _id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: util.getToken(updatedUser),
        });
      }
    }

    return res.status(500).send({ message: " Error in Updating User." });
  },

  async register(req, res) {
    const { name, email, password } = req.body;
    
    try {
      const user = new User({ name, email, password });
      const newUser = await user.save();

      if (newUser) {
        res.status(200).json({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: util.getToken(newUser),
        });
      } else {
        res.status(401).json({ message: "Invalid Data." });
      }
    } catch (err) {
      res.status(401).json({ err });
    }
  },
};
