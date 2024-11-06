export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),

  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  UserController: Symbol.for('UserController'),

  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  OfferController: Symbol.for('OfferController'),

  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  CommentController: Symbol.for('CommentController'),

  CategoryModel: Symbol.for('CategoryModel'),
  CategoryService: Symbol.for('CategoryService'),
  CategoryController: Symbol.for('CategoryController'),

  ExceptionFilter: Symbol.for('ExceptionFilter'),
} as const;
