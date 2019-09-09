'use strict'

const debug = require('debug')('attosol:profileRouter:info'),
  express = require('express'),
  router = express.Router(),
  profileController = require('../controllers/profileController');

debug('Loading');

router.get('/hello', profileController.hello);
router.get('/profile', profileController.newProfile);
router.post('/profile', profileController.saveProfile);
router.delete('/profile', profileController.deleteProfile);

module.exports = router;
