const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
module.exports = async client => {
    client.shopItems = new Discord.Collection()
    for (const item of fs.readdirSync(path.resolve(__dirname, '..', 'shop'))) {
        const shopItem = require(path.resolve(__dirname, '..', 'shop', item))
        client.shopItems.set(shopItem.code, shopItem)
    }
}
