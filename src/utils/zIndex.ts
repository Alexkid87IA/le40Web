export const Z_INDEX = {
  bottomBar: 40,
  headerNav: 100,
  mobileBurger: 150,
  modal: 200,
  toast: 300,
} as const;

export type ZIndexLayer = keyof typeof Z_INDEX;
