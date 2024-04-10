import * as yup from "yup";

const registrationValidationSchema = yup.object().shape({
  firstName: yup.string().required("Пожалуйста, зполните поле"),
  lastName: yup.string().required("Пожалуйста, зполните поле"),
  email: yup
    .string()
    .email("Неверный формат")
    .required("Пожалуйста, зполните поле"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пожалуйста, зполните поле"),
  passwordCheck: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пожалуйста, зполните поле")
    .oneOf([yup.ref("password"), ""], "Пароли не совпадают"),
});

export default registrationValidationSchema;
