import {
  queryUserInfoResponse,
  queryVideosResponse,
  queryAdsResponse,
  queryAdvertisersResponse,
  queryAdDetailResponse,
  queryAdReportResponse,
  queryCommercialContentResponse,
} from "./fakedata.js";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    //Authorization: `Bearer ${token}`,
    Authorization: `Bearer 123`,
  },
  body: "",
  /*JSON.stringify({
    client_id: "(API KEY)",
    client_secret: "(API SECRET)",
    grant_type: "client_credentials",
  }),
  */
};

$(document).ready(function () {
  var fieldsSelected = [];

  let UserData = fetchData(
    "https://open.tiktokapis.com/v2/user/info/",
    options,
    queryUserInfoResponse
  );
  UserData.then((res) => renderUserData(res));

  /* ListVideos */
  var maxVideos = 10;

  $("#idsVideos__boton--buscar").on("click", () => {
    fieldsSelected = $(".field__checkbox")
      .map(function () {
        if (this.checked) {
          return this.name;
        }
      })
      .get();

    let videoData = fetchData(
      `https://open.tiktokapis.com/v2/video/list/?fields=${fieldsSelected.join(
        ","
      )}`,
      options,
      queryVideosResponse
    );
    videoData.then((res) => renderVideoData(res));
  });

  $("#listVideos__input").on("click", () => {
    maxVideos = $("#listVideos__input").val();
    $("#listVideos__numero").text(maxVideos);
  });

  /* Query Videos */
  var videosIDS = [];

  $("#listVideos__boton--buscar").on("click", () => {
    fieldsSelected = $(".field__checkbox")
      .map(function () {
        if (this.checked) {
          return this.name;
        }
      })
      .get();

    let videoData = fetchData(
      `https://open.tiktokapis.com/v2/video/query/?fields=${fieldsSelected.join(
        ","
      )}`,
      options,
      queryVideosResponse
    );
    videoData.then((res) => renderVideoData(res));
  });

  $("#idsVideos__boton--anyadir").on("click", () => {
    if (
      videosIDS.indexOf($("#idsVideos__input").val()) == -1 &&
      $("#idsVideos__input").val().trim() != ""
    ) {
      videosIDS.push($("#idsVideos__input").val());
      pintaIds(videosIDS);
      $("#idsVideos__input").val("");
    }
  });

  $("#idsVideos__boton--limpiar").on("click", () => {
    videosIDS = [];
    $("#idsVideos__list").empty();
    $("#idsVideos__input").val("");
  });

  const pintaIds = (videosIDS) => {
    $("#idsVideos__list").empty();
    videosIDS.map((e) => $("#idsVideos__list").append(`<li>${e}.</span>`));
  };

  let videoData = fetchData("fake", options, queryVideosResponse);
  videoData.then((res) => renderVideoData(res));

  //https://open.tiktokapis.com/v2/research/adlib/ad/query/
  let adData = fetchData("", options, queryAdsResponse);
  adData.then((res) => renderAdData(res));

  //https://open.tiktokapis.com/v2/research/adlib/advertiser/query/
  let advertiserData = fetchData("", options, queryAdvertisersResponse);
  advertiserData.then((res) => renderAdvertiserData(res));

  //https://open.tiktokapis.com/v2/research/adlib/ad/detail
  let adDetailsData = fetchData("", options, queryAdDetailResponse);
  adDetailsData.then((res) => renderAdDetailData(res));

  //https://open.tiktokapis.com/v2/research/adlib/ad/report/
  let adReportData = fetchData("", options, queryAdReportResponse);
  adReportData.then((res) => renderAdReportData(res));

  //https://open.tiktokapis.com/v2/research/adlib/commercial_content/report/
  let commercialContentData = fetchData(
    "",
    options,
    queryCommercialContentResponse
  );
  commercialContentData.then((res) => renderCommercialContentData(res));
});

const fetchData = (url, options, fakeJson) => {
  return fetch(url, options)
    .then((res) => res.json)
    .then(() => fakeJson);
};

