module.exports = {
    name: "ping",
    aliases: ["пинг"],
    async run(message) {
        message.reply(message.lang.get("commands.ping"));
    },
};
