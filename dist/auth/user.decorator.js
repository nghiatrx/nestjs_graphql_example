"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((_, req) => {
    return req.args[2].req.user;
});
//# sourceMappingURL=user.decorator.js.map