export const CreateOfferValidationMessage = {
  createdAt: { invalidFormat: 'Свойство createdAt должно быть в формате ISO' },
  title: {
    minLength: 'Минимальная длина заголовка должна быть 10',
    maxLength: 'Максимальная длина заголовка должна быть 100',
  },
  description: {
    minLength: 'Минимальная длина описания должна быть 20',
    maxLength: 'Максимальная длина описания должна быть 1024',
  },
  city: { invalid: 'Указанный город не поддерживается' },
  preview: { maxLength: 'Свойство preview не должно быть длиннее 256 символов.' },
  photos: {
    invalidFormat: 'Свойство photos должно быть массивом',
    maxLength: 'Свойство photos не должно иметь более 6 элементов.',
  },
  isPremium: { invalid: 'isPremium поле должно иметь булево значение' },
  type: { invalid: 'Указанный тип жилья не поддерживается.' },
  roomsCount: {
    invalidFormat: 'Номер комнаты должен быть целым числом.',
    minValue: 'Минимальное количество номеров: 1',
    maxValue: 'Максимальное количество номеров: 8',
  },
  guestsCount: {
    invalidFormat: 'Количество гостей должен быть целым числом.',
    minValue: 'Минимальное количество гостей: 1',
    maxValue: 'Максимальное количество гостей: 10',
  },
  price: {
    invalidFormat: 'Цена должна быть целым числом',
    minValue: 'Минимальная цена: 100',
    maxValue: 'Максимальная цена: 100000',
  },
  comforts: {
    invalidFormat: 'Поле comforts должно быть массивом',
    invalid: 'Одно или несколько указанных средств не поддерживаются.',
  },
  author: { invalidId: 'Поле author должно иметь действительный идентификатор' },
  coordinates: {
    invalidFormat: 'Свойство coordinates поле должно быть массивом',
    length: 'Свойство coordinates должно иметь 2-а элемента.',
  },
} as const;
