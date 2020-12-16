import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('owner__reload', {
            aliases: ['reload', 'rl', '리로드', 'ㄹㄹㄷ']
        });
    }

    exec(msg: Message, args: any): any {
        Object.keys(require.cache).filter(r=>!r.includes('node_modules')).map(it => delete require.cache[it])
        this.client.commandHandler.categories.forEach(it => it.removeAll())
        this.client.listenerHandler.categories.forEach(it => it.removeAll())
        // this.client.inhibitorHandler.categories.forEach(it => it.removeAll())
        this.client.commandHandler.loadAll()
        this.client.listenerHandler.loadAll()
        // this.client.inhibitorHandler.loadAll()
        return msg.react('✅')
    }
}