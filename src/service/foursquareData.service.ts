import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { RootObject } from 'src/types/fourSquareData';

@Injectable()
export class FourSquareDataService {
  constructor(private readonly httpService: HttpService) {}

  getNearPlace(): Observable<AxiosResponse<RootObject>> {
    try {
      // const searchParams = new URLSearchParams({
      //   query: 'coffee',
      //   near: 'Seattle, WA',
      //   open_now: 'true',
      //   sort: 'DISTANCE',
      // });

      const searchParams = new URLSearchParams({
        query: 'coffee',
        ll: '41.8781,-87.6298',
        open_now: 'true',
        sort: 'DISTANCE',
      });
      // const results = await fetch(
      //   `https://api.foursquare.com/v3/places/search?${searchParams}`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       Accept: 'application/json',
      //       Authorization: 'YOUR ACCESS TOKEN',
      //     }
      //   }
      // );

      return this.httpService
        .get(
          `https://api.foursquare.com/v3/places/search?${searchParams.toString()}`,
          {
            headers: {
              Accept: 'application/json',
              // Authorization: process.env.FOURSQUARE_TOKEN,
              Authorization: '',
            },
          },
        )
        .pipe(map((res) => res.data));
    } catch (err) {
      console.error(err);
    }
  }
}
