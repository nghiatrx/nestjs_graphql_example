import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Post } from 'src/posts/models/post.models';
import { PostsService } from 'src/posts/posts.service';
import { NewUserInput } from './dto/new-user.input';
import { SignInInput } from './dto/signin.input';
import { User } from './models/user.models';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

	@Query(() => User)
	async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => String)
  async signIn(@Args('signInInput') signInInput: SignInInput): Promise<String> {
    const validUser = await this.usersService.findByEmail(signInInput.email)
    if (validUser) {
      if (bcrypt.compareSync(signInInput.password, validUser.password)) {
        return this.authService.logIn(validUser);
      }
    }
    
    throw new NotFoundException(signInInput.email);
  }

	@Mutation(() => User)
	createUser(@Args('newUserInput') newUserInput: NewUserInput) : Promise<User> {
		return this.usersService.create(newUserInput);
	}  

  @ResolveField()
  async posts(@Parent() user: User): Promise<Post[]> {
    return this.postsService.allPostsByUserId({ userId: user.id })
  }

}