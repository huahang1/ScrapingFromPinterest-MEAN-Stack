'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
    //when the database doesn't exist, it will create a new one
  mongo: {
    uri: 'mongodb://localhost/meanApp-dev'
  },

  seedDB: true
};
