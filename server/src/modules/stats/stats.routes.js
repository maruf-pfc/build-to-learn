const express = require("express");
const router = express.Router();
const statsController = require("./stats.controller");

router.get("/public", statsController.getPublicStats);

module.exports = router;
