import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
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
  @Get(":id")
  findUserById(@Param("id") id: string): User {
    // TODO: auto parse ID
    return this.usersService.findUserById(Number(id));
  }

  @ApiCreatedResponse({
    type: User,
    description: "Returns created user",
  })
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
