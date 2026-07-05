const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// Web server (FOR RENDER)
const app = express();
app.get("/", (req, res) => {
    res.send("Bot is running");
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Web server running");
});

// Discord bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    console.log(`Bot online as ${client.user.tag}`);
});

client.login(process.env.TOKEN);