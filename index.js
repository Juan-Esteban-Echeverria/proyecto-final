require("dotenv").config();
const express = require("express");
const { usuarios } = require("./database/db");
const app = express();

app.get("/", async (req, res) => {
    try {
        const { rows } = await usuarios();
        return res.json(rows);
    } catch (error) {
        console.log(error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("SERVER ON " + PORT));