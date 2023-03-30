import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/models/user.models';
import { Post } from './posts/models/post.models';
import { PostsModule } from './posts/posts.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true
      },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'graph_demo',
      entities: [User, Post],
      synchronize: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
