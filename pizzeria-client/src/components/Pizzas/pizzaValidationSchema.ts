import * as yup from "yup";

const pizzaValidationSchema = yup.object().shape({
  name: yup.string().required("Пожалуйста, зполните поле"),
  image: yup.string().required("Пожалуйста, зполните поле"),
  ingredients: yup.string().required("Пожалуйста, зполните поле"),
  proteins: yup.number().required("Пожалуйста, зполните поле"),
  fats: yup.number().required("Пожалуйста, зполните поле"),
  carbohydrates: yup.number().required("Пожалуйста, зполните поле"),
  energy_value: yup.number().required("Пожалуйста, зполните поле"),
  sizeSWieght: yup.number().required("Пожалуйста, зполните поле"),
  sizeSPrice: yup.number().required("Пожалуйста, зполните поле"),
  sizeMWieght: yup.number().required("Пожалуйста, зполните поле"),
  sizeMPrice: yup.number().required("Пожалуйста, зполните поле"),
  sizeLWieght: yup.number().required("Пожалуйста, зполните поле"),
  sizeLPrice: yup.number().required("Пожалуйста, зполните поле"),
});

export default pizzaValidationSchema;
