var Murid = require("../models/murid");
var Kehadiran = require("../models/kehadiran");
var moment = require("moment");

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  const response = await Kehadiran.find();
  res.json(response);
});

router.get("/:tahun/:kelas/:tarikh", async (req, res) => {
  const response = await Kehadiran.find({
    kelas: req.params.kelas.toLowerCase(),
    tahun: req.params.tahun,
    tarikh: req.params.tarikh
  });
  res.json(response);
});

router.post("/register", async (req, res) => {
  const murid = await Murid.findOne({ idMurid: req.body.idMurid });
  const semakHadir = await Kehadiran.findOne({
    idMurid: req.body.idMurid,
    tarikh: moment().format("YYYYMMDD")
  });

  if (murid && !semakHadir) {
    var kehadiran = new Kehadiran({
      namaMurid: murid.namaMurid.toLowerCase(),
      idMurid: murid.idMurid,
      tahun: murid.tahun,
      kelas: murid.kelas.toLowerCase(),
      tarikh: moment().format("YYYYMMDD")
    });

    kehadiran.save(function(err) {
      if (err) throw err;
      console.log("Kehadiran saved successfully");
      res.json({ success: true, kehadiran });
    });
  } else if (semakHadir) {
    res.status(442).json({ message: "Kehadiran sudah direkod" });
  } else {
    res.status(400).json({ message: "Tiada rekod murid" });
  }
});

module.exports = router;
