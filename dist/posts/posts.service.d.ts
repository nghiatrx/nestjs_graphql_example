import { Repository } from 'typeorm';
import { NewPostInput } from './dto/new-post.input';
import { FindPostArgs } from './dto/find-post-args';
import { Post } from './models/post.models';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    allPostsByUserId(args: FindPostArgs): Promise<Post[]>;
    create(postInput: NewPostInput): Promise<Post>;
}
