$(document).ready(function () {
  let UserData = fetchData(
    "https://open.tiktokapis.com/v2/user/info/",
    queryUserInfoResponse
  );
  UserData.then((res) => renderUserData(res));

  let videoData = fetchData("fake", queryVideosResponse);
  videoData.then((res) => renderVideoData(res));
});

const fetchData = (url, fakeJson) => {
  return fetch(url)
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
  for (const video of json.data.videos) {
    let html = `
      <tr style="border: 1px solid black;padding: .5rem;">
            <td style="border: 1px solid black;padding: .5rem;">${video.id}</td>
            <td id="open_id--data" style="max-width: 23rem;border: 1px solid black;padding: .5rem;">${video.title}</td>
      </tr>
    `;
    tablaVideos.append(html);
  }
};

const queryUserInfoResponse = {
  open_id: "1",
  union_id: "2",
  avatar_url: "http://...",
  avatar_url100: "http://...",
  avatar_large_url: "http://...",
  display_name: "Toñito",
  bio_description: "El mejor Toñito de calle 🔥🔥",
  profile_deep_link: "http://...",
  is_verified: "1",
  follower_count: "1234",
  following_count: "1234",
  likes_count: "54321",
  video_count: "98765",
};
const queryVideosResponse = {
  data: {
    videos: [
      {
        title: "Video 1",
        id: "1234123412345678567",
      },
      {
        title: "Video 2",
        id: "1010102020203030303",
      },
    ],
  },
  error: {
    code: "ok",
    message: "",
    log_id: "20220829194722CBE87ED59D524E727021",
  },
};
