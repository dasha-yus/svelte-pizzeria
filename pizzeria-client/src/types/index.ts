export type Pizza = {
  _id: string;
  name: string;
  image: string;
  ingredients: string[];
  sizes: [PizzaSize];
  size: number;
  details: {
    proteins: number;
    fats: number;
    carbohydrates: number;
    energy_value: number;
  };
};

export type PizzaSize = {
  size: "S" | "M" | "L";
  weight: number;
  price: number;
};

export type ToastAlert = {
  id?: string;
  type?:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title: string;
  message: string;
  timeout?: number;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  token: string;
};
