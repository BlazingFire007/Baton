const Discord = require("discord.js");
const client = new Discord.Client();
const parser = new (require("./parse/parser.js"))(client);

client.on("message", parser.parse);


client.login("");
