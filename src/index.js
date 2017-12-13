const Discord = require("discord.js");
const client = new Discord.Client();
const parser = require("./parse/parser.js")(client);

client.on("message", parse.parse);


client.login("");
