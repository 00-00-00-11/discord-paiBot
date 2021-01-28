const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
module.exports = async (client) => {
    client.commands = new Discord.Collection();
    for (const item of fs.readdirSync(path.resolve(__dirname, "..", "commands"))) {
        const command = require(path.resolve(__dirname, "..", "commands", item));
        client.commands.set(command.name, command);
    }
};
