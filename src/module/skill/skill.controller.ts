import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  /**
   * @api {post} /skill CreateSkillItem
   * @apiName createSkillItem
   * @apiGroup skill
   *
   * @apiSuccess {Integer} id 생성된 skill item 의 id 를 응답해요.
   * @apiSuccess {String} name 생성된 skill item 의 name 을 응답해요.
   * @apiSuccess {String} description 생성된 skill item 의 description 을 응답해요.
   * @apiSuccess {String} visible_status 생성된 skill item 의 visible_status 을 응답해요.
   * @apiSuccess {String} created_at 생성된 skill item 의 created_at 을 응답해요.
   * @apiSuccess {String} updated_at 생성된 skill item 의 updated_at 을 응답해요.
   * @apiSuccess {Integer} category_id 생성된 skill item 의 category_id 을 응답해요.
   * @apiSuccess {Integer} image_id 생성된 skill item 의 image_id 을 응답해요.
   *
   * @apiBody {Blob} file 이미지 파일을 전송해요.
   * @apiBody {String} imageDescription 이미지 파일의 설명을 전송해요.
   * @apiBody {String} name skill item 의 이름을 전송해요.
   * @apiBody {String} description skill item 의 설명을 전송해요.
   * @apiBody {Integer} categoryId skill item 의 카테고리 id 를 전송해요.
   * @apiBodyExample {json} Request-Example:
   * {
   *  "file": "image file",
   *  "imageDescription": "image description",
   *  "name": "skill item name",
   *  "description": "skill item description",
   *  "categoryId": 1
   * }
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "id": 1,
   *      "name": "skill item name",
   *      "description": "skill item description",
   *      "visible_status": "visible",
   *      "created_at": "2021-08-22T14:00:00.000Z",
   *      "updated_at": "2021-08-22T14:00:00.000Z",
   *      "category_id": 1,
   *      "image_id": 1
   *     }
   *
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createSkillItem(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      imageDescription?: string;
      name: string;
      description: string;
      categoryId: number;
    },
  ) {
    const result = await this.skillService.createSkillItem({
      file,
      image: {
        directory: 'skills/',
        description: body.imageDescription,
      },
      name: body.name,
      description: body.description,
      categoryId: body.categoryId,
    });

    return result;
  }
}
