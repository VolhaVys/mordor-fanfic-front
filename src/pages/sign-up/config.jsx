import { EMAIL_PATTERN } from '../../constant/pattern';

export const inputConfig = [
  {
    autoComplete: 'fname',
    id: 'firstName',
    label: 'Имя',
    name: 'firstName',
    sm: 6,
    xs: 12,
  },
  {
    autoComplete: 'lname',
    id: 'lastName',
    label: 'Фамилия',
    name: 'lastName',
    sm: 6,
    xs: 12,
  },
  {
    autoComplete: 'email',
    id: 'email',
    label: 'Email',
    name: 'email',
    xs: 12,
    rules: {
      required: true,
      pattern: EMAIL_PATTERN,
    },
  },
  {
    autoComplete: 'current-password',
    id: 'password',
    label: 'Пароль',
    name: 'password',
    type: 'password',
    xs: 12,
  },
  {
    autoComplete: 'current-password',
    id: 'repeatPassword',
    label: 'Повторите пароль',
    name: 'repeatPassword',
    type: 'password',
    xs: 12,
  },
];
