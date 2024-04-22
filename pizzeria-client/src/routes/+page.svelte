<script lang="ts">
  import { onMount } from "svelte";
  import { Loading } from "carbon-components-svelte";
  import { get } from "svelte/store";

  import Pizza from "../components/Pizzas/Pizza.svelte";
  import PizzaDetailsModal from "../components/Pizzas/PizzaDetailsModal.svelte";
  import pizzas from "../store/pizzas-store";
  import { addToast } from "../store/alerts-store";
  import API from "../services/api";

  let selectedPizza: any = null;
  let isModalOpen = false;
  let isLoading = false;

  onMount(() => {
    getAllPizzas();
  });

  const getAllPizzas = async () => {
    try {
      isLoading = true;
      const response = await API.get("/pizzas");
      const updatedPizzas = response.map((p: any) => ({ ...p, size: 1 }));
      pizzas.setPizzas(updatedPizzas);
      isLoading = false;
    } catch (error) {
      isLoading = false;
      addToast({
        type: "error",
        title: "Ошибка",
        message: "Не удалось загрузить пиццы",
      });
    }
  };

  const showDetailsModal = (e: any) => {
    const pizza = get(pizzas).find((item: any) => item._id === e.detail);
    selectedPizza = pizza;
    isModalOpen = true;
  };

  const selectSize = (e: any) => {
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
        details={pizza.details}
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
    justify-content: flex-start;
    padding: 2rem;
  }
</style>
