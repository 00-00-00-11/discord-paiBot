const config = require('../config.json')
module.exports = {
    name: 'buy',
    channels: [config.channels.bot],
    async run(message, client, msgContent) {
        const args = msgContent.split(/ +/)
        const shopItem = client.shopItems.find(shopItem => shopItem.code === args[1])
        if (!shopItem) return
        await shopItem.activate(message, client)
    },
}
