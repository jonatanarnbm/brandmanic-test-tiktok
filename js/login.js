$(document).ready(function () {
  $("#login_tiktok").click(() => {
    loginTiktok();
  });
});
const loginTiktok = () => {
  const csrfState = Math.random().toString(36).substring(2);
  let url = "https://www.tiktok.com/v2/auth/authorize/";
  url += "?client_key=awd1rxq3fwcdtf2s";
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += "&redirect_uri=https://marvelcrowd.netlify.app/dashboard";
  fetch(url, {
    mode: "cors",
    headers: new Headers({ "Content-type": "application/json" }),
  })
    .then((res) => console.log(res))
    .then((e) => console.log(e));
};
