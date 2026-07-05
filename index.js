const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();

// --------------------
// EXPRESS (Render keep-alive)
// --------------------
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// --------------------
// DISCORD BOT
// --------------------
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

// Debugging
client.on("debug", console.log);
client.on("error", console.error);

client.once("ready", () => {
    console.log(`Bot online as ${client.user.tag}`);
});

// Login with explicit error handling
client.login(process.env.TOKEN)
    .then(() => {
        console.log("Login successful");
    })
    .catch((err) => {
        console.error("Login FAILED:");
        console.error(err);
    });