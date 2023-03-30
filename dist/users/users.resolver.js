"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../auth/auth.service");
const posts_service_1 = require("../posts/posts.service");
const new_user_input_1 = require("./dto/new-user.input");
const signin_input_1 = require("./dto/signin.input");
const user_models_1 = require("./models/user.models");
const users_service_1 = require("./users.service");
const bcrypt = require("bcrypt");
let UsersResolver = class UsersResolver {
    constructor(usersService, postsService, authService) {
        this.usersService = usersService;
        this.postsService = postsService;
        this.authService = authService;
    }
    sayHello() {
        return 'Hello World!';
    }
    async user(id) {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new common_1.NotFoundException(id);
        }
        return user;
    }
    async signIn(signInInput) {
        const validUser = await this.usersService.findByEmail(signInInput.email);
        if (validUser) {
            if (bcrypt.compareSync(signInInput.password, validUser.password)) {
                return this.authService.logIn(validUser);
            }
        }
        throw new common_1.NotFoundException(signInInput.email);
    }
    createUser(newUserInput) {
        return this.usersService.create(newUserInput);
    }
    async posts(user) {
        return this.postsService.allPostsByUserId({ userId: user.id });
    }
};
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UsersResolver.prototype, "sayHello", null);
__decorate([
    (0, graphql_1.Query)(() => user_models_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('signInInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_input_1.SignInInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_models_1.User),
    __param(0, (0, graphql_1.Args)('newUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_user_input_1.NewUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_models_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "posts", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_models_1.User),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        posts_service_1.PostsService,
        auth_service_1.AuthService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map