import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../interfaces/request-with-user';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';
const SameUser = (): Type<CanActivate> => {
  class RoleGuardMixin extends JWTAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const req = context.switchToHttp().getRequest<Request>();
      const user = request.user;
      // console.log(user._id);
      // console.log(req.params.id);
      // console.log(user._id == req.params.id);
      if (user._id == req.params.id) return true;
      return false;
    }
  }

  return mixin(RoleGuardMixin);
};

export default SameUser;
