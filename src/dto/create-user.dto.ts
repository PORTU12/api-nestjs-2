import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto{

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

}
