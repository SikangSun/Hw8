import express from "express";
const router = express.Router();
import { MongoClient } from 'mongodb'
router.use(express.json());







/* GET home page. */
router.get("/", (req, res, next) => {
  return res.send({hello: "world"});
});
router.post("/create", (req, res, next) => {
  const obj = req.body
  console.log(obj)
  MongoClient.connect(process.env.MONGODB_URL, (err, db) => {
    if (err) throw err;
    const dbo = db.db("hw8");
    dbo.collection("blog").insertOne(obj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    })
  })
});

router.get("/feed", async (req, res, next) => {
  const obj = req.body
  let returnobj = [];
  console.log(returnobj)
  await MongoClient.connect(process.env.MONGODB_URL, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("hw8");
    console.log("in");
    await dbo.collection("blog").find().forEach(ob => returnobj.push(ob))
    res.send(returnobj)
  })

});

export default router;
