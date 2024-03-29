import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { AppResolver } from './app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseService } from './database.service';
import { EventsModule } from './gateway/events.module';
import { UserModule } from './module/user/user.module';
import { SectionModule } from './module/section/section.module';
import { SNSLinkModule } from './module/sns_link/sns_link.module';
import { HistoryModule } from './module/history/history.module';
import { HistoryItemModule } from './module/history_item/history_item.module';
import { CategoryModule } from './module/category/category.module';
import { KeywordModule } from './module/keyword/keyword.module';
import { ContactModule } from './module/contact/contact.module';
import { CollabModule } from './module/collab/collab.module';
import { StorageModule } from './module/storage/storage.module';
import { ImageModule } from './module/image/image.module';
import { IntroduceModule } from './module/introduce/introduce.module';
import { SkillModule } from './module/skill/skill.module';
import { ProjectModule } from './module/project/project.module';
import { HistoryImpactModule } from './module/history_impact/history_impact.module';

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
    CategoryModule,
    SNSLinkModule,
    HistoryModule,
    HistoryItemModule,
    HistoryImpactModule,
    KeywordModule,
    ContactModule,
    CollabModule,
    StorageModule,
    ImageModule,
    IntroduceModule,
    SkillModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, DatabaseService],
})
export class AppModule {}
