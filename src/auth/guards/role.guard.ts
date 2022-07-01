import { Role } from '../../user/entities/user.entity';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../interfaces/request-with-user';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';

const RoleGuard = (role: Role, roles: Role[] = null): Type<CanActivate> => {
  class RoleGuardMixin extends JWTAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      if (user) {
        return role
          ? user.role.includes(role)
          : roles.find((r) => r == user.role)
          ? true
          : false;
      } else return false;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
