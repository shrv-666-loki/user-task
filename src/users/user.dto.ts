import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsString()
    userName:string

    @IsNotEmpty()
    @IsNumber()
    age:number

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true }) 
    hobbies: string[];
  }