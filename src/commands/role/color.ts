import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('role__color', {
            aliases: ['색깔'],
            channel: "guild",
            args: [
                {
                    type: 'color',
                    id: 'color',
                    prompt: {
                        start: '색을 입력해주세요\n`취소`를 입력하면 취소됩니다.',
                        cancelWord: '취소',
                        retry: '색이 잘못되었습니다. 다시 시도해주세요',
                        timeout: '시간초과 되었습니다.'
                    }
                }
            ]
        });
    }

    async exec(msg: Message, args: any) {
        let role = msg.guild!.roles.cache.find(r=>r.name === 'colorRole__' + msg.author.id)
        if (!role) {
            role = await msg.guild!.roles.create({
                data: {
                    color: args.color,
                    name: 'colorRole__' + msg.author.id,
                    mentionable: false
                }
            })
        } else {
            await role.edit({
                color: args.color
            })
        }
        await msg.member!.roles.add(role)
        await msg.react('✅')
    }
}