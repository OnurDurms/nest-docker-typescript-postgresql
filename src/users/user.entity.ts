import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name : string;

  @Column()
  @ApiProperty()
  email: string;
  
    password: any;
    username: any;
    userId: any;

}