const { auth } = require('express-openid-connect');
const CONFIG = require('../config') 


const config = {
  authRequired: false,
  auth0Logout: true,
  secret:  CONFIG.AUTH0_SECRET,
  baseURL: CONFIG.AUTH0_BASE_URL,
  clientID: CONFIG.AUTH0_CLIENT_ID,
  issuerBaseURL: CONFIG.AUTH0_ISSUER_BASE_URL
};
module.exports = auth(config);