import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsEmail } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(30)
  @MinLength(8)
  password: string;
}