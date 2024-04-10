<script lang="ts">
  import {
    ContentSwitcher,
    Switch,
    Button,
    Form,
    TextInput,
    PasswordInput,
  } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { createForm } from "svelte-forms-lib";

  import API from "../../services/api";
  import user from "../../store/auth-store";
  import { addToast } from "../../store/alerts-store";
  import loginValidationSchema from "./loginValidationSchema";
  import registrationValidationSchema from "./registrationValidationSchema";

  let selectedIndex = 0;

  const { form, errors, handleSubmit } = createForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    validationSchema:
      selectedIndex === 0
        ? loginValidationSchema
        : registrationValidationSchema,
    onSubmit: async (values) => {
      try {
        const res =
          selectedIndex === 0
            ? await API.post("/auth/login", {
                email: values.email,
                password: values.password,
              })
            : await API.post("/auth/signup", values);
        user.signIn(res);
        if (selectedIndex === 1) {
          addToast({
            type: "success",
            title: "Регистрация завершена",
            message: "Новый пользователь был успешно зарегестрирован",
          });
        }
        goto("/");
      } catch (error: any) {
        addToast({
          type: "error",
          title: "Ошибка",
          message: error.message
            ? error.message
            : selectedIndex === 0
              ? "Не удалось выполнить вход в аккаунт"
              : "Не удалось Зарегестрироваться",
        });
      }
    },
  });
</script>

<svelte:head>
  <title>Svelte pizzeria - Sign in</title>
</svelte:head>

<div class="container">
  <div class="form-container sign-in-container">
    <div class="form-block">
      <ContentSwitcher bind:selectedIndex>
        <Switch text="Вход" />
        <Switch text="Регистрация" />
      </ContentSwitcher>
      <div class="form">
        <Form on:submit={handleSubmit}>
          {#if selectedIndex === 1}
            <div class="form-input">
              <TextInput
                name="firstName"
                placeholder="Имя"
                bind:value={$form.firstName}
              />
              {#if $errors.firstName}
                <small>{$errors.firstName}</small>
              {/if}
            </div>
            <div class="form-input">
              <TextInput
                name="lastName"
                placeholder="Фамилия"
                bind:value={$form.lastName}
              />
              {#if $errors.lastName}
                <small>{$errors.lastName}</small>
              {/if}
            </div>
          {/if}
          <div class="form-input">
            <TextInput
              name="email"
              placeholder="Адрес электронной почты"
              bind:value={$form.email}
            />
            {#if $errors.email}
              <small>{$errors.email}</small>
            {/if}
          </div>
          <div class="form-input">
            <PasswordInput
              name="password"
              type="password"
              placeholder="Пароль"
              bind:value={$form.password}
            />
            {#if $errors.password}
              <small>{$errors.password}</small>
            {/if}
          </div>
          {#if selectedIndex === 1}
            <div class="form-input">
              <PasswordInput
                name="passwordCheck"
                type="password"
                placeholder="Повторите пароль"
                bind:value={$form.passwordCheck}
              />
              {#if $errors.passwordCheck}
                <small>{$errors.passwordCheck}</small>
              {/if}
            </div>
          {/if}
          <div class="btn">
            <Button type="submit"
              >{selectedIndex === 0 ? "Войти" : "Зарегестрироваться"}</Button
            >
          </div>
        </Form>
      </div>
    </div>
  </div>
  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-right">
        <img
          src="https://images.unsplash.com/photo-1615719413546-198b25453f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBpenphfGVufDB8MXwwfHx8MA%3D%3D"
          alt="pizza"
        />
      </div>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .form-block {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    width: 860px;
    max-width: 100%;
    min-height: 580px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 40%;
    height: 100%;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .form {
    width: 100%;
    margin-top: 2rem;
  }

  .form-input {
    margin-bottom: 1rem;
  }

  .btn {
    margin-top: 2rem;
  }

  small {
    color: rgb(250, 51, 51);
    margin-top: 5px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
  }
</style>
