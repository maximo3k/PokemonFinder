var express = require('express');
var router = express.Router();
require('dotenv').config();
const nodemailer = require("nodemailer");
const { response, getMaxListeners } = require('../app');
const app = require('../app');

/* GET test page. */
router.post('/', function(req, res, next) {

  console.log(req.status)
  async function main() {  
    // reusable smtp
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: "devmax0242@gmail.com",
        accessToken: 'ya29.a0ARrdaM8i5QisWCBgBXQmLitrE9o107dIZwkrVe37GafRu7YwjwNO271lZ0ji_zxT-hckiVSN1jSMA_kSxdi3W-b94wrqWSMHsfh3gPv2eufl-ATs1evGIx9PSC0dVyb5an1ngt-3XJSVtVKMsI-z4EgqxByk'
      },
    });
  
    // send mail
    let info = await transporter.sendMail({
      from: '"PokemonFetch" <devmax0242@gmail.com>',
      to: req.body.receiverEmail,
      subject: 'Your selected Pokemon is: ' + req.body.selectedPokemon,
      text: "Hello world",
      html: `<h1>${req.body.selectedPokemon}</h1>
      <p> ${req.body.selectedPokemon} (No. ${req.body.selectedPokemonNumber}) is type ${req.body.selectedPokemonType}</p>
      <br />
      <p>here is how it looks:</p>
      <img src=${req.body.selectedPokemonImage} alt="" width="360px" />
      `, // html body
    });
    
    console.log("Message sent: %s", info.messageId);
    transporter.close();
  }

  main().catch(console.error);

  let responseAlert = ("The email has been sent to " + req.body.receiverEmail);

  res.send(JSON.stringify(responseAlert));
});

module.exports = router;