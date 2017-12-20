module.exports = class General {
    constructor(client) {
        this.client = client;
        this.commands = ["ping"];
    }
    async ping({channel, createdTimestamp}) {
        let result;
        try {
            const message = await channel.send("Pong! `xms`");
            result = message.edit(`Pong! \`${message.createdTimestamp - createdTimestamp}ms\``);
        } catch (error) {
            console.log(error.toString());
            result = error;
        }
        return result;
    }
}