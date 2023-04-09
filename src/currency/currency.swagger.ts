import { ApiProperty } from "@nestjs/swagger";

export class CurrencyResponse {
    @ApiProperty({example: "USD"})
    from: string

    @ApiProperty({example: "TRY"})
    to: string
}