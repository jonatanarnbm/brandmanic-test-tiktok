var express = require("express");
var router = express.Router();

router.get("/user", async function (req, res, next) {
  const { fields, token, username } = req.query;
  console.log(req.query);
  let url = "https://open.tiktokapis.com/v2/research/user/info/";
  url += "?fields=" + fields.toString();
  let body = {};
  if (username != null) {
    body = { ...body, username };
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

router.get("/video", async function (req, res, next) {
  const {
    fields,
    token,
    start_date,
    end_date,
    max_count,
    cursor,
    search_id,
    is_random,
    query,
  } = req.query;

  let videoIds = req.query.videoIds;
  let url = "https://open.tiktokapis.com/v2/research/video/query/";

  url += "?fields=" + fields.toString();
  let body = {
    start_date,
    end_date,
    max_count,
    cursor,
    search_id,
    is_random,
    query,
  };

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
