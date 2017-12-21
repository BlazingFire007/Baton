module.exports = class Manage {
    constructor(client) {
        this.client = client;
        this.commands = ["prefix"];
    }
    getServer(id) {
        return this.client.servers.find(e => e.id === id);
    }
    canManage(member) {
        let result;
        try {
            if (member.hasPermission("MANAGE_GUILD")) result = true;
            else result = false;
        } catch (error) {
            console.log(error.toString());
            result = error;
        }
        return result;
    }
    prefix({member, guild, channel}, prefix) {
        if (!this.canManage(member)) {
            return channel.send("Error: must have the Manage Guild permission.");
        }
        let server = this.getServer(guild.id);
        if (server === undefined) return channel.send("Error: Server not in database. Please report this to the bot developer.").catch(console.error);

        let index = this.client.servers.findIndex(e => e.id === server.id);
        this.client.servers[index].prefix = prefix;

        this.client.tools.manager.refresh();

        channel.send("Success! Prefix is now: `"+prefix+"`. Remember, if you forget the prefix, you can always use `baton prefix ;` to set it back.").catch(console.error);
    }
}