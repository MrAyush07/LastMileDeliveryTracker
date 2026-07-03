const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const areaRoutes = require("./routes/areaRoutes");
const rateCardRoutes = require("./routes/rateCardRoutes");
const deliveryAgentRoutes = require("./routes/deliveryAgentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");


// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/areas", areaRoutes);
app.use("/api/admin/ratecards", rateCardRoutes);
app.use("/api/admin/agents", deliveryAgentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.send("🚀 Last Mile Delivery Tracker Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});