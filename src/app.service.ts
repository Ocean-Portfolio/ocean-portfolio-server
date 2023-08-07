import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * @api {get} / getHello
   * @apiName getHello
   * @apiGroup Test
   *
   * @apiSuccess {String} msg Hello World! 메시지를 응답해요.
   *
   * @apiParam {Null} none "아무것도 보내지 않아도 되요."
   *
   * @apiBody {Null} none "아무것도 보내지 않아도 되요."
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "msg": "Hello World!"
   *     }
   *
   * @apiError NotFound 알수없는 요청
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "error"
   *     }
   */
  getHello(): {
    msg: string;
  } {
    return {
      msg: 'Hello World!',
    };
  }
}
