<script lang="ts">
  import { urlFor } from "../../sanity";
  export let portableText: any;

  console.log(portableText.value);
  let imageUrl = "";

  if (
    portableText.value &&
    portableText.value.asset &&
    portableText.value.asset._ref
  ) {
    imageUrl = urlFor(portableText.value).url();
  }
</script>

{#if imageUrl}
  <img src={imageUrl} alt={portableText.value.alt || ""} />
{/if}

<style>
  img {
    max-width: 100%;
    display: inline;
  }
</style>
