const express = require("express");

const {
  subscribeUser,
  getSubscribers,
  sendNewsletter,
} = require("../controllers/subscriberController");

const router = express.Router();

router.post("/", subscribeUser);

router.get("/", getSubscribers);

router.post("/send", sendNewsletter);

module.exports = router;