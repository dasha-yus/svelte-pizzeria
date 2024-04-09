<script lang="ts">
  import { ToastNotification } from "carbon-components-svelte";
  import { fade } from "svelte/transition";

  import { dismissToast, toasts } from "../../store/alerts-store";
</script>

{#if $toasts}
  <section>
    {#each $toasts as toast (toast.id)}
      <div transition:fade>
        <ToastNotification
          kind={toast.type}
          title={toast.title}
          subtitle={toast.message}
          caption={new Date().toLocaleString()}
          on:close={() => dismissToast(toast.id || "")}
        />
      </div>
    {/each}
  </section>
{/if}

<style>
  section {
    position: fixed;
    top: 24px;
    right: 0;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }
</style>
