const Member = require('../models/member')
const Role = require('../models/role')
module.exports = {
    name: 'shop.customRole',
    code: '8LUE',
    price: '0',
    async activate(message, client) {
        let user = (await Member.find({ 'info.id': message.member.id }))[0]
        if (user.stats.coins < this.price) return message.channel.send(message.lang.get('commands.buy.customRole.notEnoughCoins'))
        if ((await Role.find({ roleID: message.member.id })).length > 3)
            return message.channel.send(message.lang.get('commands.buy.customRole.tooMuchRoles'))
        let discordRole = await message.guild.roles.create({
            data: { name: message.lang.get('commands.buy.customRole.name'), position: message.guild.roles.cache.size - 1 },
        })
        await message.member.roles.add(discordRole.id)

        let role = await new Role({ roleID: discordRole.id, memberID: message.member.id }).save()
        client.customRoles.push(role)
        user.stats.coins -= this.price
        await user.save()
        message.channel.send(message.lang.get('commands.buy.customRole.success'))
    },
}
