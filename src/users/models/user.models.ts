import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.models';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType({ description: 'user' })
@Entity()
export class User {
  @Field(() => Int)
	@PrimaryGeneratedColumn()
  id: number;

  @Field()
	@Column()
  name: string;

	@Field()
	@Column({ unique: true })
  email: string;

	@Column()
  password: string;

  @Field(() => [Post])
  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}