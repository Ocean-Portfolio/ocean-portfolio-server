import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { AppResolver } from './app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseService } from './database.service';
import { OriginTravelData } from './module/originTravelData/originTravelData.module';
import { TravelPlanModule } from './module/travelPlan/travelPlan.module';
import { EventsModule } from './gateway/events.module';
import { UserModule } from './module/user/user.module';
import { SectionModule } from './module/section/section.module';
import { SNSLinkModule } from './module/sns_link/sns_link.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve('./', 'apidocs'),
      serveRoot: '/apidocs',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    EventsModule,
    UserModule,
    SectionModule,
    SNSLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DatabaseService],
})
export class AppModule {}
