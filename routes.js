const express = require("express");

const app = express.Router();

const stores = require("./stores.json");

// get info about an resturant
app.get("/", function (req, res) {
  const { storename } = req.query;
  console.log(storename);
  const index = stores.findIndex((store) => store.name === storename);
  if (index > -1) {
    res.json(stores[index]);
  } else {
    res.send("Store not found!");
  }
});

// get all the names of the districts
app.get("/districts", function (req, res) {
  const districtsList = {};
  for (let i = 0; i < stores.length; i++) {
    districtsList[stores[i].district] = 1;
  }
  res.json(Object.keys(districtsList));
});

// get all the resturants of a specific district
app.get("/districts/:disctrictname", (req, res) => {
  const { disctrictname } = req.params;
  const districtStores = stores.filter(
    (store) => store.district === disctrictname
  );
  res.json(districtStores);
});

// get the name of a specific restaurant by its name
app.get("/store_name", function (req, res) {
  const { storename } = req.query;
  const store = stores.find((store) => store.name === storename);
  if (store) {
    res.json({ name: store.name });
  } else {
    res.send("Store not found!");
  }
});

// get URL of a specific restaurant
app.get("/store_url", function (req, res) {
  const { storename } = req.query;
  const store = stores.find((store) => store.name === storename);
  if (store) {
    res.json({ url: store.url });
  } else {
    res.send("Store not found!");
  }
});

// Post a new resturant place
app.post(
  "/add_store",
  express.json(), // for parsing application/json body in POST
  (req, res) => {
    const { body } = req;
    console.log(body);
    stores.push(body);
    res.send("Store added!");
  }
);

// Delete an resturant
app.delete("/", function (req, res) {
  const { storename } = req.query;
  console.log(storename);
  const index = stores.findIndex((stores) => stores.name === storename);
  if (index > -1) {
    stores.splice(index, 1);
    res.send(`Store found! Deleting store with index: ${index}`);
  } else {
  }
});

module.exports = app;