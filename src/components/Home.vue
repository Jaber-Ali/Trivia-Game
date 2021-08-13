<template>
  <section class="hero is-large is-info">
    <div class="hero-body">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css"
        integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM="
        crossorigin="anonymous"
      />
      <h2 class="welcome">Welcome To Trivia Game</h2>
      <router-link
        id="btn"
        class="button is-link is-outlined is-medium is-rounded"
        :to="{ name: 'StartScreen' }"
        >PLAY</router-link
      >
    </div>
  </section>
</template>
<script>
export default {
  name: "Home",
};
</script>
<style scoped>
.welcome {
  position: absolute;
  top: 20%;
  left: 20px;
  width: 100%;
  margin: 0;
  font-family: verdana;
  font-size: 3.5em;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  text-shadow: black 4px 5px 5px;
}
#btn {
  width: 30%;
  top: 55%;
  color: white;
  font-weight: bold;
  left: 35%;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.8);
}
</style>