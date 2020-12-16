import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('common_mine', {
            aliases: ['채굴'],
            channel: 'guild',
        });
    }

    async exec(msg: Message) {
        let user = await this.client.db('users').where({id: msg.author.id}).then(r=>r[0])
        if (!user) {
            await this.client.db('users').insert({id: msg.author.id})
            user = await this.client.db('users').where({id: msg.author.id}).then(r=>r[0])
        }
        await this.client.db('users').increment('mine', 1).where({id: msg.author.id})
        await msg.reply(`젤리를 하나 캤다! 이제 ${user.mine+1}개다!`)
    }
}