import { Controller, Get, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FourSquareDataService } from 'src/service/foursquareData.service';
import { Response } from 'express';

@Controller('/originData')
export class OriginTravelDataController {
  constructor(private readonly fsDataService: FourSquareDataService) {}

  @Get()
  async getFSData(@Res() res: Response) {
    const result = await firstValueFrom(this.fsDataService.getNearPlace());

    res.send(`<pre>${JSON.stringify(result, null, 2)}</pre>`);
  }
}
