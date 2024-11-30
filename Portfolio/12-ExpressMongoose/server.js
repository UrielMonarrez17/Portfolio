const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("fast-csv");

const app = express();

// MongoDB Connection
const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Define Schemas and Models
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Country List
const countries = [
  { code: "ENG", label: "British" },
  { code: "SPA", label: "Spanish" },
  { code: "GER", label: "German" },
  { code: "FRA", label: "French" },
  { code: "MEX", label: "Mexican" },
  { code: "AUS", label: "Australian" },
  { code: "FIN", label: "Finnish" },
  { code: "NET", label: "Dutch" },
  { code: "CAN", label: "Canadian" },
  { code: "MON", label: "Monegasque" },
  { code: "THA", label: "Thai" },
  { code: "JAP", label: "Japanese" },
  { code: "CHI", label: "Chinese" },
  { code: "USA", label: "American" },
  { code: "DEN", label: "Danish" },
  { code: "AUS", label: "Austrian" },
  { code: "SWZ", label: "Swiss" },
  { code: "ITA", label: "Italian" },
  { code: "NAA", label: "N/A" },
];

// Function to load and save teams from CSV
const saveTeams = async () => {
  const teams = [];
  const readable = fs.createReadStream(__dirname + "/public/data/f1_2023.csv")
    .pipe(csv.parse({ skipRows: 1 }));

  await Team.deleteMany({});

  readable.on("data", (data) => {
    const team = {
      id: Number(data[0]),
      name: data[1],
      nationality: data[2],
      url: data[3],
    };
    teams.push(team);
  });

  readable.on("end", async () => {
    try {
      await Team.insertMany(teams);
    } catch (e) {
      console.error("Error saving teams:", e);
    }
  });
};

// Function to load and save drivers from CSV
app.get("/driver", async(req, res) => {
  const drivers = [];
  const readable = fs.createReadStream(__dirname + "/public/data/f1_2023.csv")
    .pipe(csv.parse({ skipRows: 1 }));

  await Driver.deleteMany({});

  for await (const data of readable) {
    try {
      const team = await Team.findOne({ name: data[data.length - 1] });
      const driver = {
        num: Number(data[0]),
        code: data[1],
        forename: data[2],
        surname: data[3],
        dob: new Date(data[4]),
        nationality: data[5],
        url: data[6],
        team: team,
      };
      drivers.push(driver);
    } catch (err) {
      console.error(`Error processing driver: ${data[1]} - ${err}`);
    }
  }

  try {
    await Driver.insertMany(drivers);
  } catch (e) {
    console.error("Error saving drivers:", e);
  }
});

// Data initialization flags
let drivers = [];
let teams = [];
let entriesInitialized = false;

// Check and load data if not initialized
const checkAndLoadData = async () => {
  if (!entriesInitialized) {
    await saveTeams();
    await saveDrivers();
    drivers = await Driver.find({});
    teams = await Team.find({});
    entriesInitialized = true;
  }
};

// Routes
app.use(async (req, res, next) => {
  await checkAndLoadData();
  next();
});

app.get("/", (req, res) => {
  const driverList = true;
  const editTeam = 100;
  res.render("index", { driverList, drivers, countries, teams, Edit: 999999, editTeam });
});

app.get("/edit/:code", (req, res) => {
  const code = req.params.code;
  res.redirect(`/editTeam/${code}`);
});

app.get("/toggleTable", (req, res) => {
  driverList = !driverList;
  res.redirect("/");
});

app.get("/editTeam/:id", (req, res) => {
  const id = req.params.id;
  res.redirect(`/editTeam/${id}`);
});

app.post("/confirmEditDriver/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { code, fname, sname, dob, nation, url, team: teamId } = req.body;

    const team = await Team.findOne({ id: teamId });
    await Driver.findOneAndUpdate(
      { num: id },
      { code, forename: fname, surname: sname, dob: new Date(dob), nationality: nation, url, team },
      { new: true }
    );
    await checkAndLoadData();
    res.redirect("/");
  } catch (err) {
    console.error("Error updating driver:", err);
    res.redirect("/");
  }
});

app.post("/confirmEditTeam/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, nation, url } = req.body;

    await Team.findOneAndUpdate({ id }, { name, nationality: nation, url }, { new: true });
    await checkAndLoadData();
    res.redirect("/");
  } catch (err) {
    console.error("Error updating team:", err);
    res.redirect("/");
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});