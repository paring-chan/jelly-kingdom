import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('common_add_ester_egg', {
            aliases: ['이스터에그추가'],
            channel: 'dm',
            args: [
                {
                    type: 'string',
                    prompt: {
                        start: '이스터에그를 등록할 명령어를 입력해주세요',
                    },
                    id: 'question'
                },
                {
                    type: 'string',
                    prompt: {
                        start: '이스터에그 타입을 입력해주세요(텍스트/사진)'
                    },
                    id: 'resType'
                },
                {
                    type: 'string',
                    prompt: {
                        start: '대답을 입력해주세요'
                    },
                    id: 'res',
                    match: 'text'
                }
            ]
        });
    }

    async exec(msg: Message, {res, question, resType}: {question: string, resType: string, res: string}) {
        if (!['텍스트', '사진'].includes(resType)) return msg.reply('타입이 잘못되었습니다')
        if ((await this.client.db('eastereggs').where({req: question}))[0]) {
            return msg.reply('추가되었습니다')
        }
        await this.client.db('eastereggs').insert({req: question, res, type: resType})
        return msg.reply('추가되었습니다')
    }
}