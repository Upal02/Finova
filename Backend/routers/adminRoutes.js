const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/dashboard", auth, role("admin"), (req, res) => {
  res.json({
    message: "Admin Dashboard",
  });
});

module.exports = router;