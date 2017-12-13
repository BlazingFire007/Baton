module.exports = class Parser() {
  constructor(client) {
    this.client = client;
  }
  parse(message) {
    if (message.author.bot || message.channel.type !== "text") return;
  }
};
