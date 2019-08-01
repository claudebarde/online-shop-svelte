<script>
  let buttonHover = false;
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
          on:mouseleave={() => (buttonHover = false)}>
          <img
            src="images/{buttonHover ? 'shopping-cart-purple' : 'shopping-cart-white'}.svg"
            alt="cart"
            class="button-icon" />
          <span class:buttonHover>Cart</span>
        </button>
      </div>
    </div>
  </div>
</nav>
