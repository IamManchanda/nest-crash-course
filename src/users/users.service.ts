import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1633198444273,
      name: "John",
      age: 25,
    },
    {
      id: 1633198444274,
      name: "Mike",
      age: 30,
    },
    {
      id: 1633198444275,
      name: "Julia",
      age: 35,
    },
    {
      id: 1633198444276,
      name: "Julia",
      age: 40,
    },
  ];

  findAllUsers(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return this.users;
  }

  findUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = {
      id: Date.now(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
}
