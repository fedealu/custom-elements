export const slides = [
  {
    src: 'assets/imgs/cars/mondeo.png',
    title: 'Ford Mondeo',
    subtitle: '2.0 L4 motor en línea',
    details: {
      doors: 4,
      baul: 'Sí',
      seats: 5,
      transmission: 'auto',
      availableModels: ["'12", "'19"],
    },
  },
  {
    src: 'assets/imgs/cars/mondeo.png',
    title: 'Ford Mondeo',
    subtitle: '2.0 L4 motor en línea',
    details: {
      doors: 2,
      baul: 'Sí',
      seats: 8,
      transmission: 'auto',
      availableModels: ["'12", "'19"],
    },
  },
];

export const slideDetailsConfig = {
  length: 5,
  properties: [
    { label: 'Puertas', name: 'doors' },
    { label: 'Baúl', name: 'baul' },
    { label: 'Asientos', name: 'seats' },
    { label: 'Transmisión', name: 'transmission' },
    { label: 'Modelos disponibles', name: 'availableModels' },
  ],
};
