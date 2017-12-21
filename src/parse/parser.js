module.exports = class Parser {
  constructor(client) {
    this.client = client;
  }
  get servers() { // probably not needed since the index file now updates this.client.servers
    let result;
    try {
      result = jsonfile.readFileSync("./src/data/guilds.json");
    } catch (error) {
      console.log(error.toString());
      result = error;
    }
    return result;
  }
  async parse(message) {
    const {channel, content, author, guild} = message;
    if (author.bot || channel.type !== "text") return;

    for (let guildObject of this.client.servers) {
      if (guild.id !== guildObject.id) continue;
      if (guildObject.ignored.includes(channel.id)) return;

      let args = this.params(content);
      let pref;
      if (args[0].toLowerCase() === "baton")  {
        args.shift();
        pref = "";
      } else {
        pref = guildObject.prefix;
      }
      let command = args[0].toLowerCase();

      if (!command.startsWith(pref)) return;
      command = command.slice(pref.length, args[0].length);
      let success = false;
      Object.values(this.client.mods).forEach(mod => {
        if (!mod.commands) return;
        if (mod.commands.includes(command)) { 
          mod[command](message, args.filter((e,i)=>i!==0).join(" "));
          success = true;
        }
      });
      if (success === false) channel.send("Error: command not found.").catch(console.error);
    }
  }
  params(content) {
    return content.split(" ").map(e => e.trimRight());
  }
};
