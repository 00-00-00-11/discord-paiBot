const Discord = require('discord.js')
const Role = require('../models/role')
module.exports = {
    name: 'role',
    aliases: ['роль'],
    async run(message, client, msgContent) {
        const args = msgContent.split(/ +/).slice(1)
        let roleNumber = Number.parseInt(args[0])
        let parametr = args[1]
        let value = args[2]
        let customRoles = await Role.find({ memberID: message.member.id })

        const roleEmbed = new Discord.MessageEmbed()
        roleEmbed.setAuthor(`${message.member.user.username}`, `${message.member.user.avatarURL() ?? ''}`)
        roleEmbed.color = '#ffea2b'
        roleEmbed.setDescription(message.lang.get('commands.role.description'))
        for (let i = 0; i < customRoles.length; i++) {
            let role = await message.guild.roles.cache.get(customRoles[i].roleID)
            let date = new Date(customRoles[i].timestamp)
            let options = { month: 'long', day: 'numeric', timezone: 'Moscow' }
            date.setMonth(date.getMonth() + 1)
            roleEmbed.addField(
                `#${i + 1} | ${role.name}`,
                `${message.lang.get('commands.role.field')} \`${date.toLocaleString(message.lang.get('code'), options)}\``,
                true
            )
        }
        roleEmbed.addField(message.lang.get('commands.role.usage'), message.lang.get('commands.role.usageDescription'))

        if (!roleNumber || isNaN(roleNumber) || !parametr || !value) return message.channel.send(roleEmbed)
        if (!customRoles[roleNumber - 1]) return message.channel.send(message.lang.get('commands.role.noSuchRole'))

        switch (parametr) {
            case 'color':
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                    let role = await message.guild.roles.fetch(customRoles[roleNumber - 1].roleID)
                    role.setColor(`${value}`)
                    return message.channel.send(message.lang.get('commands.role.success'))
                } else return message.channel.send(message.lang.get('commands.role.wrongHex'))
            case 'name':
                let role = await message.guild.roles.fetch(customRoles[roleNumber - 1].roleID)
                await role.setName(args.slice(2).join(' '))
                return message.channel.send(`message.lang.get('commands.role.success')`)
            default:
                return message.channel.send(Wrong)
        }
    },
}
