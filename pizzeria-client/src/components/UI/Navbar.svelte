<script lang="ts">
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
  } from "carbon-components-svelte";
  import Logout from "carbon-icons-svelte/lib/Logout.svelte";
  import ShoppingCart from "carbon-icons-svelte/lib/ShoppingCart.svelte";
</script>

<Header company="SVELTE" platformName="Pizzeria">
  <HeaderUtilities>
    <HeaderGlobalAction
      iconDescription="Корзина"
      tooltipAlignment="end"
      icon={ShoppingCart}
    />
    <HeaderGlobalAction
      iconDescription="Выйти"
      tooltipAlignment="end"
      icon={Logout}
    />
  </HeaderUtilities>
</Header>
