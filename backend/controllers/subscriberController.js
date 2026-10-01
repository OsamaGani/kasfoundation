const Subscriber = require("../models/Subscriber");
const nodemailer = require("nodemailer");

/* =========================================================
   EMAIL TRANSPORTER
========================================================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/* =========================================================
   SUBSCRIBE USER
========================================================= */

const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingSubscriber = await Subscriber.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
      }

      return res.status(200).json({
        success: true,
        message: "You are already subscribed.",
      });
    }

    const subscriber = await Subscriber.create({
      email: normalizedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully!",
      subscriber,
    });
  } catch (error) {
    console.error("Subscribe error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to subscribe.",
    });
  }
};

/* =========================================================
   GET ALL SUBSCRIBERS
========================================================= */

const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error("Get subscribers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers.",
    });
  }
};

/* =========================================================
   SEND NEWSLETTER
========================================================= */

const sendNewsletter = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !subject.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required.",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const subscribers = await Subscriber.find({
      isActive: true,
    }).select("email");

    if (subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active subscribers found.",
      });
    }

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    const emailList = subscribers.map(
      (subscriber) => subscriber.email
    );

    await transporter.sendMail({
      from: `"KAS Foundation" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      bcc: emailList,
      subject: subject.trim(),
      text: message.trim(),
      html: `
        <div
          style="
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            font-family: Arial, sans-serif;
            line-height: 1.7;
            color: #333333;
          "
        >
          <h2 style="color: #111827;">
            KAS Foundation
          </h2>

          <div>
            ${message
              .trim()
              .replace(/\n/g, "<br />")}
          </div>

          <p
            style="
              margin-top: 30px;
              color: #777777;
              font-size: 13px;
            "
          >
            © ${new Date().getFullYear()}
            Khel Aur Shiksha Foundation
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: `Newsletter sent to ${subscribers.length} subscriber(s).`,
      sentCount: subscribers.length,
    });
  } catch (error) {
    console.error("Send newsletter error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send newsletter.",
    });
  }
};

module.exports = {
  subscribeUser,
  getSubscribers,
  sendNewsletter,
};