import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min, IsInt } from 'class-validator';

@ArgsType()
@InputType()
export class FindPostArgs {
  @Field(type => Int)
  @IsInt()
  @Min(0)
  skip? = 0;

  @Field(type => Int)
  @IsInt()
  @Min(1)
  @Max(50)
  take? = 25;

  @Field(type => Int, { nullable: true })
  @IsInt()
  userId?: number;
}