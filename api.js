// TODO 2: SETUP ROUTING (ROUTER)
const express = require("express");

const PatientController = require("../controllers/PatientController.js");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello world");
});

router.get("/patients", PatientController.index);
router.get("/patients/:id", PatientController.show);
router.post("/patients", PatientController.validate('store'),PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/positive", PatientController.positive);
router.get("/patients/status/recovered", PatientController.recovered);
router.get("/patients/status/dead", PatientController.dead);

module.exports = router;