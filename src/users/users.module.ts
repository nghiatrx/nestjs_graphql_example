import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from 'src/posts/posts.module';
import { User } from './models/user.models';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]), 
		forwardRef(() => PostsModule),
		forwardRef(() => AuthModule)
	],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
