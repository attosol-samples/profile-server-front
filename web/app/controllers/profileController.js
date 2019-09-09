'use strict'

const debug = require('debug')('attosol:profileController:info');
const randomProfile = require('random-profile-generator');

debug('Loading');

const redis = require('redis'),
  rejson = require('redis-rejson');

rejson(redis); /* important - this must come BEFORE creating the client */
let client = redis.createClient({ host: 'profile-server-back' });

class ProfileController {
  static async hello(req, res, next) {
    try {
      res.send('hello');
    } catch (err) {
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      // check my profile in Redis
      client.json_get(`${process.env.HOSTING_ENDPOINT}`, '.', function (err, value) {
        if (err) { throw err; }
        // if it exists, return the profile
        if (value) {
          debug(value);
          res.render('profileView', {
            profile: JSON.parse(value),
            status: "Loaded saved profile from Redis",
            server: process.env.HOSTING_ENDPOINT
          });
        } else {
          res.render('profileView', {
            profile: randomProfile.profile(),
            status: "Random profile",
            server: process.env.HOSTING_ENDPOINT
          });
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async saveProfile(req, res, next) {
    try {
      const body = req.body;
      client.json_set(`${process.env.HOSTING_ENDPOINT}`, '.', JSON.stringify(body), function (err) {
        if (err) { throw err; }
      });
      res.send('Saved');
    } catch (err) {
      next(err);
    }
  }

  static async deleteProfile(req, res, next) {
    try {
      client.json_del(`${process.env.HOSTING_ENDPOINT}`, '.', function (err) {
        if (err) { throw err; }
        debug('Profile deleted');
        res.send('Profile Deleted');
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProfileController;
