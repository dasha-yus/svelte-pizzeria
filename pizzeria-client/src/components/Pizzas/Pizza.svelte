<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { ContentSwitcher, Switch, Button } from "carbon-components-svelte";
  import ShoppingCart from "carbon-icons-svelte/lib/ShoppingCart.svelte";
  import { TrashCan, Edit } from "carbon-icons-svelte";

  import API from "../../services/api";
  import { addToast } from "../../store/alerts-store";
  import pizzas from "../../store/pizzas-store";
  import DeleteConfirmation from "../UI/DeleteConfirmation.svelte";
  import type { User } from "../../types";
  import auth from "../../store/auth-store";
  import PizzaEditorModal from "./PizzaEditorModal.svelte";

  export let id: string;
  export let name: string;
  export let image: string;
  export let ingredients: string[];
  export let sizes: any[];
  export let details: any;

  let isEditModalOpen = false;
  let selectedSize = 1;
  let user: User | null;
  let unsubscribe = auth.subscribe((u) => (user = u));

  onDestroy(unsubscribe);

  const dispatch = createEventDispatcher();

  const deletePizza = async () => {
    try {
      await API.delete(`/pizzas/${id}`);
      pizzas.removePizza(id);
      addToast({
        type: "success",
        title: "Удаление завершено",
        message: `Пицца '${name}' успешно удалена`,
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Ошибка",
        message: `Не удалось удалить пиццу '${name}'`,
      });
    }
  };

  const addToCart = async () => {
    try {
      await API.post(`/orders`, {
        pizzaId: id,
        userId: user?._id,
        quantity: 1,
        size: selectedSize === 0 ? "S" : selectedSize === 1 ? "M" : "L",
      });
      addToast({
        type: "success",
        title: "Корзина обновлена",
        message: `Пицца '${name}' успешно добавлена в корзину`,
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Ошибка",
        message: `Не удалось добавить пиццу '${name}' в корзину`,
      });
    }
    dispatch("closeModal");
  };
</script>

<div class="pizza">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <img
    src={image}
    alt={name}
    class="image"
    on:click={() => dispatch("details", id)}
  />
  <h2>{name}</h2>
  <p class="ingredients">Состав: {ingredients.join(", ")}</p>
  <ContentSwitcher
    selectedIndex={selectedSize}
    on:change={(e) => (selectedSize = e.detail)}
  >
    {#each sizes as size}
      <Switch text={size.size} />
    {/each}
  </ContentSwitcher>
  <div class="footer">
    <p class="price">{sizes[selectedSize].price} руб.</p>
    {#if user && user.isAdmin}
      <div>
        <Button
          kind="tertiary"
          iconDescription="Изменить"
          icon={Edit}
          on:click={() => (isEditModalOpen = true)}
        />
        <DeleteConfirmation {name} type="pizza" let:confirm={confirmThis}>
          <Button
            kind="danger-tertiary"
            iconDescription="Удалить"
            icon={TrashCan}
            on:click={() => confirmThis(deletePizza)}
          />
        </DeleteConfirmation>
      </div>
    {:else}
      <Button icon={ShoppingCart} on:click={addToCart}>В корзину</Button>
    {/if}
  </div>
</div>
<PizzaEditorModal
  isModalOpen={isEditModalOpen}
  mode="edit"
  pizza={{
    _id: id,
    name,
    image,
    ingredients,
    sizes,
    details,
  }}
  on:closeModal={() => (isEditModalOpen = false)}
/>

<style>
  .pizza {
    width: 23%;
    box-shadow: 0px 2px 8px 0px rgba(34, 60, 80, 0.34);
    margin-bottom: 3rem;
    border-radius: 20px;
    padding: 2rem;
    margin: calc(10% / 10);
  }
  .image {
    display: flex;
    justify-content: center;
    margin: auto;
    width: 90%;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  h2 {
    font-size: 24px;
    font-weight: 500;
  }
  .ingredients {
    margin: 0.2rem 0 1rem 0;
    min-height: 70px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }
  .price {
    font-size: 24px;
    font-weight: 600;
  }
</style>
