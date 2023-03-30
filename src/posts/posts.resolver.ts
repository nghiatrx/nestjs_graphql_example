import { Args, Mutation, Resolver, Query, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { Post } from './models/post.models';
import { PostsService } from './posts.service';
import { UseGuards } from '@nestjs/common';
import { NewPostInput } from './dto/new-post.input';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/users/models/user.models';
import { UsersService } from 'src/users/users.service';
import { FindPostArgs } from './dto/find-post-args';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly pubSub: PubSub
  ) {}

  @Query(() => [Post])
  posts(@Args('findPostArgs') findPostArgs: FindPostArgs): Promise<Post[]> {
    return this.postsService.allPostsByUserId(findPostArgs)
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(@Args('newPostInput') newPostInput: NewPostInput, @CurrentUser() user: User): Promise<Post> {
    const newPost = new Post()
    newPost.userId = user.id;
    newPost.content = newPostInput.content;
    const result = await this.postsService.create(newPost);
    this.pubSub.publish('postAdded', result);
    return result;
  }

  @ResolveField()
  async user(@Parent() post: Post): Promise<User> {
    return this.usersService.findById(post.userId);
  }

 
  @Subscription((returns) => Post, {
    resolve: (payload) => payload,
  })
  postAdded() {
    return this.pubSub.asyncIterator('postAdded');
  }

}