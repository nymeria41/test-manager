import {IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateTestSuiteDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;


}
