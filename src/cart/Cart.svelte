<script>
  import cart from "./cart-store.js";
  import config from "../../config.js";
</script>

<style>
  .total-column {
    text-align: right;
  }
</style>

{#if $cart.length > 0}
  {#each $cart as item, index (item.id)}
    <div class="columns is-mobile is-vcentered">
      <div class="column is-1">{index + 1}-</div>
      <div class="column is-4">{item.title}</div>
      <div class="column is-3">
        <div class="field">
          <div class="control">
            <div class="select is-small">
              <select
                on:change={event => cart.updateQuantity(event.target.value, item.id)}>
                <option value="1" selected={item.quantity.toString() === '1'}>
                  1
                </option>
                <option value="2" selected={item.quantity.toString() === '2'}>
                  2
                </option>
                <option value="3" selected={item.quantity.toString() === '3'}>
                  3
                </option>
                <option value="4" selected={item.quantity.toString() === '4'}>
                  4
                </option>
                <option value="5" selected={item.quantity.toString() === '5'}>
                  5
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">{config.currency} {item.price}</div>
    </div>
  {/each}
  <div class="columns is-mobile">
    <div class="column is-8 total-column">Total:</div>
    <div class="column is-4">
      {config.currency}
      {$cart
        .map(item => parseFloat(item.price) * parseFloat(item.quantity))
        .reduce((a, b) => a + b)}
    </div>
  </div>
{:else}There are no items in your cart!{/if}
