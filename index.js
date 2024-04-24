const express = require("express");

const app = express();

const Joi = require("joi");

const cors = require("cors");

// parse requests of content-type - application/json
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const corsOpts = {
  origin: "*",

  methods: ["GET"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(express.static(__dirname));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

app.get("/api/sustainability/search", async (req, res) => {
  const SustainabilityInformationModel =
    db.sequelize.models.SustainabilityInformation;
  const SearchLogModel = db.sequelize.models.SearchLog;

  const schema = Joi.object({
    destination: Joi.string().min(1).max(50).required(),
    origin: Joi.string().min(1).max(200).required(),
  });

  const result = schema.validate(req.query);
  const { error } = result;

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }

  const { destination, origin } = req.query;

  try {
    const sustainabilityInfo = await SustainabilityInformationModel.findOne({
      where: { destination },
    });

    const searchInfo = {
      origin,
      timeOfSearch: new Date().toISOString().slice(0, 19).replace("T", " "),
      sustainabilityScore: sustainabilityInfo
        ? sustainabilityInfo.sustainabilityScore
        : 0,
    };
    await SearchLogModel.create(searchInfo);

    return res.send({ data: sustainabilityInfo, message: "Successful" });
  } catch (err) {
    if (typeof err.errors != "undefined") {
      return res.status(422).send({
        message: err.errors[0].message,
      });
    }
    return res.status(500).send({
      message:
        err.message ||
        "Some error occured while fetching sustainability information",
    });
  }
});

let PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app, db, server };
