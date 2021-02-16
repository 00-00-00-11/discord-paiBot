const Discord = require('discord.js')
const Member = require('../models/member')
const config = require('../config.json')
module.exports = {
    name: 'coins',
    aliases: ['коины'],
    channels: [config.channels.bot],
    async run(message) {
        let member = message.mentions.members.first() || message.member
        const coins = new Discord.MessageEmbed()
        coins.setAuthor(`${member.user.username}`, `${member.user.avatarURL() ?? ''}`)
        coins.color = '#ffea2b'
        let user = (await Member.find({ 'info.id': member.id }))[0]
        if (!user)
            if (message.member.id !== member.id) return message.reply(message.lang.get('errors.userNotInDb', member?.user?.username))
            else return
        coins.setDescription(message.lang.get('commands.coins', member?.user?.username, user.stats.coins))
        message.channel.send(coins)
    },
}
