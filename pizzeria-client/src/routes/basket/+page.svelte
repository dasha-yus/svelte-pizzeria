<script lang="ts">
  import {
    DataTable,
    Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    DataTableSkeleton,
  } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import { addToast } from "../../store/alerts-store";
  import API from "../../services/api";
  import type { Pizza } from "../../types";
  import { get } from "svelte/store";
  import pizzasStore from "../../store/pizzas-store";
  import { TrashCan } from "carbon-icons-svelte";
  import DeleteConfirmation from "../../components/UI/DeleteConfirmation.svelte";

  let isLoading: boolean = false;
  let orders: any = [];
  let pizzas: Pizza[] = get(pizzasStore);

  let pageSize = 10;
  let page = 1;
  let filteredRowIds: any = [];

  onMount(() => {
    getOrders();
  });

  const getOrders = async () => {
    try {
      isLoading = true;
      const response = await API.get("/orders/user");
      orders = response.map((o: any) => ({
        ...o,
        id: o._id,
        pizza: pizzas.find((p) => p._id === o.pizzaId),
      }));
      isLoading = false;
    } catch (error) {
      isLoading = false;
      addToast({
        type: "error",
        title: "Ошибка",
        message: "Не удалось загрузить корзину",
      });
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await API.delete(`/orders/${id}`);
      addToast({
        type: "success",
        title: "Удаление завершено",
        message: `Заказ успешно удален`,
      });
      getOrders();
    } catch (error) {
      addToast({
        type: "error",
        title: "Ошибка",
        message: `Не удалось удалить заказ`,
      });
    }
  };
</script>

{#if isLoading}
  <DataTableSkeleton />
{:else}
  <div class="pizza-row">
    <DataTable
      title="Корзина"
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
        {
          key: "actions",
          value: "actions",
          sort: false,
        },
      ]}
      rows={orders}
      {pageSize}
      {page}
    >
      <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === "actions"}
          <DeleteConfirmation
            name={row.pizza?.name}
            type="order"
            let:confirm={confirmThis}
          >
            <Button
              kind="danger-tertiary"
              iconDescription="Удалить"
              icon={TrashCan}
              size="small"
              on:click={() => confirmThis(deleteOrder(row._id))}
            />
          </DeleteConfirmation>
        {:else}
          {cell.display ? cell.display(cell.value, row) : cell.value}
        {/if}
      </svelte:fragment>
      <Toolbar>
        <ToolbarContent>
          <ToolbarSearch
            persistent
            shouldFilterRows={(row, value) => {
              return (
                // @ts-ignore
                row.pizza.name.toLowerCase().includes(value.toLowerCase())
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
