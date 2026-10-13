require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    // =========================================
    // APNI DETAILS YAHAN ENTER KARO
    // =========================================

    const email = "mailnow.kasf@gmail.com";
    const password = "usama@123";

    // =========================================
    // CHECK EXISTING ADMIN
    // =========================================

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    // =========================================
    // HASH PASSWORD
    // =========================================

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // =========================================
    // CREATE ADMIN
    // =========================================

    await Admin.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log("Admin created successfully.");
    console.log("Email:", email);
    console.log("Password has been securely hashed.");

    process.exit(0);
  } catch (error) {
    console.error(
      "Admin creation failed:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();