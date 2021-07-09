export const tags = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];

export const fandoms = [
  {
    value: 'Гарри Поттер',
    label: 'Гарри Поттер',
  },
  {
    value: 'Ориджиналы',
    label: 'Ориджиналы',
  },
  {
    value: 'Вселенная Марвел',
    label: 'Вселенная Марвел',
  },
  {
    value: 'Сверхъестественное',
    label: 'Сверхъестественное',
  },
  {
    value: 'Изумрудный город',
    label: 'Изумрудный город',
  },
];

export const inputs = [
  {
    id: 'fanfic-title',
    label: 'Название',
    name: 'title',
  },
  {
    id: 'fanfic-description',
    label: 'Краткое описание',
    name: 'description',
    multiline: 'multiline',
  },
  {
    id: 'fanfic-fandom',
    label: 'Фэндом',
    name: 'fandom',
    SelectProps: {
      native: true,
    },
    select: true,
  },
];
