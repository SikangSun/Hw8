import express from "express";
const router = express.Router();
import { MongoClient } from 'mongodb'
import { ObjectId } from "mongodb"

router.use(express.json());







/* GET home page. */
router.get("/", (req, res, next) => {
  return res.send({hello: "world"});
});
router.post("/create", (req, res, next) => {
  const temp = req.body
  if (temp.password !== "12345") {
    res.status(401);
    return res.send("Wrong Password");
  }
  const obj = {title: temp.title,
                content: temp.content}
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

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;

  await MongoClient.connect(process.env.MONGODB_URL, async (err, db) => {
    if (err) throw err;
    const dbo = db.db("hw8");
    console.log("in");
    await dbo.collection("blog").deleteOne({_id: ObjectId(id)});
    // res.send(returnobj)
  })

});

export default router;
