const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// --------------------
// EXPRESS SERVER (Render keep-alive)
// --------------------
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Web server running on port", PORT);
});

// --------------------
// DISCORD BOT (MINIMAL TEST)
// --------------------
console.log("STEP 1: File loaded");
console.log("STEP 2: Starting Discord client...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

console.log("STEP 3: Client created");

client.on("ready", () => {
    console.log("BOT ONLINE:", client.user.tag);
});

client.on("error", (err) => {
    console.error("DISCORD ERROR:", err);
});

client.on("warn", (info) => {
    console.log("DISCORD WARN:", info);
});

console.log("STEP 4: Attempting login...");

client.login(process.env.TOKEN)
    .then(() => {
        console.log("LOGIN PROMISE RESOLVED");
    })
    .catch((err) => {
        console.error("LOGIN FAILED:");
        console.error(err);
    });