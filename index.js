const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
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
// DISCORD BOT STARTUP
// --------------------
console.log("STEP 1: File loaded");

// IMPORTANT: Do NOT log token or token details
if (!process.env.TOKEN) {
    console.error("ERROR: TOKEN is missing in environment variables!");
}

console.log("STEP 2: Creating Discord client...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

console.log("STEP 3: Client created");

// --------------------
// EVENTS
// --------------------
client.once("ready", () => {
    console.log(`Bot online as ${client.user.tag}`);
});

client.on("error", (err) => {
    console.error("DISCORD ERROR:", err);
});

client.on("warn", (info) => {
    console.log("DISCORD WARN:", info);
});

// --------------------
// LOGIN
// --------------------
console.log("STEP 4: Attempting login...");

client.login(process.env.TOKEN)
    .then(() => {
        console.log("LOGIN SUCCESSFUL");
    })
    .catch((err) => {
        console.error("LOGIN FAILED:");
        console.error(err);
    });