import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { UsersModule } from 'src/users/users.module';
import { Post } from './models/post.models';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';


@Module({
	imports: [
		TypeOrmModule.forFeature([Post]), 
		forwardRef(() => UsersModule),
	],
	providers: [PostsResolver, PostsService, PubSub],
    exports: [PostsService]
})
export class PostsModule {}
