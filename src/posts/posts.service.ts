import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewPostInput } from './dto/new-post.input';
import { FindPostArgs } from './dto/find-post-args';
import { Post } from './models/post.models';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async allPostsByUserId(args: FindPostArgs): Promise<Post[]> {
    return this.postsRepository.find({ 
      where: { userId: args.userId },
      skip: args.skip,
      take: args.take,
      order: {
        id: 'desc'
      }
    })
  }

  async create(postInput: NewPostInput): Promise<Post> {
    const post = new Post();
    post.content = postInput.content;
    post.userId = postInput.userId;

    return this.postsRepository.save(post);
  }

}