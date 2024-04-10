<script lang="ts">
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    HeaderNav,
    HeaderNavItem,
  } from "carbon-components-svelte";
  import Logout from "carbon-icons-svelte/lib/Logout.svelte";
  import Login from "carbon-icons-svelte/lib/Login.svelte";
  import ShoppingCart from "carbon-icons-svelte/lib/ShoppingCart.svelte";
  import { goto } from "$app/navigation";
  import { onDestroy } from "svelte";

  import auth from "../../store/auth-store";
  import type { User } from "../../types";

  let user: User | null;
  let unsubscribe = auth.subscribe((u) => (user = u));

  const logout = () => {
    auth.logOut();
    goto("/login");
  };

  onDestroy(unsubscribe);
</script>

<Header company="SVELTE" platformName="Pizzeria" href="/">
  {#if user?.isAdmin}
    <HeaderNav>
      <HeaderNavItem href="/" text="Пиццы" />
      <HeaderNavItem href="/orders" text="Заказы" />
      <HeaderNavItem href="/users" text="Пользователи" />
    </HeaderNav>
  {/if}
  <HeaderUtilities>
    {#if user}
      <HeaderGlobalAction
        iconDescription="Корзина"
        tooltipAlignment="end"
        icon={ShoppingCart}
      />
    {/if}
    {#if !user}
      <HeaderGlobalAction
        iconDescription="Войти"
        tooltipAlignment="end"
        icon={Login}
        href="/login"
      />
    {/if}
    {#if user}
      <HeaderGlobalAction
        iconDescription="Выйти"
        tooltipAlignment="end"
        icon={Logout}
        on:click={logout}
      />
    {/if}
  </HeaderUtilities>
</Header>

{#if user}
  <div class="welcome-text">Добро пожаловать, {user.firstName}!</div>
{/if}

<style>
  .welcome-text {
    color: #fff;
    position: absolute;
    top: 15px;
    right: 130px;
    z-index: 100000;
    font-size: 16px;
  }
</style>
