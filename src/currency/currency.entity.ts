import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  from : string;

  @Column()
  @ApiProperty()
  to : string;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  created_at: Date;

}