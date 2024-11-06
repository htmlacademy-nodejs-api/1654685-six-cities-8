export const CreateUserMessages = {
  email: { invalidFormat: 'Введите действительный email адрес' },

  name: {
    invalidFormat: 'Свойство name — обязательное',
    lengthField: 'Минимальная длина — 1, максимальная — 15',
  },

  avatarPath: { invalidFormat: 'avatarPath, если он присутствует, должен быть строкой' },

  type: { invalid: 'Свойство type должно иметь значения Regular или Pro' },

  password: {
    invalidFormat: 'Свойство password — обязательное',
    lengthField: 'Минимальная длина пароля — 6, максимальная — 12',
  },
} as const;
