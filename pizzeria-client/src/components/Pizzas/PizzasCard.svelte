<script lang="ts">
  import Pizza from "./Pizza.svelte";
  import { onMount } from "svelte";
  import { Loading } from "carbon-components-svelte";
  import { get } from "svelte/store";

  import PizzaDetailsModal from "./PizzaDetailsModal.svelte";
  import pizzas from "../../store/pizzas-store";
  import { addToast } from "../../store/alerts-store";
  import API from "../../services/api";

  let selectedPizza = null;
  let isModalOpen = false;
  let isLoading = false;

  onMount(() => {
    getAllPizzas();
  });

  const getAllPizzas = async () => {
    try {
      isLoading = true;
      const response = await API.get("/pizzas");
      const updatedPizzas = response.map((p) => ({ ...p, size: 1 }));
      pizzas.setPizzas(updatedPizzas);
      isLoading = false;
    } catch (error) {
      isLoading = false;
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to load pizzas",
      });
    }
  };

  const showDetailsModal = (e) => {
    const pizza = get(pizzas).find((item) => item._id === e.detail);
    selectedPizza = pizza;
    isModalOpen = true;
  };

  const selectSize = (e) => {
    const size = e.detail;
    selectedPizza = { ...selectedPizza, size: size };
  };
</script>

{#if isLoading}
  <Loading />
{:else}
  <div class="pizza-row">
    {#each $pizzas as pizza (pizza._id)}
      <Pizza
        id={pizza._id}
        name={pizza.name}
        image={pizza.image}
        ingredients={pizza.ingredients}
        sizes={pizza.sizes}
        on:details={showDetailsModal}
      />
    {/each}
  </div>
{/if}

{#if selectedPizza}
  <PizzaDetailsModal
    {isModalOpen}
    pizza={selectedPizza}
    on:closeModal={() => (isModalOpen = false)}
    on:selectSize={selectSize}
  />
{/if}

<style>
  .pizza-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2rem;
  }
</style>
