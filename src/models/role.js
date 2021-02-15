const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({
    roleID: { type: String, default: undefined },
    memberID: { type: String, default: undefined },
    timestamp: { type: String, default: Date.now() },
})
module.exports = mongoose.model('Role', roleSchema)
