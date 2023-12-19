var express = require("express");
var router = express.Router();

router.get("/user", async function (req, res, next) {
  const { fields, token } = req.query;

  let url = "https://open.tiktokapis.com/v2/user/info/";
  url += "?fields=" + fields.toString();

  let test = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  test.json().then((j) => res.json(j));
});

router.get("/video", async function (req, res, next) {
  let token = "Bearer " + req.query.token;
  let fields = req.query.fields;
  let videoIds = req.query.videoIds;
  let url = "https://open.tiktokapis.com/v2/video/query/";

  url += "?fields=" + fields.toString();
  let body = {};
  if (videoIds != null) {
    body = { filters: { video_ids: [videoIds] } };
  }
  let test = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body,
  });

  test.json().then((j) => res.json(j));
});
router.get("/video/list", async function (req, res, next) {
  const { max_count, cursor, fields, token } = req.query;

  let url = "https://open.tiktokapis.com/v2/video/list/";

  url += "?fields=" + fields.toString();
  let body = {};
  if (max_count != null) {
    body = { ...body, max_count };
  }
  if (cursor != null) {
    body = { ...body, cursor };
  }

  let test = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body,
  });

  test.json().then((j) => res.json(j));
});
module.exports = router;
