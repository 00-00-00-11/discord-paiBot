const Discord = require('discord.js')
const Member = require('../models/member')
const config = require('../config.json')
module.exports = {
    name: 'coins',
    aliases: ['коины'],
    channels: [config.channels.bot],
    async run(message) {
        let member = message.mentions.members.first() || message.member
        const Coins = new Discord.MessageEmbed()
        Coins.setAuthor(`${member.user.username}`, `${member.user.avatarURL() ?? ''}`)
        Coins.color = '#ffea2b'
        let user = await Member.find({ 'info.id': member.id })
        if (!user[0])
            if (message.member.id !== member.id)
                return message.reply(message.lang.get('errors.userNotInDb', member?.user?.username))
            else return
        Coins.setDescription(message.lang.get('commands.coins', member?.user?.username, user[0].stats.coins))
        message.channel.send(Coins)
    },
}
