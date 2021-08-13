<template>
  <div class="hero-body" style="text-align: center">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css"
      integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM="
      crossorigin="anonymous"
    />
    <h1 class="title" style="margin-left: auto; margin-right: auto">
      Trivia Game
    </h1>

    <div class="choiceContainer" style="margin-top: 40px">
      <div class="label">Amount of questions</div>
      <select id="amount" @change="changingData($event)">
        <option v-for="amount in amountOfQuestions" :key="amount">
          {{ amount }}
        </option>
      </select>
    </div>

    <div class="choiceContainer">
      <div class="label">Difficulty</div>
      <select id="difficulty" @change="changingData($event)">
        <option value="0">Any Difficulty</option>
        <option v-for="difficulty in difficulties" :key="difficulty">
          {{ difficulty }}
        </option>
      </select>
    </div>

    <div class="choiceContainer">
      <div class="label">Category</div>
      <select id="category" @change="changingData($event)">
        <option value="0">Any Category</option>
        <option
          v-for="category in categories.trivia_categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <router-link
      class="button is-link is-rounded"
      style="width: 150px; font-size: 18px; margin-top: 35px"
      :to="{ name: 'QuestionScreen', params: { data: this.userChoiceData } }"
      >Start Game</router-link
    >
  </div>
</template>
<script>
export default {
  name: "Start",
  data() {
    return {
      amountOfQuestions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      difficulties: ["easy", "medium", "hard"],
      categories: [],
      userChoiceData: { amount: 5, difficulty: "", category: 0 },
    };
  },

  /**
   * When the page is created it fetches all categories from a web API which is later displayed to the user with a dropdown menu.
   */
  created() {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => (this.categories = data))
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    /**
     * Everytime a user changes a object in a dropdown menu it sets each attributes inside userChoiceData with the value of the new selected object.
     */
    changingData(e) {
      switch (e.target.id) {
        case "amount":
          this.userChoiceData.amount = e.target.value;
          break;
        case "difficulty":
          this.userChoiceData.difficulty = e.target.value;
          break;
        case "category":
          this.userChoiceData.category = e.target.value;
          break;
        default:
      }
    },
  },
};
</script>
<style scoped>
.hero-body {
  background-color: rgb(255, 255, 255);
}
.title {
  left: 0;
  width: 100%;
  margin: 0;
  font-family: verdana;
  font-size: 4em;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 2px 1px 1px;
}
select {
  left: 35%;
  width: 30%;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
}
.label {
  font-size: 20px;
}
.choiceContainer {
  margin-top: 20px;
}
</style>