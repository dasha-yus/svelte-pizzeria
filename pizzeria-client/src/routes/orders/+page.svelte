<script lang="ts">
  import {
    DataTable,
    Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    DataTableSkeleton,
  } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import { addToast } from "../../store/alerts-store";
  import API from "../../services/api";
  import type { Pizza, User } from "../../types";
  import { get } from "svelte/store";
  import pizzasStore from "../../store/pizzas-store";

  let isLoading: boolean = false;
  let orders: any = [];
  let users: User[] = [];
  let pizzas: Pizza[] = get(pizzasStore);

  let pageSize = 10;
  let page = 1;
  let filteredRowIds: any = [];

  onMount(() => {
    getAllUsers();
    getAllOrders();
  });

  const getAllOrders = async () => {
    try {
      isLoading = true;
      const response = await API.get("/orders");
      orders = response.map((o: any) => ({
        ...o,
        id: o._id,
        pizza: pizzas.find((p) => p._id === o.pizzaId),
        user: users.find((u) => u._id === o.userId),
      }));
      isLoading = false;
    } catch (error) {
      isLoading = false;
      addToast({
        type: "error",
        title: "Ошибка",
        message: "Не удалось загрузить список заказов",
      });
    }
  };

  const getAllUsers = async () => {
    try {
      isLoading = true;
      const response = await API.get("/users");
      users = response.map((u: any) => ({ ...u, id: u._id }));
      isLoading = false;
    } catch (error) {
      isLoading = false;
      addToast({
        type: "error",
        title: "Ошибка",
        message: "Не удалось загрузить список пользователей",
      });
    }
  };
</script>

{#if isLoading}
  <DataTableSkeleton />
{:else}
  <div class="pizza-row">
    <DataTable
      title="Заказы"
      description="Список всех заказов, оформленных через приложение."
      sortable
      sortKey="updatedAt"
      sortDirection="descending"
      headers={[
        {
          key: "pizza",
          value: "Пицца",
          display: (pizza) => pizza?.name,
          sort: false,
        },
        {
          key: "size",
          value: "Размер",
          sort: false,
        },
        { key: "quantity", value: "Количество" },
        {
          key: "createdAt",
          value: "Создан",
          display: (date) => new Date(date).toLocaleString(),
        },
        {
          key: "updatedAt",
          value: "Обновлён",
          display: (date) => new Date(date).toLocaleString(),
        },
        {
          key: "user",
          value: "Пользователь",
          display: (user) => `${user.firstName} ${user.lastName}`,
        },
        {
          key: "_, order",
          value: "Стоимость",
          display: (_, order) => {
            return (
              // @ts-ignore
              order.pizza?.sizes.find((s) => s.size === order.size).price *
                order.quantity +
              " руб."
            );
          },
        },
      ]}
      rows={orders}
      {pageSize}
      {page}
    >
      <Toolbar>
        <ToolbarContent>
          <ToolbarSearch
            persistent
            shouldFilterRows={(row, value) => {
              return (
                // @ts-ignore
                row.pizza.name.toLowerCase().includes(value.toLowerCase()) ||
                // @ts-ignore
                row.user.lastName.toLowerCase().includes(value.toLowerCase())
              );
            }}
            bind:filteredRowIds
          />
        </ToolbarContent>
      </Toolbar>
    </DataTable>
    <Pagination
      bind:pageSize
      bind:page
      totalItems={filteredRowIds.length}
      pageSizeInputDisabled
    />
  </div>
{/if}
