import { Post } from 'src/posts/models/post.models';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    posts: Post[];
}
