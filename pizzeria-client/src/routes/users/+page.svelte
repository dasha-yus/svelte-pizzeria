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

  let isLoading: boolean = false;
  let users: any = [];

  let pageSize = 10;
  let page = 1;
  let filteredRowIds: any = [];

  onMount(() => {
    getAllUsers();
  });

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
      title="Пользователи"
      description="Список всех пользователей, зарегестрированных в приложении."
      sortable
      sortKey="createdAt"
      sortDirection="descending"
      headers={[
        { key: "firstName", value: "Имя", sort: false },
        { key: "lastName", value: "Фамилия" },
        { key: "email", value: "Адрес электронной почты", sort: false },
        {
          key: "isAdmin",
          value: "Роль",
          display: (isAdmin) => (isAdmin ? "Администратор" : "Пользователь"),
        },
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
      ]}
      rows={users}
      {pageSize}
      {page}
    >
      <Toolbar>
        <ToolbarContent>
          <ToolbarSearch
            persistent
            shouldFilterRows={(row, value) => {
              return (
                row.email.includes(value) ||
                // @ts-ignore
                row.lastName.toLowerCase().includes(value.toLowerCase())
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
