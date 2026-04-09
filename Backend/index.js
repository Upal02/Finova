const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");
const adminRoutes = require("./routers/adminRoutes");

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});