module.exports = class Parser {
  constructor(client) {
    this.client = client;
  }
  get servers() {
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
    if (message.author.bot || message.channel.type !== "text") return;
    for (let guildObject of this.servers) {
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
      Object.values(this.client.mods).forEach(mod => {
        if (!mod.commands) return;
        if (mod.commands.includes(command)) mod[command](message, args.slice(0, 1).join(" ")); else channel.send("Error: command not found.").catch(console.error);
      });
    }
  }
  params(content) {
    return content.split(" ").map(e => e.trimRight());
  }
};
