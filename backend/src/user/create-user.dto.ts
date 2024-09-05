import { IsNotEmpty, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(18, { message: 'Age must be at least 18' })
  age: number;

  _id?:string; 
  
  @IsBoolean()
  active: boolean;
}
