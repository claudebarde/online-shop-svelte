<script>
  import cart from "./cart/cart-store.js";
  import Cart from "./cart/Cart.svelte";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import config from "../config.js";
  import { db } from "../firebaseConfig.js";

  let buttonHover = false;
  let isModalOpen = false;
  let sendOrderLoading = false;
  let sendOrderText = "Send Order";
  let customer_name = "";
  let customer_country = "";
  let customer_email = "";
  $: isSendOrderAvalaible =
    !!customer_name && !!customer_country && !!customer_email;

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

  const sendOrder = async () => {
    sendOrderLoading = true;
    const order = {
      customer_country,
      customer_name,
      email_address: customer_email,
      fulfilled: false,
      items: $cart.map(item => ({
        item_id: item.id,
        item_name: item.title,
        item_price: item.price,
        item_quantity: item.quantity
      })),
      timestamp: Date.now()
    };

    try {
      const orderRef = await db.collection(config.firestoreOrders).add(order);
      if (orderRef.id) {
        // displays success and empties form
        sendOrderLoading = false;
        sendOrderText = "Order Sent!";
        customer_name = "";
        customer_country = "";
        customer_email = "";
        setTimeout(() => {
          sendOrderText = "Send Order";
          cart.empty();
          isModalOpen = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      sendOrderLoading = false;
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

  .cart-label {
    min-width: 180px;
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
        <div>
          <h1 class="title is-5">
            Please fill up this form so I can contact you about your order:
          </h1>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label cart-label">Your Name:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Your name"
                    bind:value={customer_name} />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label cart-label">Your country:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Your country"
                    bind:value={customer_country} />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label cart-label">Your Email Address:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="Your email address"
                    bind:value={customer_email} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          class:is-loading={sendOrderLoading}
          disabled={!isSendOrderAvalaible}
          on:click={sendOrder}>
          {sendOrderText}
        </button>
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
