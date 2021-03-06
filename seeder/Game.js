require("dotenv").config();
let mongoose = require("mongoose");
let db = require("../models");



mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// X Array feeder
let feederArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let xArray = []

while (xArray.length < 10) {
  let value = feederArray[Math.floor(Math.random() * 10)]
  let check = false;
  for (let i = 0; i < xArray.length; i++) {
    if (xArray[i] == value) {
      check = true
    }
  }

  if (check == false) {

    xArray.push(value);
  }

}

//Y Array feeder
let yArray = []

while(yArray.length < 10) {
  let value = feederArray[Math.floor(Math.random() * 10)]
  let check = false;
  for (let i = 0; i < xArray.length; i++) {
    if (yArray[i] == value) {
      check = true
    }
  }

  if (check == false) {

    yArray.push(value);
  }

}

//squares seeder

let squareArray = [];

for (var i = 0; i < 100; i++) {
    let squareSeed =
    {
        _id: "",
        name: "",
        active: true,
        color: ""

    };
    squareArray.push(squareSeed)
    squareArray[i]._id = "" + i;
}

let gameSeed = 
  {
    ownerId: 1,
    xArray: xArray,
    yArray: yArray

  };




let start = async ()=> {
  await db.Game.deleteMany({})
  let data = await db.Game.create(gameSeed);
  await db.Game.updateOne({ _id: data._id }, { squares: squareArray });
  process.exit(0);
}

start();