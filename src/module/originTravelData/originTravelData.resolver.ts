import { Query, Resolver } from '@nestjs/graphql';
import { FourSquareDataService } from 'src/service/foursquareData.service';

@Resolver()
export class OriginTravelDataResolver {
  constructor(private readonly tripService: FourSquareDataService) {}

  @Query(() => String, { nullable: true })
  getFSNearPlace() {
    const result = this.tripService.getNearPlace();
    console.log(result);
    return result;
  }
}
