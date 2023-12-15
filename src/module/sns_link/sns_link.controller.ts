import { Body, Controller, Patch, Post } from '@nestjs/common';
import { SNSLinkService } from './sns_link.service';
import { CreateSNSLink, SNSLinkTable } from 'src/dto/sns_link.dto';

@Controller('sns_link')
export class SNSLinkController {
  constructor(private readonly snsLinkService: SNSLinkService) {}

  @Post()
  async createSNSLink(@Body() input: CreateSNSLink): Promise<SNSLinkTable> {
    return await this.snsLinkService.createSNSLink(input);
  }

  @Patch()
  async updateSNSLink(
    @Body() input: SNSLinkTable,
  ): Promise<SNSLinkTable | null> {
    return await this.snsLinkService.updateSNSLinkById(input);
  }
}
