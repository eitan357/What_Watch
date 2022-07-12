const express = require("express");
var cors = require("cors");

const membersRouter = require("./routers/membersRouter");
const moviesRouter = require(`./routers/moviesRouter`);
const subscriptionsRouter = require(`./routers/subscriptionsRouter`);

let app = express();
app.use(cors());

require("./configs/subscriptionsDB");

app.use(express.json());

app.use("/api/members", membersRouter);
app.use("/api/movies", moviesRouter);
app.use(`/api/subscriptions`, subscriptionsRouter);

app.listen(8000);
