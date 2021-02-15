const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
    name: 'shop',
    aliases: ['шоп', 'магазин'],
    channels: [config.channels.bot, config.channels.casino],
    async run(message, client) {
        const Shop = new Discord.MessageEmbed()
        Shop.color = '#ffea2b'
        Shop.setAuthor(message.lang.get('commands.shop.header'))
        Shop.setFooter(`${message.member.user.username}`, `${message.member.user.avatarURL() ?? ''}`)
        client.shopItems.forEach(item =>
            Shop.addField(message.lang.get(item.name), message.lang.get('commands.shop.body', item.price, item.code), true)
        )
        message.channel.send(Shop)
    },
}
