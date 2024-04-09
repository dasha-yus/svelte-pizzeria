<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ContentSwitcher, Switch } from "carbon-components-svelte";

  import Modal from "../UI/Modal.svelte";
  import type { Pizza } from "../../types";

  export let isModalOpen: boolean;
  export let pizza: Pizza;

  const dispatch = createEventDispatcher();
</script>

<Modal
  {isModalOpen}
  headerText={pizza.name}
  primaryButtonText="В корзину"
  secondaryButtonText="Закрыть"
  on:closeModal={() => dispatch("closeModal")}
  ><div class="details">
    <div class="image-container">
      <svg
        class="icons-template"
        width="360"
        height="360"
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><circle
          cx="180"
          cy="190"
          r="167"
          stroke="#7F8CA3"
          stroke-dasharray="1 3 1 3"
        ></circle><circle
          cx="180"
          cy="190"
          r="132"
          stroke="#7F8CA3"
          stroke-dasharray="3 6 3 6"
        ></circle></svg
      >
      <div class="child-image-container">
        <img
          loading="lazy"
          src={pizza.image}
          alt={pizza.name}
          class={pizza.size === 0
            ? "pizza-s"
            : pizza.size === 1
              ? "pizza-m"
              : "pizza-l"}
        />
      </div>
    </div>
    <div class="info">
      <p>Состав: {pizza.ingredients.join(", ")}</p>
      <div class="size">
        <p>Размер:</p>
        <p>{pizza.sizes[pizza.size].weight} г</p>
      </div>
      <ContentSwitcher
        selectedIndex={pizza.size}
        on:change={(e) => dispatch("selectSize", e.detail)}
      >
        {#each pizza.sizes as size}
          <Switch text={size.size} />
        {/each}
      </ContentSwitcher>
      <div class="details-card">
        <p>Питательная ценность на 100 гр. продукта</p>
        <div class="details-block">
          <div>
            <p>Белки</p>
            <p>Жиры</p>
            <p>Углеводы</p>
            <p>Энергетическая ценность</p>
          </div>
          <div>
            <p>{pizza.details.proteins} г</p>
            <p>{pizza.details.fats} г</p>
            <p>{pizza.details.carbohydrates} г</p>
            <p>{pizza.details.energy_value} ккал</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>
          {pizza.sizes[pizza.size].price} руб.
        </p>
      </div>
    </div>
  </div>
</Modal>

<style>
  .details {
    display: flex;
  }
  .image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 17px;
    position: relative;
    margin-right: 2rem;
  }
  .image-container .child-image-container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .pizza-s {
    width: 200px;
    height: 200px;
  }
  .pizza-m {
    width: 260px;
    height: 260px;
  }
  .pizza-l {
    width: 330px;
    height: 330px;
  }
  .info {
    margin-right: 2rem;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
  .size {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .details-card {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 1rem 2rem;
  }
  .details-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer p {
    font-size: 28px;
    font-weight: 600;
  }
</style>
