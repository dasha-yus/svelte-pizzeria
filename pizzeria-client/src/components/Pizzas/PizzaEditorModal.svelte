<script lang="ts">
  import { Form, createForm } from "svelte-forms-lib";
  import { createEventDispatcher } from "svelte";
  import { NumberInput, TextArea, TextInput } from "carbon-components-svelte";

  import Modal from "../UI/Modal.svelte";
  import pizzaValidationSchema from "./pizzaValidationSchema";
  import type { PizzaSize } from "../../types";
  import { addToast } from "../../store/alerts-store";
  import API from "../../services/api";
  import pizzas from "../../store/pizzas-store";

  export let isModalOpen: boolean;
  export let mode: "edit" | "create";
  export let pizza: any;

  const dispatch = createEventDispatcher();

  const { form, errors, handleSubmit } = createForm({
    initialValues: {
      name: pizza?.name || "",
      image: pizza?.image || "",
      ingredients: pizza?.ingredients.join(", ") || "",
      proteins: pizza?.details.proteins || 0,
      fats: pizza?.details.fats || 0,
      carbohydrates: pizza?.details.carbohydrates || 0,
      energy_value: pizza?.details.energy_value || 0,
      sizeSWieght:
        pizza?.sizes.find((s: PizzaSize) => s.size === "S")?.weight || 0,
      sizeSPrice:
        pizza?.sizes.find((s: PizzaSize) => s.size === "S")?.price || 0,
      sizeMWieght:
        pizza?.sizes.find((s: PizzaSize) => s.size === "M")?.weight || 0,
      sizeMPrice:
        pizza?.sizes.find((s: PizzaSize) => s.size === "M")?.price || 0,
      sizeLWieght:
        pizza?.sizes.find((s: PizzaSize) => s.size === "L")?.weight || 0,
      sizeLPrice:
        pizza?.sizes.find((s: PizzaSize) => s.size === "L")?.price || 0,
    },
    validationSchema: pizzaValidationSchema,
    onSubmit: async (values) => {
      const updatedPizza = {
        name: values.name,
        image: values.image,
        ingredients: values.ingredients.split(", "),
        details: {
          proteins: values.proteins,
          fats: values.fats,
          carbohydrates: values.carbohydrates,
          energy_value: values.energy_value,
        },
        sizes: [
          {
            size: "S",
            weight: values.sizeSWieght,
            price: values.sizeSPrice,
          },
          {
            size: "M",
            weight: values.sizeMWieght,
            price: values.sizeMPrice,
          },
          {
            size: "L",
            weight: values.sizeLWieght,
            price: values.sizeLPrice,
          },
        ],
      };
      try {
        const res =
          mode === "create"
            ? await API.post("/pizzas", updatedPizza)
            : await API.put(`/pizzas/${pizza._id}`, updatedPizza);
        mode === "create"
          ? pizzas.addPizza(res)
          : pizzas.updatePizza(pizza._id, res);
        dispatch("closeModal");
        addToast({
          type: "success",
          title: "Пицца сохранена",
          message:
            mode === "create"
              ? "Новая пицца была успешно добавлена"
              : `Пицца '${pizza.name}' была успешно обновлена`,
        });
      } catch (error: any) {
        dispatch("closeModal");
        addToast({
          type: "error",
          title: "Ошибка",
          message: error.message
            ? error.message
            : mode === "create"
              ? "Не удалось добавить пиццу"
              : "Не удалось обновить пиццу",
        });
      }
    },
  });
</script>

<Modal
  {isModalOpen}
  headerText={mode === "create"
    ? "Добавить пиццу"
    : `Редактировать пиццу '${pizza.name}'`}
  primaryButtonText="Сохранить"
  secondaryButtonText="Закрыть"
  on:closeModal={() => dispatch("closeModal")}
  on:submit={handleSubmit}
