import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(20)
  name: string;

  @ApiProperty({ required: false })
  age?: number;
}
