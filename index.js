const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();

// --------------------
// STEP 1: EXPRESS SERVER (Render keep-alive)
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
// STEP 2: DEBUG STARTUP
// --------------------
console.log("STEP 1: File loaded");
console.log("STEP 2: Token exists =", !!process.env.TOKEN);

// --------------------
// STEP 3: CREATE DISCORD CLIENT
// --------------------
console.log("STEP 3: Creating Discord client...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

console.log("STEP 4: Client created");

// --------------------
// STEP 4: EVENTS
// --------------------
client.once("ready", () => {
    console.log("STEP 6: READY EVENT FIRED");
    console.log(`Bot online as ${client.user.tag}`);
});

client.on("error", (err) => {
    console.error("DISCORD ERROR:", err);
});

client.on("debug", (info) => {
    console.log("DEBUG:", info);
});

// --------------------
// STEP 5: LOGIN
// --------------------
console.log("STEP 5: Attempting login...");

client.login(process.env.TOKEN)
    .then(() => {
        console.log("STEP 7: LOGIN SUCCESSFUL");
    })
    .catch((err) => {
        console.error("LOGIN FAILED:");
        console.error(err);
    });