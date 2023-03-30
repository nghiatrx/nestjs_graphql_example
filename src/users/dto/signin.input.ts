import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsEmail } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(30)
  @MinLength(8)
  password: string;
}