import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @Field()
  @IsString()
  @MinLength(1)
  content: string;

  @IsNumber()
  userId: number;
}