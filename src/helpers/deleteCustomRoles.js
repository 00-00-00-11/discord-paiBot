const Role = require('../models/role')
module.exports = async client => {
    const check = async () => {
        checkTimeout = setTimeout(() => check(), 1 * 60 * 60 * 1000)
        let date = new Date()
        for (const [, guild] of client.guilds.cache) {
            for (const customRole of client.customRoles) {
                if (customRole.timestamp < date.setMonth(date.getMonth() - 1)) {
                    const role = guild.roles.cache.get(customRole.roleID)
                    if (role) {
                        ;(await Role.find({ roleID: role.id }))[0].delete()
                        await role.delete()
                    }
                }
            }
        }
    }
    check()
}
