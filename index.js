const Discord = require("discord.js");
global.jsonfile = require("jsonfile");

const client = new Discord.Client();
const mod = require("./src/structs/module.js");
client.mods = {};
// All modules are loaded from the path ./src/structs/module.js

//tools
const parser = mod.load("../parse/parser.js", client);
const manager = mod.load("../manager/manager.js", client);
//modules
const general = mod.load("../modules/general.js", client);
client.mods = {
    parser: parser,
    general: general
};
client.on("ready", async () => {
    let guilds = jsonfile.readFileSync("./src/data/guilds.json");
    for (let guild of client.guilds.values()) {
        if (!guilds.some(e => e.id === guild.id)) {
            let server = mod.load("./server.js", false);
            server.id = guild.id;
            manager.addGuild(server);
        }
    }
    console.log("ready");
});

client.on("message", message => parser.parse(message));

client.on("guildCreate", guild => {
    let server = mod.load("./server.js", false);
    server.id = guild.id;
    manager.addGuild(server);
});

client.on("guildDelete", guild => manager.removeGuild(guild.id));

client.login("");
