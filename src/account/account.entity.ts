import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  amount : number;

  @Column()
  @ApiProperty()
  code : string;

  @Column()
  @ApiProperty()
  price_total: number;

  @Column()
  @ApiProperty()
  userId: number;

  @Column()
  @ApiProperty()
  created_at: Date;

}