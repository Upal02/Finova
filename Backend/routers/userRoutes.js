const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

router.get("/dashboard", auth, (req, res) => {
  res.json({
    message: "User Dashboard",
    user: req.user,
  });
});

module.exports = router;