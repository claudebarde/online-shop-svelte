<script>
  import cart from "./cart/cart-store.js";
  import Cart from "./cart/Cart.svelte";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import config from "../config.js";

  let buttonHover = false;
  let isModalOpen = false;

  const toggleModal = () => {
    // opens modal
    isModalOpen = !isModalOpen;
    if (isModalOpen === true) {
      // clips html and body
      const html = document.getElementsByTagName("html")[0];
      html.setAttribute("class", "is-clipped");
    } else {
      const html = document.getElementsByTagName("html")[0];
      html.classList.remove("is-clipped");
    }
  };
</script>

<style>
  .button-icon {
    margin-right: 10px;
  }

  .buttonHover {
    color: #c386ff;
    font-weight: bold;
  }

  .logo {
    color: white;
    text-decoration: none;
    font-family: "Lovers Quarrel", cursive;
    font-size: 4rem;
  }

  .logo:hover {
    color: white;
  }

  .logoImg {
    max-height: 3rem;
  }

  @media only screen and (min-device-width: 300px) and (max-device-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
    .logo {
      font-size: 2.5rem;
    }
    .logoImg {
      max-height: 2rem;
    }
  }
</style>

<nav
  class="navbar navbar-custom is-fixed-top"
  role="navigation"
  aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item logo" href="amiras-crafts.web.app">
      <img
        src={config.logo}
        alt="logo"
        width="112"
        height="28"
        class="logoImg" />
      {config.headerTitle}
    </a>
  </div>

  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <button
          class="button is-link is-inverted is-outlined"
          on:mouseenter={() => (buttonHover = true)}
          on:mouseleave={() => (buttonHover = false)}
          on:click={toggleModal}>
          <img
            src="images/{buttonHover ? 'shopping-cart-purple' : 'shopping-cart-white'}.svg"
            alt="cart"
            class="button-icon" />
          <span class:buttonHover>
            {$cart.length === 0 ? 'Cart' : $cart.length}
          </span>
        </button>
      </div>
    </div>
  </div>
</nav>

{#if $cart.length > 0}
  <div class="modal" class:is-active={isModalOpen} transition:fade>
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Your Cart</p>
        <button class="delete" aria-label="close" on:click={toggleModal} />
      </header>
      <section class="modal-card-body">
        <Cart />
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Send Order</button>
        <button class="button is-danger" on:click={() => cart.empty()}>
          Empty Cart
        </button>
      </footer>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      on:click={toggleModal} />
  </div>
{:else}
  <div class="modal" class:is-active={isModalOpen}>
    <div class="modal-background" />
    <div class="modal-content">
      <div class="box">There are no items in your cart!</div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      on:click={toggleModal} />
  </div>
{/if}
