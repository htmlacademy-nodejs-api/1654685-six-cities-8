export const CreateLoginUserMessage = {
  email: { invalidFormat: 'Введите действительный e-mail адрес' },

  password: {
    invalidFormat: 'Свойство password — обязательное',
    lengthField: 'Длина пароля должна быть от 6 до 12 символов',
  },
} as const;
