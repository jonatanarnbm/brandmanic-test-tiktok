module.exports = function (app) {
  app.use("/login", require("./routes/login"));
  app.use("/display", require("./routes/displayapi"));
  app.use('/', function (req, res) {
    res.send(`
    <div style="display:flex;width:100%;height:100%;justify-content:center;align-items:center;font-size:2rem">
      <a style="background-color:black;color:white;padding:1rem;text-decoration:none;font-weight:600" href="/login" target="_blank">Login</a>
      <a style="border:1px solid black;padding:1rem;text-decoration:none;font-weight:600:color:black;margin-left:2rem;" href="/login/token" target="_blank">Token</a>
    </div>`)
  })
};
