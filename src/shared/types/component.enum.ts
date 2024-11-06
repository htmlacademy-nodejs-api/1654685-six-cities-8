export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),

  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  CategoryModel: Symbol.for('CategoryModel'),
  CategoryService: Symbol.for('CategoryService'),

  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
} as const;
