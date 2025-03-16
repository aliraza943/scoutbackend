const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("../src/config/db");
const authRoutes = require('../src/routes/authRoutes')

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
