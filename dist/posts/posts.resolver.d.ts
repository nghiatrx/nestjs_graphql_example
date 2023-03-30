import { Post } from './models/post.models';
import { PostsService } from './posts.service';
import { NewPostInput } from './dto/new-post.input';
import { User } from 'src/users/models/user.models';
import { UsersService } from 'src/users/users.service';
import { FindPostArgs } from './dto/find-post-args';
import { PubSub } from 'graphql-subscriptions';
export declare class PostsResolver {
    private readonly postsService;
    private readonly usersService;
    private readonly pubSub;
    constructor(postsService: PostsService, usersService: UsersService, pubSub: PubSub);
    posts(findPostArgs: FindPostArgs): Promise<Post[]>;
    createPost(newPostInput: NewPostInput, user: User): Promise<Post>;
    user(post: Post): Promise<User>;
    postAdded(): AsyncIterator<unknown, any, undefined>;
}
