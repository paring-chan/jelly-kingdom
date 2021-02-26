import {Listener} from "discord-akairo";
import {Message} from "discord.js";
import Embed from "../../util/Embed";

export default class extends Listener {
    constructor() {
        super('listeners__commandBlocked', {
            emitter: 'commandHandler',
            event: 'messageInvalid'
        });
    }

    async exec(msg: Message) {
        if (msg.content.startsWith(this.client.commandHandler.prefix as string)) {
            const str = msg.content.slice((this.client.commandHandler.prefix as string).length).split(' ')[0]
            const ester = await this.client.db('eastereggs').where({req: str}).then(it => it[0])
            if (ester) {
                if (msg.guild) await msg.delete()
                let res
                switch (ester.type) {
                    case '사진':
                        res = Embed.create(msg).setTitle(str).setImage(ester.res)
                        break
                    case '텍스트':
                    default:
                        res = Embed.create(msg).setTitle(str).setDescription(ester.res)
                }
                res.footer!.text = res.footer!.text + ''
                await msg.author.send(res)
            }
        }
    }
}
