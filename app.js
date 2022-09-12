const express = require("express");
const app = express();
const mainRouter = require("./router/mainRouter");

app.listen(process.env.PORT || 3030, () => console.log('Server running'));

app.use('/', mainRouter);