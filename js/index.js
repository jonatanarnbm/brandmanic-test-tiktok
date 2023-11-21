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

  $("#idsVideos__boton--buscar").on('click', () => {
    fieldsSelected = $(".field__checkbox").map(function () {
      if (this.checked) {
        return this.name
      };
    }).get();


    let videoData = fetchData(
      `https://open.tiktokapis.com/v2/video/list/?fields=${fieldsSelected.join(',')}`,
      options,
      queryVideosResponse);
    videoData.then((res) => renderVideoData(res));
  })


  $("#listVideos__input").on('click', () => {
    maxVideos = $("#listVideos__input").val();
    $("#listVideos__numero").text(maxVideos)
  })


  /* Query Videos */
  var videosIDS = [];

  $("#listVideos__boton--buscar").on('click', () => {
    fieldsSelected = $(".field__checkbox").map(function () {
      if (this.checked) {
        return this.name
      };
    }).get();

    let videoData = fetchData(
      `https://open.tiktokapis.com/v2/video/query/?fields=${fieldsSelected.join(',')}`,
      options,
      queryVideosResponse);
    videoData.then((res) => renderVideoData(res));
  })

  $("#idsVideos__boton--anyadir").on('click', () => {
    if (videosIDS.indexOf($("#idsVideos__input").val()) == -1 && $("#idsVideos__input").val().trim() != '') {
      videosIDS.push($("#idsVideos__input").val())
      pintaIds(videosIDS)
      $("#idsVideos__input").val('')
    }
  })

  $("#idsVideos__boton--limpiar").on('click', () => {
    videosIDS = [];
    $('#idsVideos__list').empty()
    $("#idsVideos__input").val('')
  })

  const pintaIds = (videosIDS) => {
    $('#idsVideos__list').empty()
    videosIDS.map((e) => $('#idsVideos__list').append(`<li>${e}.</span>`))
  }

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
  tablaVideos.html(`<tr style="border: 1px solid black; padding: 0.5rem"><th id="tablaVideos__th--id" style="background-color: #000000; color: white; padding: 0.5rem">id</th><th id="tablaVideos__th--create_time" style="background-color: #000000; color: white; padding: 0.5rem">create_time</th><th id="tablaVideos__th--cover_image_url" style="background-color: #000000; color: white; padding: 0.5rem">cover_image_url</th><th id="tablaVideos__th--share_url" style="background-color: #000000; color: white; padding: 0.5rem">share_url</th><th id="tablaVideos__th--video_description"style="background-color: #000000; color: white; padding: 0.5rem">video_description</th><th id="tablaVideos__th--duration" style="background-color: #000000; color: white; padding: 0.5rem">duration</th><th id="tablaVideos__th--height" style="background-color: #000000; color: white; padding: 0.5rem">height</th><th id="tablaVideos__th--width" style="background-color: #000000; color: white; padding: 0.5rem">width</th><th id="tablaVideos__th--title" style="background-color: #000000; color: white; padding: 0.5rem">title</th><th id="tablaVideos__th--embed_html" style="background-color: #000000; color: white; padding: 0.5rem">embed_html</th><th id="tablaVideos__th--embed_link" style="background-color: #000000; color: white; padding: 0.5rem">embed_link</th><th id="tablaVideos__th--like_count" style="background-color: #000000; color: white; padding: 0.5rem">like_count</th><th id="tablaVideos__th--comment_count" style="background-color: #000000; color: white; padding: 0.5rem">comment_count</th><th id="tablaVideos__th--share_count" style="background-color: #000000; color: white; padding: 0.5rem">share_count</th><th id="tablaVideos__th--view_count" style="background-color: #000000; color: white; padding: 0.5rem">view_count</th></tr>`);
  for (const video of json.data.videos) {
    let html = `
      <tr style="border: 1px solid black;padding: .5rem;">
            ${video.id ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.id}</td>` : $('#tablaVideos__th--id').remove()}
            ${video.create_time ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.create_time}</td>` : $('#tablaVideos__th--create_time').remove()}
            ${video.cover_image_url ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.cover_image_url}</td>` : $('#tablaVideos__th--cover_image_url').remove()}
            ${video.share_url ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.share_url}</td>` : $('#tablaVideos__th--share_url').remove()}
            ${video.video_description ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.video_description}</td>` : $('#tablaVideos__th--video_description').remove()}
            ${video.duration ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.duration}</td>` : $('#tablaVideos__th--duration').remove()}
            ${video.height ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.height}</td>` : $('#tablaVideos__th--height').remove()}
            ${video.width ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.width}</td>` : $('#tablaVideos__th--width').remove()}
            ${video.title ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.title}</td>` : $('#tablaVideos__th--title').remove()}
            ${video.embed_html ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.embed_html}</td>` : $('#tablaVideos__th--embed_html').remove()}
            ${video.embed_link ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.embed_link}</td>` : $('#tablaVideos__th--embed_link').remove()}
            ${video.like_count ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.like_count}</td>` : $('#tablaVideos__th--like_count').remove()}
            ${video.comment_count ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.comment_count}</td>` : $('#tablaVideos__th--comment_count').remove()}
            ${video.share_count ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.share_count}</td>` : $('#tablaVideos__th--share_count').remove()}
            ${video.view_count ? `<td style="max-width: 5rem;border: 1px solid black;padding: .5rem;overflow:hidden;line-break: anywhere;">${video.view_count}</td>` : $('#tablaVideos__th--view_count').remove()}
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
        id: "1525212512552215125152125",
        create_time: "2020102131-123030",
        cover_image_url: "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        share_url: "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        video_description: "Lorem fistrum ese pedazo de está la cosa muy malar a gramenawer a gramenawer va usté muy cargadoo al ataquerl ese pedazo de mamaar por la gloria de mi madre ese hombree.",
        duration: "1234123412345678567",
        height: "1920",
        width: "1080",
        title: "De fiesta con Toñito 🥵🥵",
        embed_html: "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798/",
        embed_link: "https://www.tiktok.com/127892171937912378192387219872/19781237892138/71923782198719821798/",
        like_count: "1234123412345678567",
        commnent_count: "515421",
        share_count: "835",
        view_count: '6121341'
      },
      {
        id: "1525212512552215125152125",
        create_time: "2020102131-123030",
        cover_image_url: "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        share_url: "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798",
        video_description: "Lorem fistrum ese pedazo de está la cosa muy malar a gramenawer a gramenawer va usté muy cargadoo al ataquerl ese pedazo de mamaar por la gloria de mi madre ese hombree.",
        duration: "1234123412345678567",
        height: "1920",
        width: "1080",
        title: "De fiesta con Toñito 🥵🥵",
        embed_html: "https://www.tiktok.com/1278921719379123781923872198721/97812378921387/1923782198719821798/",
        embed_link: "https://www.tiktok.com/127892171937912378192387219872/19781237892138/71923782198719821798/",
        like_count: "1234123412345678567",
        commnent_count: "515421",
        share_count: "835",
        view_count: '6121341'
      },
    ],
  },
  error: {
    code: "ok",
    message: "",
    log_id: "20220829194722CBE87ED59D524E727021",
  },
};


