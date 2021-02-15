const Role = require('../models/role')
module.exports = async client => {
    client.customRoles = []
    for (const role of await Role.find()) {
        client.customRoles.push(role)
    }
}
