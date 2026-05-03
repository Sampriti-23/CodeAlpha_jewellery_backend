const express = require('express');
const router = express.Router();
const detailscontroller = require('../controller/detailscontroller');

router.post('/add', detailscontroller.createdetails);
router.get('/getall', detailscontroller.getalldetails);
router.get('/getbyid/:id', detailscontroller.getdetailsbyid);
router.put('/update/:id', detailscontroller.updatedetails);
router.delete('/delete/:id', detailscontroller.deletedetails);
router.get("/admin/alldetails",detailscontroller.getAdminAllDetails)

module.exports = router;