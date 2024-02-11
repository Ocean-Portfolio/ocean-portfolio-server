import { EmbedBuilder, WebhookClient } from 'discord.js';

const embedContents = (content: string, description?: string) => {
  return new EmbedBuilder()
    .setTitle(content)
    .setDescription(`${description || ''}`);
};

const successMessage = (webhookClient: WebhookClient) => {
  webhookClient.send({
    username: 'oceanBot',
    avatarURL:
      'https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512',
    embeds: [
      embedContents(
        `Success: API 서버 재시작`,
        '서버가 재시작 및 DB 서버 커넥션 성공 되었습니다. 업데이트가 되었을 수 있습니다',
      ).setColor(0x008d62),
    ],
  });
};

const failureMessage = (webhookClient: WebhookClient) => {
  webhookClient.send({
    username: 'oceanBot',
    avatarURL:
      'https://cdn.discordapp.com/app-icons/1044621624864940163/87fe18353f90a7a4c275be945afc14e5.png?size=512',
    embeds: [
      embedContents(
        `Failure: API 서버 재시작`,
        'DB 서버 커넥션이 실패 하였습니다. API 서버 유동 IP 주소를 확인해주세요.',
      ).setColor(0x9b111e),
    ],
  });
};

const discordWebhookSend = (isSuccess: boolean) => {
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  if (isSuccess === false) {
    failureMessage(webhookClient);
  } else {
    successMessage(webhookClient);
  }
};

export default discordWebhookSend;
