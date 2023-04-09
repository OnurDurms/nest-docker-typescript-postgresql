import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
    @ApiProperty({example: "Onur"})
    name: string

    @ApiProperty({example: "test@test.com"})
    email: string
}