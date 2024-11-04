import express from "express";
import bodyparser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import qr from 'qr-image';
import fs from 'fs';

const app = express();
const port =3000;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.post("/generate",(req, res) => {
    generateQR(req);
    res.sendFile(__dirname + "/public/generatedQr.html");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
function generateQR(req){
    var url = req.body["url"];
    var qr_png = qr.image(url);
    var imgPath = __dirname + "/public/qr_image.png";
    qr_png.pipe(fs.createWriteStream(imgPath));
    
}


