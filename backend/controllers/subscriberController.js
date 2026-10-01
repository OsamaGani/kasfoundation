const Subscriber = require("../models/Subscriber");

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
   SEND NEWSLETTER USING BREVO API
========================================================= */

const sendNewsletter = async (req, res) => {
  try {
    const { subject, message } = req.body;

    /* =====================================================
       VALIDATION
    ===================================================== */

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

    /* =====================================================
       CHECK BREVO CONFIGURATION
    ===================================================== */

    if (
      !process.env.BREVO_API_KEY ||
      !process.env.MAIL_USER
    ) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    /* =====================================================
       GET ACTIVE SUBSCRIBERS
    ===================================================== */

    const subscribers = await Subscriber.find({
      isActive: true,
    }).select("email");

    if (subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active subscribers found.",
      });
    }

    /* =====================================================
       CREATE EMAIL LIST
    ===================================================== */

    const emailList = subscribers.map((subscriber) => ({
      email: subscriber.email,
    }));

    /* =====================================================
       EMAIL HTML
    ===================================================== */

    const emailHtml = `
      <!DOCTYPE html>

      <html>
        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>
            ${subject.trim()}
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
                Newsletter
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
                ${subject.trim()}
              </h2>

              <div
                style="
                  color: #4b5563;
                  line-height: 1.7;
                  font-size: 15px;
                "
              >
                ${message.trim().replace(/\n/g, "<br />")}
              </div>
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
    `;

    /* =====================================================
       SEND EMAIL WITH BREVO API
    ===================================================== */

    const brevoResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify({
          sender: {
            name: "Khel Aur Shiksha Foundation",
            email: process.env.MAIL_USER,
          },

          to: [
            {
              email: process.env.MAIL_USER,
            },
          ],

          bcc: emailList,

          subject: subject.trim(),

          htmlContent: emailHtml,
        }),
      }
    );

    /* =====================================================
       BREVO ERROR
    ===================================================== */

    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text();

      console.error(
        "Brevo newsletter error:",
        brevoError
      );

      return res.status(500).json({
        success: false,
        message: "Newsletter email sending failed.",
      });
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    const brevoData = await brevoResponse.json();

    console.log(
      "Brevo newsletter sent successfully:",
      brevoData
    );

    return res.status(200).json({
      success: true,
      message: `Newsletter sent to ${subscribers.length} subscriber(s).`,
      sentCount: subscribers.length,
    });
  } catch (error) {
    console.error(
      "Send newsletter error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send newsletter.",
    });
  }
};

/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  subscribeUser,
  getSubscribers,
  sendNewsletter,
};