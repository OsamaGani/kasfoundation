const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const Admin = require("../models/Admin");

/* =========================================
   EMAIL TRANSPORTER
========================================= */

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

/* =========================================
   ADMIN LOGIN
========================================= */

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      token,
    });
  } catch (error) {
    console.error(
      "Admin login error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

/* =========================================
   FORGOT PASSWORD
========================================= */

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    if (!email) {
      return res.status(400).json({
        success: false,
        registered: false,
        message: "Please enter your email.",
      });
    }

    /* =========================================
       NORMALIZE EMAIL
    ========================================= */

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    /* =========================================
       CHECK REGISTERED EMAIL
    ========================================= */

    const admin = await Admin.findOne({
      email: normalizedEmail,
    });

    /* =========================================
       EMAIL NOT REGISTERED
    ========================================= */

    if (!admin) {
      return res.status(404).json({
        success: false,
        registered: false,
        message: "This email is not registered.",
      });
    }

    /* =========================================
       CREATE SECURE RESET TOKEN
    ========================================= */

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    /* =========================================
       HASH RESET TOKEN
    ========================================= */

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    /* =========================================
       TOKEN EXPIRY
       15 MINUTES
    ========================================= */

    const resetTokenExpires =
      Date.now() + 15 * 60 * 1000;

    admin.resetPasswordToken =
      hashedResetToken;

    admin.resetPasswordExpires =
      resetTokenExpires;

    await admin.save();

    /* =========================================
       RESET URL
    ========================================= */

     /* =========================================
   RESET URL
========================================= */

const resetUrl =
  `${process.env.FRONTEND_URL}/admin/reset-password/${resetToken}`;

    /* =========================================
       SEND EMAIL
    ========================================= */

    await transporter.sendMail({
      from: `"KAS Foundation" <${process.env.MAIL_USER}>`,

      to: admin.email,

      subject:
        "KAS Foundation - Reset Admin Password",

      html: `
        <!DOCTYPE html>

        <html>
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>
              Reset Admin Password
            </title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #f5f7fb;
              font-family: Arial, sans-serif;
            "
          >

            <div
              style="
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
              "
            >

              <div
                style="
                  padding: 30px;
                  background: #111827;
                  color: #ffffff;
                  text-align: center;
                "
              >

                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                  "
                >
                  KAS Foundation
                </h1>

                <p
                  style="
                    margin: 8px 0 0;
                    font-size: 14px;
                    opacity: 0.85;
                  "
                >
                  Admin Password Reset
                </p>

              </div>

              <div
                style="
                  padding: 35px;
                "
              >

                <h2
                  style="
                    margin-top: 0;
                    color: #111827;
                  "
                >
                  Reset Your Password
                </h2>

                <p
                  style="
                    color: #4b5563;
                    line-height: 1.6;
                  "
                >
                  We received a request to reset the
                  password for your KAS Foundation
                  admin account.
                </p>

                <p
                  style="
                    color: #4b5563;
                    line-height: 1.6;
                  "
                >
                  Click the button below to create
                  a new password.
                </p>

                <div
                  style="
                    text-align: center;
                    margin: 30px 0;
                  "
                >

                  <a
                    href="${resetUrl}"
                    style="
                      display: inline-block;
                      padding: 14px 25px;
                      background: #111827;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 8px;
                      font-weight: 600;
                    "
                  >
                    Reset Password
                  </a>

                </div>

                <p
                  style="
                    color: #6b7280;
                    font-size: 13px;
                    line-height: 1.6;
                  "
                >
                  This reset link will expire in
                  <strong>15 minutes</strong>.
                </p>

                <p
                  style="
                    color: #6b7280;
                    font-size: 13px;
                    line-height: 1.6;
                  "
                >
                  If you did not request a password
                  reset, you can safely ignore this email.
                </p>

              </div>

              <div
                style="
                  padding: 20px;
                  text-align: center;
                  background: #f9fafb;
                  color: #9ca3af;
                  font-size: 12px;
                "
              >
                © ${new Date().getFullYear()}
                Khel Aur Shiksha Foundation
              </div>

            </div>

          </body>
        </html>
      `,
    });

    /* =========================================
       EMAIL SENT SUCCESSFULLY
    ========================================= */

    return res.status(200).json({
      success: true,
      registered: true,
      email: admin.email,
      message:
        `Reset link has been sent to your registered email: ${admin.email}`,
    });

  } catch (error) {
    console.error(
      "Forgot password error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to process password reset request.",
    });
  }
};

/* =========================================
   RESET PASSWORD
========================================= */

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    /* =========================================
       TOKEN VALIDATION
    ========================================= */

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token.",
      });
    }

    /* =========================================
       PASSWORD VALIDATION
    ========================================= */

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a new password.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters.",
      });
    }

    /* =========================================
       HASH TOKEN FROM URL
    ========================================= */

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    /* =========================================
       FIND ADMIN WITH VALID TOKEN
    ========================================= */

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    /* =========================================
       INVALID / EXPIRED TOKEN
    ========================================= */

    if (!admin) {
      return res.status(400).json({
        success: false,
        message:
          "Reset link is invalid or has expired.",
      });
    }

    /* =========================================
       HASH NEW PASSWORD
    ========================================= */

    const hashedPassword =
      await bcrypt.hash(password, 12);

    admin.password = hashedPassword;

    /* =========================================
       REMOVE RESET TOKEN
    ========================================= */

    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;

    await admin.save();

    /* =========================================
       SUCCESS
    ========================================= */

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now login.",
    });

  } catch (error) {
    console.error(
      "Reset password error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to reset password.",
    });
  }
};

/* =========================================
   EXPORT
========================================= */

module.exports = {
  loginAdmin,
  forgotPassword,
  resetPassword,
};