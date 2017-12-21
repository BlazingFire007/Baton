module.exports = class Developer {
    constructor(client) {
        this.client = client;
        this.commands = ["eval"];
    }
    eval(message, code) {
        if (message.author.id !== "190313064367652864") message.channel.send("Error: This command can only be used by the developer.").catch(console.error);
        try {
            let out = eval(code||"").toString().replace(new RegExp(this.client.token, "gi"), "token");
            message.delete().catch(console.error);
            message.channel.send(`Input:\`\`\`js\n${code}\`\`\``).catch(console.error);
            message.channel.send(`Output:\`\`\`js\n${out}\`\`\``).catch(console.error);
        } catch (error) {
            message.channel.send(`Input:\`\`\`js\n${code}\`\`\``).catch(console.error);
            message.channel.send(`Error:\`\`\`js\n${error.toString()}\`\`\``).catch(console.error);
        }
        return true;
    }
}