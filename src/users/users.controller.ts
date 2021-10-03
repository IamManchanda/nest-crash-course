import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({
    type: User,
    isArray: true,
    description: "Returns all users",
  })
  @ApiQuery({
    name: "name",
    required: false,
  })
  @Get()
  findAllUsers(@Query("name") name?: string): User[] {
    return this.usersService.findAllUsers(name);
  }

  @ApiOkResponse({
    type: User,
    description: "Returns user by specified Id",
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get(":id")
  findUserById(@Param("id", ParseIntPipe) id: number): User {
    console.log({ id });
    const user = this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiCreatedResponse({
    type: User,
    description: "Returns created user",
  })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
