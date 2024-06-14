<script lang="ts">
  import { blur, fly } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { navigationStore } from "$lib/store.js";

  export let inDelay = 200;
  export let inDuration = 200;
  export let outDuration = 200;

  export let pathname = "";

  let useFly = false;
  let flyDirection = "next"; // 'next' or 'prev'

  let unsubscribe: any;

  $: {
    unsubscribe && unsubscribe();
    unsubscribe = navigationStore.subscribe((value) => {
      useFly = value.useFly;
      flyDirection = value.flyDirection;
    });
  }

  onDestroy(() => unsubscribe && unsubscribe());
  let inFlyX: number;
  let outFlyX: number;

  $: if (useFly) {
    inFlyX = flyDirection === "next" ? -200 : 200;
    outFlyX = flyDirection === "next" ? 200 : -200;
  }

  // Add offset to avoid scroll to top before transition.
  function offsetFade(
    node: any,
    { delay = 0, duration = 400, offset = window.scrollY }
  ) {
    const o = +getComputedStyle(node).opacity;
    return {
      delay,
      duration,
      offset,
      css: (t: any) =>
        `opacity: ${t * o}; margin-top: -${offset}px; z-index: 0;`,
    };
  }
</script>

{#if useFly}
  {#key pathname}
    <div
      in:fly={{ x: inFlyX, duration: inDuration, delay: inDelay }}
      out:fly={{ x: outFlyX, duration: outDuration }}
    >
      <slot />
    </div>
  {/key}
{:else}
  {#key pathname}
    <div
      in:blur={{ duration: inDuration, delay: inDelay }}
      out:offsetFade={{ duration: outDuration }}
    >
      <slot />
    </div>
  {/key}
{/if}
