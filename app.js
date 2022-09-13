const express = require("express");
const app = express();
const mainRouter = require("./router/mainRouter");
const cors = require("cors");

app.listen(process.env.PORT || 3030, () => console.log('Server running'));

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/', mainRouter);