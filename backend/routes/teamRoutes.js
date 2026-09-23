const express = require("express");

const upload = require("../middleware/teamUpload");

const {
  createTeamMember,
  getTeamMembers,
  getTeamMemberBySlug,
  updateTeamMember,
  deleteTeamMember,
  getTeamImage,
} = require("../controllers/teamController");

const router = express.Router();


/* =========================================
   GET ALL TEAM MEMBERS
========================================= */

router.get(
  "/",
  getTeamMembers
);


/* =========================================
   GET SINGLE MEMBER BY SLUG
========================================= */

router.get(
  "/slug/:slug",
  getTeamMemberBySlug
);


/* =========================================
   GET TEAM IMAGE
========================================= */

router.get(
  "/image/:fileId",
  getTeamImage
);


/* =========================================
   CREATE TEAM MEMBER
========================================= */

router.post(
  "/",
  upload.single("profileImage"),
  createTeamMember
);


/* =========================================
   UPDATE TEAM MEMBER
========================================= */

router.put(
  "/:id",
  upload.single("profileImage"),
  updateTeamMember
);


/* =========================================
   DELETE TEAM MEMBER
========================================= */

router.delete(
  "/:id",
  deleteTeamMember
);


module.exports = router;