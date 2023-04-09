import { ApiProperty } from "@nestjs/swagger";

export class AccountResponse {
    @ApiProperty({example: 1})
    userId: number

    @ApiProperty({example: 1000})
    amount: number

    @ApiProperty({example: 1000})
    price_total: number
}