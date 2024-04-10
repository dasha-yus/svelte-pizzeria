import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат")
    .required("Пожалуйста, зполните поле"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пожалуйста, зполните поле"),
});

export default loginValidationSchema;
