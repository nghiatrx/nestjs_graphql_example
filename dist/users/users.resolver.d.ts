import { AuthService } from 'src/auth/auth.service';
import { Post } from 'src/posts/models/post.models';
import { PostsService } from 'src/posts/posts.service';
import { NewUserInput } from './dto/new-user.input';
import { SignInInput } from './dto/signin.input';
import { User } from './models/user.models';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    private readonly postsService;
    private readonly authService;
    constructor(usersService: UsersService, postsService: PostsService, authService: AuthService);
    sayHello(): string;
    user(id: number): Promise<User>;
    signIn(signInInput: SignInInput): Promise<String>;
    createUser(newUserInput: NewUserInput): Promise<User>;
    posts(user: User): Promise<Post[]>;
}
