<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ContentSwitcher, Switch, Button } from "carbon-components-svelte";
  import ShoppingCart from "carbon-icons-svelte/lib/ShoppingCart.svelte";

  export let id: string;
  export let name: string;
  export let image: string;
  export let ingredients: string[];
  export let sizes: any[];

  let selectedSize = 1;

  const dispatch = createEventDispatcher();
</script>

<div class="pizza">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
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
    <Button icon={ShoppingCart}>В корзину</Button>
  </div>
</div>

<style>
  .pizza {
    width: 23%;
    box-shadow: 0px 2px 8px 0px rgba(34, 60, 80, 0.34);
    margin-bottom: 3rem;
    border-radius: 20px;
    padding: 2rem;
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
