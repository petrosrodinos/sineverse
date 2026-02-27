// src/modules/auth/dto/register-email.dto.ts

import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterEmailDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password (minimum 6 characters)',
        example: 'password123',
        minLength: 6
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe'
    })
    @IsString()
    full_name: string;

    @ApiProperty({
        description: 'User phone number',
        example: '+1234567890'
    })
    @IsString()
    @IsOptional()
    phone: string;

}
