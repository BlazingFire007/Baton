const Discord = require("discord.js");
global.jsonfile = require("jsonfile");

const client = new Discord.Client();
const mod = require("./src/structs/module.js");
client.servers = [];
client.mods = {};
// All modules are loaded from the path ./src/structs/module.js

//tools
const parser = mod.load("../parse/parser.js", client);
const manager = mod.load("../manager/manager.js", client);
//modules
const general = mod.load("../modules/general.js", client);
const developer = mod.load("../modules/developer.js", client);
const manage = mod.load("../modules/manage.js", client);
client.mods = {
    developer: developer,
    general: general,
    manage: manage
};
client.tools = {
    parser: parser,
    manager: manager
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
    client.servers = manager.servers;
    for (let guild of client.servers) {
        if (!client.guilds.some(e => e.id === guild.id)) {
            manager.removeGuild(guild.id);
        }
    }
    client.servers = manager.servers;
    console.log("ready");
});

client.on("message", message => parser.parse(message));

client.on("guildCreate", guild => {
    let server = mod.load("./server.js", false);
    server.id = guild.id;
    manager.addGuild(server);
    client.servers = manager.servers;
});

client.on("guildDelete", guild => { manager.removeGuild(guild.id); client.servers = manager.servers; });

client.login("");
