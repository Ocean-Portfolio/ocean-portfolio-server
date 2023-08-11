import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}
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
   *     'Hello World!'
   *
   * @apiError NotFound 알수없는 요청
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "error"
   *     }
   */
  async getHello(): Promise<string> {
    console.log('check database connection');

    try {
      const connectCheck = await this.databaseService.query<string>(
        `SELECT EXISTS (
        SELECT FROM pg_catalog.pg_tables 
        WHERE  schemaname != 'pg_catalog' 
        AND    schemaname != 'information_schema'
        AND    tablename  = 'travel_plan'
     );`,
        [],
      );
      console.log(connectCheck.rows[0]);
    } catch (error) {
      console.log(error);
    }

    return `Hello World!`;
  }
}
