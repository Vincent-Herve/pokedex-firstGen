const express = require('express');
const path = require('path');
const router = express.Router();
const mainController = require(path.join(__dirname, 'controllers', 'mainController'));

router.get('/', mainController.homePage);
router.get('/detail/:numero', mainController.detailPage);
router.get('/types', mainController.typesPage);
router.get('/types/:id', mainController.typeFilter);

module.exports = router;