const renderUserData = (json) => {
  $("#open_id--data").text(json["open_id"]);
  $("#union_id--data").text(json["union_id"]);
  $("#avatar_url--data").text(json["avatar_url"]);
  $("#avatar_url100--data").text(json["avatar_url100"]);
  $("#avatar_large_url--data").text(json["avatar_large_url"]);
  $("#display_name--data").text(json["display_name"]);
  $("#bio_description--data").text(json["bio_description"]);
  $("#video_count--data").text(json["video_count"]);
  $("#profile_deep_link--data").text(json["profile_deep_link"]);
  $("#is_verified--data").text(json["is_verified"]);
  $("#follower_count--data").text(json["follower_count"]);
  $("#likes_count--data").text(json["likes_count"]);
  $("#following_count--data").text(json["following_count"]);
};
const renderVideoData = (json) => {
  let tablaVideos = $("#contenido__api--tablaVideos");
  tablaVideos.html(
    `<tr style="border: 1px solid black; padding: 0.5rem"><th id="tablaVideos__th--id" style="background-color: #000000; color: white; padding: 0.5rem">id</th><th id="tablaVideos__th--create_time" style="background-color: #000000; color: white; padding: 0.5rem">create_time</th><th id="tablaVideos__th--cover_image_url" style="background-color: #000000; color: white; padding: 0.5rem">cover_image_url</th><th id="tablaVideos__th--share_url" style="background-color: #000000; color: white; padding: 0.5rem">share_url</th><th id="tablaVideos__th--video_description"style="background-color: #000000; color: white; padding: 0.5rem">video_description</th><th id="tablaVideos__th--duration" style="background-color: #000000; color: white; padding: 0.5rem">duration</th><th id="tablaVideos__th--height" style="background-color: #000000; color: white; padding: 0.5rem">height</th><th id="tablaVideos__th--width" style="background-color: #000000; color: white; padding: 0.5rem">width</th><th id="tablaVideos__th--title" style="background-color: #000000; color: white; padding: 0.5rem">title</th><th id="tablaVideos__th--embed_html" style="background-color: #000000; color: white; padding: 0.5rem">embed_html</th><th id="tablaVideos__th--embed_link" style="background-color: #000000; color: white; padding: 0.5rem">embed_link</th><th id="tablaVideos__th--like_count" style="background-color: #000000; color: white; padding: 0.5rem">like_count</th><th id="tablaVideos__th--comment_count" style="background-color: #000000; color: white; padding: 0.5rem">comment_count</th><th id="tablaVideos__th--share_count" style="background-color: #000000; color: white; padding: 0.5rem">share_count</th><th id="tablaVideos__th--view_count" style="background-color: #000000; color: white; padding: 0.5rem">view_count</th></tr>`
  );
  for (const video of json.data.videos) {
    let html = `
      <tr style="border: 1px solid black;padding: .5rem;">
            ${
              video.id
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.id}</td>`
                : $("#tablaVideos__th--id").remove()
            }
            ${
              video.create_time
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.create_time}</td>`
                : $("#tablaVideos__th--create_time").remove()
            }
            ${
              video.cover_image_url
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.cover_image_url}</td>`
                : $("#tablaVideos__th--cover_image_url").remove()
            }
            ${
              video.share_url
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.share_url}</td>`
                : $("#tablaVideos__th--share_url").remove()
            }
            ${
              video.video_description
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.video_description}</td>`
                : $("#tablaVideos__th--video_description").remove()
            }
            ${
              video.duration
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.duration}</td>`
                : $("#tablaVideos__th--duration").remove()
            }
            ${
              video.height
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.height}</td>`
                : $("#tablaVideos__th--height").remove()
            }
            ${
              video.width
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.width}</td>`
                : $("#tablaVideos__th--width").remove()
            }
            ${
              video.title
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.title}</td>`
                : $("#tablaVideos__th--title").remove()
            }
            ${
              video.embed_html
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.embed_html}</td>`
                : $("#tablaVideos__th--embed_html").remove()
            }
            ${
              video.embed_link
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.embed_link}</td>`
                : $("#tablaVideos__th--embed_link").remove()
            }
            ${
              video.like_count
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.like_count}</td>`
                : $("#tablaVideos__th--like_count").remove()
            }
            ${
              video.comment_count
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.comment_count}</td>`
                : $("#tablaVideos__th--comment_count").remove()
            }
            ${
              video.share_count
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.share_count}</td>`
                : $("#tablaVideos__th--share_count").remove()
            }
            ${
              video.view_count
                ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.view_count}</td>`
                : $("#tablaVideos__th--view_count").remove()
            }
      </tr>
    `;
    tablaVideos.append(html);
  }
};

const renderAdData = (json) => {
  let th = `<tr style="border: 1px solid black; padding: 0.5rem">`;
  let td = `<tr style="border: 1px solid black;padding: .5rem;">`;
  let tdMockup = `<td style="border: 1px solid black;padding: .5rem;">`;
  let tdMockupEnd = `</td>`;
  let ads = json.data.ads;
  let once = false;
  for (const adobj of ads) {
    const { ad, advertiser } = adobj;

    for (const key in ad) {
      if (!once) {
        th += `<th style="background-color: #000000; color: white; padding: 0.5rem">${key}</th>`;
      }
      if (key == "videos") {
        td += tdMockup;
        for (const video of ad[key]) {
          const { url } = video;
          td += url + "</br>";
        }
        td += tdMockupEnd;
      } else if (key == "image_urls") {
        td += tdMockup;
        for (const img of ad[key]) {
          td += img;
        }
        td += tdMockupEnd;
      } else if (key == "reach") {
        td += tdMockup + ad[key]["unique_user_seen"] + tdMockupEnd;
      } else {
        td += tdMockup + ad[key] + tdMockupEnd;
      }
    }
    for (const key in advertiser) {
      if (!once) {
        th += `<th style="background-color: #000000; color: white; padding: 0.5rem">${key}</th>`;
      }
      td += tdMockup + advertiser[key] + tdMockupEnd;
    }
    if (!once) {
      th += "</tr>";
      $("#contenido__api--tablaAds").append(th);
    }
    once = true;

    td += "</tr>";
  }
  $("#contenido__api--tablaAds").append(td);
};

const renderAdvertiserData = (json) => {
  let th = `<tr style="border: 1px solid black; padding: 0.5rem">`;
  let td = `<tr style="border: 1px solid black;padding: .5rem;">`;
  let tdMockup = `<td style="border: 1px solid black;padding: .5rem;">`;
  let tdMockupEnd = `</td>`;
  let advs = json.data.advertisers;
  let once = false;
  for (const adv of advs) {
    for (const key in adv) {
      if (!once) {
        th += `<th style="background-color: #000000; color: white; padding: 0.5rem">${key}</th>`;
      }
      td += tdMockup + adv[key] + tdMockupEnd;
    }
    if (!once) {
      th += "</tr>";
      $("#contenido__api--tablaAdvertisers").append(th);
    }
    once = true;

    td += "</tr>";
  }

  $("#contenido__api--tablaAdvertisers").append(td);
};
const renderAdDetailData = (json) => {
  let th = `<tr style="border: 1px solid black; padding: 0.5rem">`;
  let td = `<tr style="border: 1px solid black;padding: .5rem;">`;
  let tdMockup = `<td style="border: 1px solid black;padding: .5rem;">`;
  let tdMockupEnd = `</td>`;
  let thMockup = `<th style="background-color: #000000; color: white; padding: 0.5rem">`;
  let thMockupEnd = `</th>`;
  let { ad, ad_group, advertiser } = json.data;

  for (const key in ad) {
    if (key == "videos") {
      th += thMockup + key + thMockupEnd;
      td += tdMockup;
      for (const video of ad[key]) {
        const { url } = video;
        td += url + "</br>";
      }
      td += tdMockupEnd;
    } else if (key == "image_urls") {
      th += thMockup + key + thMockupEnd;
      td += tdMockup;
      for (const img of ad[key]) {
        td += img;
      }
      td += tdMockupEnd;
    } else if (key == "reach") {
      th += thMockup + "unique_users_seen" + thMockupEnd;

      td += tdMockup + ad[key]["unique_users_seen"] + tdMockupEnd;
      for (const reachKey in ad[key]["unique_users_seen_by_country"]) {
        th += thMockup + reachKey + thMockupEnd;

        td +=
          tdMockup +
          ad[key]["unique_users_seen_by_country"][reachKey] +
          tdMockupEnd;
      }
    } else {
      th += thMockup + key + thMockupEnd;
      td += tdMockup + ad[key] + tdMockupEnd;
    }
  }
  let target = ad_group.target;
  for (const key in target) {
    if (key == "age" || key == "gender") {
      for (const subKey in target[key]) {
        th += thMockup + subKey + thMockupEnd;

        td += tdMockup + target[key][subKey] + tdMockupEnd;
      }
    } else {
      th += thMockup + key + thMockupEnd;
      td += tdMockup + target[key] + tdMockupEnd;
    }
  }

  for (const key in advertiser) {
    if (key == "tiktok_account") {
      for (const subKey in advertiser[key]) {
        th += thMockup + subKey + thMockupEnd;

        td += tdMockup + advertiser[key][subKey] + tdMockupEnd;
      }
    } else {
      th += thMockup + key + thMockupEnd;
      td += tdMockup + advertiser[key] + tdMockupEnd;
    }
  }

  th += "</tr>";

  td += "</tr>";
  $("#contenido__api--tablaAdDetails").append(th);
  $("#contenido__api--tablaAdDetails").append(td);
};
const renderAdReportData = (json) => {
  let th = `<tr style="border: 1px solid black; padding: 0.5rem">`;
  let td = `<tr style="border: 1px solid black;padding: .5rem;">`;
  let tdMockup = `<td style="border: 1px solid black;padding: .5rem;">`;
  let tdMockupEnd = `</td>`;
  let report = json.data.count_time_series_by_country;

  for (const key in report) {
    th += `<th style="background-color: #000000; color: white; padding: 0.5rem">${key}</th>`;
    let text = "";
    for (let data of report[key]) {
      text += data.date + " " + data.count + " </br>";
    }
    td += tdMockup + text + tdMockupEnd;
  }
  th += "</tr>";
  $("#contenido__api--tablaAdReport").append(th);

  td += "</tr>";

  $("#contenido__api--tablaAdReport").append(td);
};
const renderCommercialContentData = (json) => {
  let th = `<tr style="border: 1px solid black; padding: 0.5rem">`;
  let td = `<tr style="border: 1px solid black;padding: .5rem;">`;
  let tdMockup = `<td style="border: 1px solid black;padding: .5rem;">`;
  let tdMockupEnd = `</td>`;
  let thMockup = `<th style="background-color: #000000; color: white; padding: 0.5rem">`;
  let thMockupEnd = `</th>`;
  let commercialcontents = json.data.commercial_contents;
  for (let cc of commercialcontents) {
    for (let key in cc) {
      if (key == "creator") {
        for (const subKey in cc[key]) {
          th += thMockup + subKey + thMockupEnd;

          td += tdMockup + cc[key][subKey] + tdMockupEnd;
        }
      } else if (key == "videos") {
        th += thMockup + "videos" + thMockupEnd;
        let text = "";
        for (let v of cc[key]) {
          text +=
            v.id +
            " " +
            v.status +
            " " +
            v.cover_image_url +
            " " +
            v.url +
            " </br>";
        }
        td += tdMockup + text + tdMockupEnd;
      } else {
        th += thMockup + key + thMockupEnd;
        td += tdMockup + cc[key] + tdMockupEnd;
      }
    }
  }
  th += "</tr>";

  td += "</tr>";
  $("#contenido__api--tablaCommercialContent").append(th);
  $("#contenido__api--tablaCommercialContent").append(td);
};
