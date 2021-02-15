const Lang = require('../langs')
const Member = require('../models/member')
const config = require('../config.json')

module.exports = async (msg, client) => {
    if (msg.partial) await msg.fetch()
    if (msg.member?.partial) await msg.member?.fetch()
    if (!msg.member) return
    if (msg.member.user.bot || msg.channel.type === 'dm') return

    const prefixRegex = new RegExp(`^<@!${client.user.id}>|!`)
    const matchedPrefix = msg.content.toLowerCase().match(prefixRegex)
    if (!matchedPrefix) return

    const message = msg.content.substring(matchedPrefix[0].length).trim()
    const args = message.toLowerCase().split(/ +/)

    const command = client.commands.find(
        command => command.name === args[0] || command.aliases?.includes(args[0]) || command.regexp?.test(message)
    )
    if (!command) return

    msg.lang = new Lang(msg)
    const noPermission = msg.lang.get('errors.noPermissions', command.permission ?? '')

    if (!msg.member.hasPermission('ADMINISTRATOR') && !!command.channels && !command?.channels.includes(msg.channel.id)) return

    if (!config.exceptionChannels.some(i => i.id === msg.channel.id)) {
        let member = await Member.find({ 'info.id': msg.member.id })
        if (member[0]) {
            member[0].stats.globalMsg++, member[0].stats.monthMsg++, member[0].stats.exp++
            if (member[0].stats.exp >= member[0].stats.lvl * 1200) {
                member[0].stats.lvl++, (member[0].stats.exp = 0)
            }
            await member[0].save()
        } else await msg.reply(msg.lang.get('errors.youAreNotInDb'))
    }

    if (!!command.permission && !msg.member.hasPermission(command.permission)) return msg.reply(noPermission)
    else await command.run(msg, client, message)
}
