import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('role__resetColor', {
            aliases: ['색깔초기화'],
            channel: "guild"
        });
    }

    async exec(msg: Message, args: any) {
        let role = msg.guild!.roles.cache.find(r=>r.name === 'colorRole__' + msg.author.id)
        if (role) {
            await role.delete('Color reset requested by ' + msg.author.tag)
        }
        await msg.react('✅')
    }
}