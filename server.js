/**
 * Author: Elia Contini <https://elia.contini.page/>
 */

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const multer = require("multer");

const app = express();
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    const file = req.file;

    const metadata = {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
    };

    return res.json(metadata);
});

const port = process.env.APP_PORT || 3000;
app.listen(port, function () {
    console.log(`Your app is listening on port ${port}`);
});
