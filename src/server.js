const jsonServer = require("json-server");
const path = require("path");
const express = require("express");

const cache = require("./middlewares/cache");
const nullIdFix = require("./middlewares/nullIdFix");
const { rules, auth } = require("./middlewares/auth");

const notesRoutes = require("./routes/notes.routes");
const userRoutes = require("./routes/user.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(express.json());

app.use(cache);
app.use(nullIdFix);

app.use(rules);
app.use(auth);

notesRoutes(app, router);
userRoutes(app, router);
uploadRoutes(app);

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

