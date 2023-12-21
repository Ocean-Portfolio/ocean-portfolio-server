import { Body, Controller, Patch } from '@nestjs/common';
import { SectionTable } from 'src/dto/section.dto';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Patch()
  async updateSectionById(@Body() input: SectionTable): Promise<SectionTable> {
    return await this.sectionService.updateSectionById(input);
  }
}
