import { Resolver, Query } from '@nestjs/graphql';
import { DatabaseService } from './database.service';

interface NowResult {
  now: string;
}

@Resolver()
export class AppResolver {
  constructor(private readonly db: DatabaseService) {}

  /**
   * @api {post} /graphql sayHello
   * @apiName sayHello
   * @apiGroup graphql
   *
   * @apiSuccess {String} msg 데이터 베이스의 현재시각을 반환해요
   *
   * @apiParam {Null} none
   *
   * @apiBody {Graphql} query {sayHello}
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     Database time: ${timeNow}
   *
   * @apiError NotFound 알수없는 요청
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "error"
   *     }
   */
  @Query(() => String)
  async sayHello() {
    const result = await this.db.query<NowResult>('SELECT NOW()', []);
    const timeNow = result.rows[0].now;
    return `Database time: ${timeNow}`;
  }
}
