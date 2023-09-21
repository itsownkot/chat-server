const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.setHeader(
    "Acess-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Acess-Control-Allow-Headers", "X-Requested-With,content-type");
});

module.exports = router;
