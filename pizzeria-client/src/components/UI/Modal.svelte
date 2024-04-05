<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Modal } from "carbon-components-svelte";

  export let isModalOpen: boolean;
  export let headerText: string;
  export let primaryButtonText: string;
  export let secondaryButtonText: string;

  const dispatch = createEventDispatcher();
</script>

<Modal
  bind:open={isModalOpen}
  modalHeading={headerText}
  {primaryButtonText}
  {secondaryButtonText}
  on:click:button--secondary={() => dispatch("closeModal")}
  on:open
  on:close={() => dispatch("closeModal")}
  on:submit
>
  <slot />
</Modal>
