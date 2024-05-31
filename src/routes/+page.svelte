<script>
</script>

<svelte:head>
  <title>Let's Worm</title>
  <meta name="description" content="Let's Worm" />
</svelte:head>
<div class="overlay"></div>
<section>
  <h1>Let's Worm</h1>

  <h2>Collaborative Stories</h2>

  <h3>We'll be worming again soon! Stay tuned!</h3>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
    color: azure;
    text-align: center;
    z-index: 1;
  }

  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(53, 40, 39, 0.4);
    left: 0;
    top: 0;
    content: "";
  }

  h1,
  h2 {
    text-transform: uppercase;
  }
  h1 {
    font-size: 8rem;
    margin: 0;
    width: 100%;
  }
  h2 {
    font-size: 4rem;
    margin: 1rem 0 0;
    font-weight: 400;
  }
  h3 {
    font-size: 2rem;
    font-weight: 400;
  }
  @media screen and (max-width: 470px) {
    h1 {
      font-size: 6rem;
    }
    h2 {
      font-size: 3rem;
    }
    h3 {
      font-size: 2rem;
    }
  }
</style>
