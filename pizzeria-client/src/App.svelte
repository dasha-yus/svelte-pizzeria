<script lang="ts">
  import { Content } from "carbon-components-svelte";
  import PizzasCard from "./components/Pizzas/PizzasCard.svelte";
  import Navbar from "./components/UI/Navbar.svelte";
  import Toasts from "./components/UI/Toasts.svelte";
</script>

<Navbar />
<Toasts />
<Content>
  <PizzasCard />
</Content>
