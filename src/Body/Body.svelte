<script>
  import Card from "./Card.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import config from "../../config.js";
  import { db } from "../../firebaseConfig.js";
  import cart from "../cart/cart-store.js";

  const chunk = (array, size) => {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  };

  let cardGroups = [];
  let loading = true;
  // this variable can only be set to true from button appearing on mobile
  let mobileOpenCart = false;

  onMount(async () => {
    try {
      // fetch images info
      const getPics = await db.collection("pictures").get();
      const pictures = [];
      // extracts info
      getPics.forEach(pic => {
        const data = pic.data();
        const newPic = {
          id: pic.id,
          title: data.title,
          description: data.description,
          image: data.image,
          price: data.price
        };
        // saves info in an array
        pictures.push(newPic);
        // slices array into 4-element subarrays
        cardGroups = [...chunk(pictures, 4)];
        loading = false;
      });
    } catch (err) {
      console.log(err);
    }
  });
</script>

<style>
  main {
    width: 100%;
    padding: 5rem 0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    text-align: center;
    font-family: "Lovers Quarrel", cursive;
  }

  .knitting-balls {
    width: 100%;
    text-align: center;
  }

  .knitting-balls img {
    height: 20px;
    width: 20px;
  }

  .loading {
    width: 30%;
    margin: 2rem auto;
    text-align: center;
  }

  .items {
    padding: 0px 40px;
    margin: 2rem 0;
  }

  .mobile-cart {
    display: none;
  }

  .loading-gif {
    width: 100%;
  }

  @media only screen and (min-device-width: 300px) and (max-device-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
    main {
      padding: 2rem 0rem;
    }

    h1 {
      width: 80%;
      margin: 0 auto;
    }

    .loading {
      width: 80%;
    }

    .items {
      padding: 0px 20px;
      margin: 2rem 0;
    }

    .mobile-cart {
      display: block;
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 100;
      background-color: #c386ff !important;
    }

    .button-icon {
      margin-right: 10px;
      height: 14px;
      vertical-align: middle;
    }
  }
</style>

<main>
  {#if mobileOpenCart}
    Cart
    <button
      class="button is-link is-inverted is-outlined is-small mobile-cart"
      on:click={() => (mobileOpenCart = false)}>
      <img src="images/x-circle-white.svg" alt="cart" class="button-icon" />
      <span>Close</span>
    </button>
  {:else}
    <h1 class="subtitle is-1">{config.mainTitle}</h1>
    <div class="knitting-balls">
      <img src="images/knitting-ball.png" alt="knitting-ball" />
      <img src="images/knitting-ball.png" alt="knitting-ball" />
      <img src="images/knitting-ball.png" alt="knitting-ball" />
      <img src="images/knitting-ball.png" alt="knitting-ball" />
    </div>
    {#if loading}
      <div class="loading">
        <h3 class="title is-6">Loading...</h3>
        <img
          src="https://media.giphy.com/media/7beSjLq7J6qfS/giphy.gif"
          alt="loading knitting"
          class="loading-gif" />
      </div>
    {:else}
      <div class="items" in:fly={{ y: 200, duration: 500 }}>
        {#each cardGroups as group}
          <div
            class="columns item is-variable is-2-mobile is-2-tablet is-8-desktop">
            {#each group as card}
              <div class="column is-one-quarter">
                <Card {...card} />
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
    {#if !loading}
      <button
        class="button is-link is-inverted is-outlined is-small mobile-cart"
        on:click={() => (mobileOpenCart = true)}>
        <img
          src="images/shopping-cart-white.svg"
          alt="cart"
          class="button-icon" />
        <span>{$cart.length === 0 ? 'Cart' : $cart.length}</span>
      </button>
    {/if}
  {/if}
</main>