>
  <div class="form">
    <Form>
      <div class="form-input">
        <TextInput
          name="name"
          labelText="Название"
          placeholder="Укажите название"
          bind:value={$form.name}
        />
        {#if $errors.name}
          <small>{$errors.name}</small>
        {/if}
      </div>
      <div class="form-input">
        <TextInput
          name="image"
          labelText="Картинка"
          placeholder="Укажите ссылку на картинку"
          bind:value={$form.image}
        />
        {#if $errors.image}
          <small>{$errors.image}</small>
        {/if}
      </div>
      <div class="form-input">
        <TextArea
          name="ingredients"
          labelText="Ингредиенты"
          placeholder="Добавьте ингредиенты через ,"
          bind:value={$form.ingredients}
        />
        {#if $errors.ingredients}
          <small>{$errors.ingredients}</small>
        {/if}
      </div>
      <p>Питательная ценность на 100 гр. продукта</p>
      <div class="form-input d-flex">
        <div class="half-width">
          <NumberInput
            name="proteins"
            label="Белки"
            bind:value={$form.proteins}
          />
          {#if $errors.proteins}
            <small>{$errors.proteins}</small>
          {/if}
        </div>
        <div class="half-width">
          <NumberInput name="fats" label="Жиры" bind:value={$form.fats} />
          {#if $errors.fats}
            <small>{$errors.fats}</small>
          {/if}
        </div>
      </div>
      <div class="form-input d-flex">
        <div class="half-width">
          <NumberInput
            name="carbohydrates"
            label="Углеводы"
            bind:value={$form.carbohydrates}
          />
          {#if $errors.carbohydrates}
            <small>{$errors.carbohydrates}</small>
          {/if}
        </div>
        <div class="half-width">
          <NumberInput
            name="energy_value"
            label="Энергетическая ценность"
            bind:value={$form.energy_value}
          />
          {#if $errors.energy_value}
            <small>{$errors.energy_value}</small>
          {/if}
        </div>
      </div>
      <p>Размеры</p>
      <div class="form-input d-flex">
        <div class="half-width">
          <NumberInput
            name="sizeSWieght"
            label="Размер S: вес"
            bind:value={$form.sizeSWieght}
          />
          {#if $errors.sizeSWieght}
            <small>{$errors.sizeSWieght}</small>
          {/if}
        </div>
        <div class="half-width">
          <NumberInput
            name="sizeSPrice"
            label="Размер S: цена"
            bind:value={$form.sizeSPrice}
          />
          {#if $errors.sizeSPrice}
            <small>{$errors.sizeSPrice}</small>
          {/if}
        </div>
      </div>
      <div class="form-input d-flex">
        <div class="half-width">
          <NumberInput
            name="sizeMWieght"
            label="Размер M: вес"
            bind:value={$form.sizeMWieght}
          />
          {#if $errors.sizeMWieght}
            <small>{$errors.sizeMWieght}</small>
          {/if}
        </div>
        <div class="half-width">
          <NumberInput
            name="sizeMPrice"
            label="Размер M: цена"
            bind:value={$form.sizeMPrice}
          />
          {#if $errors.sizeMPrice}
            <small>{$errors.sizeMPrice}</small>
          {/if}
        </div>
      </div>
      <div class="form-input d-flex">
        <div class="half-width">
          <NumberInput
            name="sizeLWieght"
            label="Размер L: вес"
            bind:value={$form.sizeLWieght}
          />
          {#if $errors.sizeLWieght}
            <small>{$errors.sizeLWieght}</small>
          {/if}
        </div>
        <div class="half-width">
          <NumberInput
            name="sizeLPrice"
            label="Размер L: цена"
            bind:value={$form.sizeLPrice}
          />
          {#if $errors.sizeLPrice}
            <small>{$errors.sizeLPrice}</small>
          {/if}
        </div>
      </div>
    </Form>
  </div>
</Modal>

<style>
  .form {
    width: 100%;
    margin-top: 2rem;
  }

  .form-input {
    margin-bottom: 1rem;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .half-width {
    width: 48%;
  }

  small {
    color: rgb(250, 51, 51);
    margin-top: 5px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
  }

  p {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
</style>
