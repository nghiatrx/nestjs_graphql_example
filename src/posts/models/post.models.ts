import { Field, Int, ObjectType, } from '@nestjs/graphql';
import { User } from 'src/users/models/user.models';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@ObjectType({ description: 'post' })
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
	@Column()
  userId: number;

  @Field()
	@Column({ type: 'text' })
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.posts)
  user: User;

}