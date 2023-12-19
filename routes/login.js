var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie("csrfState", csrfState, { maxAge: 60000 });

  let url = "https://www.tiktok.com/v2/auth/authorize/";

  // the following params need to be in `application/x-www-form-urlencoded` format.
  url += "?client_key=awd1rxq3fwcdtf2s";
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += "&redirect_uri=https://marvelcrowd.netlify.app/dashboard";
  url += "&state=" + csrfState;

  res.redirect(url);
});
router.get("/token", async function (req, res, next) {
  let code = req.query.code;
  let test = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_key: "awd1rxq3fwcdtf2s",
      client_secret: "ZLp8OscZ95yzTJLNva5tWzfaDPSghPaW",
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "https://marvelcrowd.netlify.app/dashboard",
    }),
  });

  test.json().then((j) => res.json(j));
});

router.get("/test", async function (req, res, next) {
  let token = "Bearer " + req.query.token;
  let test = await fetch(
    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  test.json().then((j) => res.json(j));
});
module.exports = router;
