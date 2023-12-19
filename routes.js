module.exports = function (app) {
  app.use("/login", require("./routes/login"));
  app.use("/display", require("./routes/displayapi"));
};
