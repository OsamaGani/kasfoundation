const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const galleryRoutes = require("./routes/galleryRoutes");
const teamRoutes = require("./routes/teamRoutes");
const newsRoutes = require("./routes/newsRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const venueRoutes = require("./routes/venueRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.171.57.75:5173",
      "https://kasfoundation.usamagani030.workers.dev",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "KAS Foundation API is running successfully.",
  });
});

app.use(
  "/api/gallery",
  galleryRoutes
);

app.use(
  "/api/team",
  teamRoutes
);

app.use(
  "/api/news",
  newsRoutes
);

app.use(
  "/api/achievements",
  achievementRoutes
);

app.use(
  "/api/venues",
  venueRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `KAS Foundation Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();