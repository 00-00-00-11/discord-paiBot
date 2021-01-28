const mongoose = require('mongoose')
const memberSchema = mongoose.Schema({
    info: {
        id: { type: String, default: undefined },
        name: { type: String, default: undefined },
        warns: { type: Number, default: 0 },
        globalWarns: { type: Number, default: 0 },
    },
    stats: {
        lvl: { type: Number, default: 1 },
        exp: { type: Number, default: 0 },
        coins: { type: Number, default: 0 },
        totalProfit: { type: Number, default: 0 },
        globalTime: { type: Number, default: 0 },
        monthTime: { type: Number, default: 0 },
        globalMsg: { type: Number, default: 0 },
        monthMsg: { type: Number, default: 0 },
    },
    games: {
        blackjack: {
            wins: { type: Number, default: 0 },
            games: { type: Number, default: 0 },
        },
        coinflip: {
            wins: { type: Number, default: 0 },
            games: { type: Number, default: 0 },
        },
        duel: {
            wins: { type: Number, default: 0 },
            games: { type: Number, default: 0 },
        },
    },
    clan: {
        id: { type: String, default: undefined },
        name: { type: String, default: undefined },
        exp: { type: Number, default: 0 },
        isLeader: { type: Boolean, default: false },
        role: { type: String, default: undefined },
    },
    timers: {
        warnTimeout: { type: Number, default: 0 },
    },
    customRoles: { type: Array, default: [] },
})
module.exports = mongoose.model('Member', memberSchema)
