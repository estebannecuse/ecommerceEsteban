import { SetMetadata } from "@nestjs/common"
import { Role } from "src/roles.enum"

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);


//este decorador tiene que datos van a ser aceptados en la Req como rol 