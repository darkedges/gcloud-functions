var speakeasy = require("speakeasy");
var qr = require('qr-image');

function handleGET(req, res) {
  var secret = speakeasy.generateSecret();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  var code = qr.image(secret.otpauth_url, { type: 'png' });
  res.type('png');
  code.pipe(res);
}

function handleOPTIONS(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(200).send();
}

/**
 * Responds to a GET request with an QRCode defined from SpeakEasy
 *
 * @example
 * gcloud alpha functions deploy TOTPFunction --stage-bucket gcloud_functions --trigger-http
 * functions deploy TOTPFunction ./ --trigger-http
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.TOTPFunction = function TOTPFunction(req, res) {
  switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    case 'OPTIONS':
      handleOPTIONS(req, res);
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }
};