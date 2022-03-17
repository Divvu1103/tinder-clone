import express from "express";
import mongoose from "mongoose";
import Cors from 'cors';
import Cards from "./dbCards.js";
const app = express();
const port = process.env.PORT || 8000;
const connection_url = `mongodb+srv://tinderclone:tinderclone@cluster0.n3pvl.mongodb.net/tinder?retryWrites=true&w=majority`;
app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get("/", (req, res) => {
  res.status(201).send("hello");
});
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})
app.listen(port, () => console.log(`listening  on port ${port}`));
