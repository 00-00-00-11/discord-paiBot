const dotenv = require('dotenv')
dotenv.config()

const logs = require('discord-logs')
const Discord = require('discord.js')
const mongoose = require('mongoose')
const handleMessageEvent = require('./helpers/handleMessageEvent')
const loadCommands = require('./helpers/loadCommands')
const loadShopItems = require('./helpers/loadShopItems')
const loadCustomRoles = require('./helpers/loadCustomRoles')
const deleteCustomRoles = require('./helpers/deleteCustomRoles')

const client = new Discord.Client({
    partials: ['MESSAGE', 'GUILD_MEMBER'],
})

logs(client).then(async () => {
    await loadCommands(client)
    await loadShopItems(client)
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}.qugzj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected')
    await loadCustomRoles(client)
    client.login(process.env.TOKEN)
})

client.on('ready', async () => {
    deleteCustomRoles(client)
})

client.on('message', async msg => {
    handleMessageEvent(msg, client)
})

client.on('error', e => {
    console.error('Client error', e)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection:', reason, promise)
})
