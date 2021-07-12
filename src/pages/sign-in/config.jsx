import { EMAIL_PATTERN } from '../../constant/pattern';

export const inputConfig = [
  {
    autoComplete: 'email',
    id: 'email',
    label: 'Email',
    margin: 'normal',
    name: 'email',
    rules: {
      required: true,
      pattern: EMAIL_PATTERN,
    },
  },
  {
    autoComplete: 'current-password',
    id: 'password',
    label: 'Пароль',
    margin: 'normal',
    name: 'password',
    type: 'password',
  },
];
