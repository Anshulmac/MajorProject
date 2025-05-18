const mongoose= require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const mongo_url="mongodb://127.0.0.1:27017/WanderLust";

main()
.then(()=>{
    console.log("connected to database");
}).catch(err =>{
    console.log(err);
});


async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async() =>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"67fe428fd531795b05879c4e"}));
    await listing.insertMany(initData.data);
    console.log("data is initialised");
}

initDB();