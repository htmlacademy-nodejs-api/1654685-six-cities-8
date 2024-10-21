export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),

  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  DatabaseClient: Symbol.for('DatabaseClient'),
} as const;
