<script lang="ts">
  import { Modal } from "carbon-components-svelte";

  export let name: string;
  export let type: "order" | "pizza";

  let showDialog = false;
  let functionToCall = {
    func: null,
    args: null,
  };

  function callFunction() {
    showDialog = false;
    // @ts-ignore
    functionToCall["func"](...functionToCall["args"]);
  }

  function confirm(func: any, ...args: any) {
    functionToCall = { func, args };
    showDialog = true;
  }
</script>

<slot {confirm} />

<Modal
  size="sm"
  bind:open={showDialog}
  modalHeading={`Вы уверены, что хотите удалить ${
    type === "pizza" ? "пиццу" : "заказ"
  } '${name}'?`}
  primaryButtonText="Удалить"
  secondaryButtonText="Отмена"
  on:click:button--secondary={() => (showDialog = false)}
  on:open
  on:close
  on:submit={callFunction}
>
  <p>Это действие невозможно отменить!</p>
</Modal>
