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

    exec(msg: Message): any {
        if (msg.content.startsWith(this.client.commandHandler.prefix as string)) {
            return msg.channel.send(Embed.create(msg).setTitle('명령어 없음').setDescription('그런 명령어 없다구요!'))
        }
    }
}