import { User } from 'src/users/models/user.models';
export declare class Post {
    id: number;
    userId: number;
    content: string;
    user: User;
}
