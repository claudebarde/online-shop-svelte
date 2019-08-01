<script>
  import Card from "./Card.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  const cardGroups = [
    [
      {
        id: 0,
        title: "Baby Sock",
        description: "Cute baby sock",
        image: "images/craft/babysock.jpeg",
        price: "20"
      },
      {
        id: 1,
        title: "Grey Beanie",
        description: "Cute beanie for your Muslim fiancé",
        image: "images/craft/beanie.jpeg",
        price: "45"
      },
      {
        id: 2,
        title: "Colorful Beanie",
        description: "Colorful Beanie",
        image: "images/craft/beanie2.jpeg",
        price: "55"
      },
      {
        id: 3,
        title: "Pink Bikini",
        description: "Cute bikini for the beach",
        image: "images/craft/bikini.jpeg",
        price: "50"
      }
    ],
    [
      {
        id: 4,
        title: "Phone Sleeve",
        description: "Protective Phone Sleeve for iPhone",
        image: "images/craft/phonesleeve.jpeg",
        price: "70"
      },
      {
        id: 5,
        title: "Little Purse",
        description: "Little purse for your change",
        image: "images/craft/purse.jpeg",
        price: "30"
      },
      {
        id: 6,
        title: "Tiny T-shirt",
        description: "Tiny t-shirt for your stuff toys",
        image: "images/craft/tshirt.jpeg",
        price: "65"
      }
    ]
  ];
  let loading = true;

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 2000);
  });
</script>

<style>
  main {
    width: 100%;
    padding: 9rem 0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    text-align: center;
    font-family: "Lovers Quarrel", cursive;
    font-size: 4rem;
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
</style>

<main>
  <h1>Mia's Knitting and Crochet Creations</h1>
  <div class="knitting-balls">
    <img src="images/knitting-ball.png" alt="knitting-ball" />
    <img src="images/knitting-ball.png" alt="knitting-ball" />
    <img src="images/knitting-ball.png" alt="knitting-ball" />
    <img src="images/knitting-ball.png" alt="knitting-ball" />
  </div>
  {#if loading}
    <div class="loading">
      <h3 class="title is-6">Loading...</h3>
      <!--<img
        src="https://media.giphy.com/media/3oriO6qJiXajN0TyDu/giphy.gif"
        alt="loading knitting" />-->
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
</main>
