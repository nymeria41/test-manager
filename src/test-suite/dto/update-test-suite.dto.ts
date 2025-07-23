import {IsOptional, IsString} from 'class-validator';

export class UpdateTestSuiteDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

}