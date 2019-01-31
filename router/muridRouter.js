let path = require("path");
var Murid = require("../models/murid"); // get mongoose User Model

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res) => {
  const response = await Murid.find();
  res.json(response);
});

router.get("/:kelas/:tahun", async (req, res) => {
  const response = await Murid.find({
    kelas: req.params.kelas,
    tahun: req.params.tahun
  });
  res.json(response);
});

router.post("/register", async (req, res) => {
  const getMurid = await Murid.findOne({
    idMurid: req.body.idMurid
  });

  if (getMurid) {
    res.status(422).json({ errMessage: "Rekod murid sudah wujud" });
  } else {
    if (
      req.body.namaMurid &&
      req.body.idMurid &&
      req.body.tahun &&
      req.body.kelas
    ) {
      // create a rekod murid
      var murid = new Murid({
        namaMurid: req.body.namaMurid.toLowerCase(),
        idMurid: req.body.idMurid,
        tahun: req.body.tahun,
        kelas: req.body.kelas.toLowerCase()
      });

      // save the sample user
      murid.save(function(err) {
        if (err) throw err;
        console.log("Murid saved successfully");
        res.json({ success: true, murid });
      });
    } else {
      res.status(400).json({
        success: false,
        errMessage: "Please complete the provided details"
      });
    }
  }
});

// exporting thee router to other modules
module.exports = router;
