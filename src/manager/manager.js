module.exports = class Manager {
    constructor(client) {
        this.client = client;
    }
    addGuild(server) {
        let result;
        try {
            let guilds = jsonfile.readFileSync("./src/data/guilds.json");
            guilds.push(server);
            result = jsonfile.writeFileSync("./src/data/guilds.json", guilds);
        } catch (error) {
            console.log(error.toString());
            result = error;
        }
        return result;
    }
    removeGuild(id) {
        let result;
        try {
            let guilds = jsonfile.readFileSync("./src/data/guilds.json");
            guilds = guilds.filter(e => e.id !== id);
            result = jsonfile.writeFileSync("./src/data/guilds.json", guilds);
        } catch (error) {
            console.log(error.toString());
            result = error;
        }
    }
    refresh() {
        let result;
        try {
            result = jsonfile.writeFileSync("./src/data/guilds.json", this.client.servers);
        } catch (error) {
            console.log(error.toString());
            result = error;
        }
        return result;
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
}