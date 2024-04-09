<script lang="ts">
  import "carbon-components-svelte/css/white.css";
  import { Content } from "carbon-components-svelte";
  import Navbar from "../components/UI/Navbar.svelte";
  import Toasts from "../components/UI/Toasts.svelte";
</script>

<Navbar />
<Toasts />
<Content>
  <slot />
</Content>
