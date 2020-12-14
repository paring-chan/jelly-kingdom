import {AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler} from "discord-akairo";
import config from '../config.json'
import * as path from "path";
import {Message, Team, User} from "discord.js";
import Dokdo from "dokdo";

declare module 'discord.js' {
    interface Client {
        commandHandler: CommandHandler
        listenerHandler: ListenerHandler
        inhibitorHandler: InhibitorHandler
    }
}

export default class JellyClient extends AkairoClient {
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler
    inhibitorHandler: InhibitorHandler

    constructor() {
        super({
            disableMentions: 'everyone',
            restTimeOffset: 0,
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, 'listeners')
        })
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.join(__dirname, 'inhibitors'),
        })
        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, 'commands'),
            prefix: config.prefix,
            commandUtil: true,
            automateCategories: true
        })
        this.listenerHandler.setEmitters({
            client: this,
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler
        })
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
        this.inhibitorHandler.loadAll()
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
    }

    async start() {
        await this.login(config.token)
        const app = await this.fetchApplication()
        if (app.owner instanceof Team) {
            this.ownerID = app.owner.members.map(it => it.id)
        } else if (app.owner instanceof User) {
            this.ownerID = [app.owner.id]
        }
        const dokdo = new Dokdo(this, {
            prefix: config.prefix,
            owners: this.ownerID as string[],
            noPerm(msg: Message): any {
                msg.react('🚫')
            }
        })
        this.on('message', dokdo.run.bind(dokdo))
    }
}