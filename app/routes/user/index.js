const router = require("express").Router();
const user = require("../../controller/user");

router.post("/login", (req, res) => {
  try {
    user.login(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res) => {
  try {
    user.logout(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/add", (req, res) => {
  try {
    user.add(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/update", (req, res) => {
  try {
    user.update(req, res);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
