const express = require("express");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();

// ---------------- WEB SERVER ----------------
const app = express();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Web server running on port", PORT);
});

// ---------------- DISCORD BOT ----------------
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

// ONLY error logging (no token printing, no noise)
client.on("error", (err) => {
    console.error("Discord error:", err);
});

client.once("ready", () => {
    console.log("Bot online as:", client.user.tag);
});

client.login(process.env.TOKEN)
    .then(() => {
        console.log("Login successful");
    })
    .catch((err) => {
        console.error("Login FAILED:");
        console.error(err);
    });
console.log("TOKEN EXISTS:", !!process.env.TOKEN);

client.login(process.env.TOKEN)
    .then(() => {
        console.log("Login successful");
    })
    .catch((err) => {
        console.error("LOGIN FAILED:");
        console.error(err);
    });