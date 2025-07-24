import { IsEnum } from 'class-validator';
import { Role } from '../../auth/role/roles.enum';

export class UpdateRoleDto {
    @IsEnum(Role)
    role: Role;
}