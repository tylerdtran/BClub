const {google} = require('googleapis');

const oauth2client = new google.auth.OAuth2(
    "748287146680-de33ukjd6tvnborn7ii4mua73t5hgdci.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/oauth2callback"
);

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

const authorizationURL = oauth2client.generateAuthUrl({
  access_type: 'offline'
  scope: scopes,
  include_granted_scopes: true
});

let userCredential = null; // FOR REFRESH TOKENS
