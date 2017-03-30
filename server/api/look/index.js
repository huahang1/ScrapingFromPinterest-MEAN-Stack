'use strict';

var controller = require('./look.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/scrapeUpload',auth.isAuthenticated(),controller.scrapeUpload);
router.post('/upload',auth.isAuthenticated(),controller.upload);

router.put('/:id',auth.isAuthenticated(),controller.update);

router.get('/getAllLooks',controller.allLooks);
router.get('/getUserLooks',controller.userLooks);

router.get('/:lookId',controller.singleLook);
router.get('/popLooks/:id',controller.popLooks);

router.delete('/:id',controller.delete);

module.exports = router;