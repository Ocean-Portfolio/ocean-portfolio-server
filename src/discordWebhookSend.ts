import { EmbedBuilder, WebhookClient } from 'discord.js';

const embedContents = (content: string, description?: string) => {
  return new EmbedBuilder().setTitle(content).setDescription(`${description}`);
};

const discordWebhookSend = () => {
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  webhookClient.send({
    username: 'oceanBot',
    avatarURL:
      'https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512',
    embeds: [
      embedContents(
        `API 서버 재시작`,
        '서버가 재시작 및 DB 서버 커넥션 성공 되었습니다. 업데이트가 되었을 수 있습니다',
      ).setColor(0x008d62),
    ],
  });
};

export default discordWebhookSend;
