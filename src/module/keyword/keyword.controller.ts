import { Body, Controller, Patch } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordTable } from 'src/dto/keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Patch()
  async updateKeywordById(@Body() input: KeywordTable) {
    return await this.keywordService.updateKeywordById(input);
  }
}
