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
            const esterEgg = require('../../../easteregg.json')
            if (msg.member) await msg.channel.send(Embed.create(msg).setTitle('명령어 없음').setDescription('그런 명령어 없다구요!'))
            const str = msg.content.slice((this.client.commandHandler.prefix as string).length).split(' ')[0]
            if (esterEgg[str]) {
                const ester = esterEgg[str]
                let res
                switch (ester.type) {
                    case 'image':
                        res = Embed.create(msg).setTitle(str).setImage(ester.data)
                        break
                    case 'text':
                    default:
                        res = Embed.create(msg).setTitle(str).setDescription(ester.data)
                }
                await msg.author.send(res)
            }
        }
    }
}