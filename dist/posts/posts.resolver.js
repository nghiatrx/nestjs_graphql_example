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
exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_models_1 = require("./models/post.models");
const posts_service_1 = require("./posts.service");
const common_1 = require("@nestjs/common");
const new_post_input_1 = require("./dto/new-post.input");
const jwt_guard_1 = require("../auth/jwt.guard");
const user_decorator_1 = require("../auth/user.decorator");
const user_models_1 = require("../users/models/user.models");
const users_service_1 = require("../users/users.service");
const find_post_args_1 = require("./dto/find-post-args");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let PostsResolver = class PostsResolver {
    constructor(postsService, usersService, pubSub) {
        this.postsService = postsService;
        this.usersService = usersService;
        this.pubSub = pubSub;
    }
    posts(findPostArgs) {
        return this.postsService.allPostsByUserId(findPostArgs);
    }
    async createPost(newPostInput, user) {
        const newPost = new post_models_1.Post();
        newPost.userId = user.id;
        newPost.content = newPostInput.content;
        const result = await this.postsService.create(newPost);
        this.pubSub.publish('postAdded', result);
        return result;
    }
    async user(post) {
        return this.usersService.findById(post.userId);
    }
    postAdded() {
        return this.pubSub.asyncIterator('postAdded');
    }
};
__decorate([
    (0, graphql_1.Query)(() => [post_models_1.Post]),
    __param(0, (0, graphql_1.Args)('findPostArgs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_post_args_1.FindPostArgs]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "posts", null);
__decorate([
    (0, graphql_1.Mutation)(() => post_models_1.Post),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('newPostInput')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_post_input_1.NewPostInput, user_models_1.User]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_models_1.Post]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Subscription)((returns) => post_models_1.Post, {
        resolve: (payload) => payload,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "postAdded", null);
PostsResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_models_1.Post),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        users_service_1.UsersService,
        graphql_subscriptions_1.PubSub])
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map