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
  let UserData = fetchData(
    "https://open.tiktokapis.com/v2/user/info/",
    options,
    queryUserInfoResponse
  );
  UserData.then((res) => renderUserData(res));

  let videoData = fetchData("fake", options, queryVideosResponse);
  videoData.then((res) => renderVideoData(res));
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
  for (const video of json.data.videos) {
    let html = `
      <tr style="border: 1px solid black;padding: .5rem;">
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.id}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.create_time}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.cover_image_url}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.share_url}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.video_description}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.duration}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.height}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.width}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.title}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.embed_html}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.embed_link}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.like_count}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.comment_count}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.share_count}</td>
            <td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden">${video.view_count}</td>
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
