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
  let url = "https://open.tiktokapis.com/v2/oauth/token/";

  // the following params need to be in `application/x-www-form-urlencoded` format.

  url += "client_key=awd1rxq3fwcdtf2s";
  url += "client_secret=ZLp8OscZ95yzTJLNva5tWzfaDPSghPaW";
  url +=
    "code=YUTtMdK-KT42BhJwsv7q-My89bUSJUiyYaZ8WT4BrUgz6RKTESy_uMRBtM5yGwfC3eHuYudwWxKWT4jG3I-x51LxiyMbSIWBLAvjS3rY0Whpl19I3cLnZ3rjWUtbW_Xl3GriOFIQZw7YnLxXtX3j--WPyN85v7tqpDGSNBCRUUHGbivFd0L_ns-6O0EBvfWc%2A2%214847.e1";
  url += "grant_type=authorization_code";
  url += "redirect_uri=https://marvelcrowd.netlify.app/dashboard";
  let test = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    body: {
      client_key: "awd1rxq3fwcdtf2s",
      client_secret: "ZLp8OscZ95yzTJLNva5tWzfaDPSghPaW",
      code: "f9bXvtzPoLRSy7fkAv4V3LPjkPh1naBEqZN5Sxfum95cIf9NRCUWQHYFzI9EihR1yCBCJR8mgZGYk23piyHgmWRsXZxrcsyZNORAJrOXdb33I__k_l6I1JEe4p4upWFgumuw6vP6GCDcz807ByRjvNby9vGNztUZTMh-k4a_dnW0L1nFogoTvFcWPlbcdGTd%2A0%214761.e1",
      grant_type: "authorization_code",
      redirect_uri: "https://marvelcrowd.netlify.app/dashboard",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
  });
  //console.log(test);
  //res.redirect(url);

  res.json(test);
});
module.exports = router;
