<script>
  import cart from "./cart/cart-store.js";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";

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

  const updateQuantity = (value, id) => {
    if (value > 0 && value < 6) {
      cart.update(items =>
        items.map(item => {
          if (item.id === id) {
            return { ...item, quantity: value };
          } else {
            return item;
          }
        })
      );
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

  .total-column {
    text-align: right;
  }
</style>

<nav
  class="navbar navbar-custom"
  role="navigation"
  aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item logo" href="https://bulma.io">
      <img
        src="images/yarn.svg"
        alt="logo"
        width="112"
        height="28"
        class="logoImg" />
      Mia's Knitting
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
        {#each $cart as item, index (item.id)}
          <div class="columns">
            <div class="column is-1">{index + 1}</div>
            <div class="column is-3">{item.title}</div>
            <div class="column is-4">{item.description}</div>
            <div class="column is-2">
              <div class="field">
                <div class="control">
                  <div class="select is-small">
                    <select
                      on:change={event => updateQuantity(event.target.value, item.id)}>
                      <option value="1" selected={item.quantity === '1'}>
                        1
                      </option>
                      <option value="2" selected={item.quantity === '2'}>
                        2
                      </option>
                      <option value="3" selected={item.quantity === '3'}>
                        3
                      </option>
                      <option value="4" selected={item.quantity === '4'}>
                        4
                      </option>
                      <option value="5" selected={item.quantity === '5'}>
                        5
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-2">RM {item.price}</div>
          </div>
        {/each}
        <div class="columns">
          <div class="column is-10 total-column">Total:</div>
          <div class="column is-2">
            RM {$cart.map(item => parseFloat(item.price) * parseFloat(item.quantity)).reduce((a, b) => a + b)}
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Send Order</button>
        <button class="button is-danger" on:click={() => cart.set([])}>
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
