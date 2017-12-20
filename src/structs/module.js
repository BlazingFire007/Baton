module.exports = {
    load: function(path, client) {
        let result;
        try {
            result = (client === false ? (require(path)) : new (require(path))(client));
        } catch (error) {
            result = error;
            console.log(error.toString());
        }
        return result;
    }
}