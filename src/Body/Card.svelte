<script>
  import cart from "../cart/cart-store.js";
  import { fade, fly } from "svelte/transition";
  import config from "../../config.js";

  export let id, title, description, image, price;

  let isModalOpen = false;

  const toggleModal = () => {
    // opens modal
    isModalOpen = !isModalOpen;
    if (isModalOpen === true) {
      // clips html and body
      const html = document.getElementsByTagName("html")[0];
      html.classList.add("is-clipped");
    } else {
      const html = document.getElementsByTagName("html")[0];
      html.classList.remove("is-clipped");
    }
  };
</script>

<style>
  .custom-card {
    height: 100%;
  }

  .description {
    min-height: 100px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .card-button {
    color: #c386ff;
    border: solid 1px #c386ff;
  }

  .card-button img {
    margin-right: 10px;
    height: 15px;
    width: 15px;
  }

  .price {
    font-size: 0.8rem;
    position: absolute;
    top: 5px;
    right: 5px;
    color: #c386ff;
  }

  .card-content {
    position: relative;
  }
</style>

<div class="card custom-card">
  <div class="card-image">
    <figure class="image is-square">
      <img src={image} alt={title} />
    </figure>
  </div>
  <div class="card-content">
    <p class="price">{config.currency} {price}</p>
    <div class="media">
      <div class="media-content">
        <p class="title is-6">{title}</p>
      </div>
    </div>
    <div class="content">
      <div class="description">
        <p>{description}</p>
      </div>
      <div class="buttons">
        <button class="button is-small card-button" on:click={toggleModal}>
          <img src="images/eye.svg" alt="view" />
          View
        </button>
        {#if $cart.find(item => item.id === id) !== undefined}
          <button
            class="button is-small card-button"
            transition:fly={{ delay: 150, duration: 300, y: -50 }}>
            <img src="images/gift.svg" alt="add to cart" />
            Added to Cart
          </button>
        {:else}
          <button
            class="button is-small card-button"
            on:click={() => cart.addToCart({ id, title, description, price })}>
            <img src="images/upload.svg" alt="add to cart" />
            Add to Cart
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<div id="modal" class="modal" class:is-active={isModalOpen}>
  <div class="modal-background" />
  <div class="modal-content">
    <div class="box">
      <h4 class="title is-4">{title}</h4>
      <figure class="image is-4by5">
        <img src={image} alt={title} />
      </figure>
    </div>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={toggleModal} />
</div>
