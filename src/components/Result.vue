<template>
  <div style="text-align: center">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css"
      integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM="
      crossorigin="anonymous"
    />

    <div
      style="
        font-size: 35px;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 25px;
      "
    >
      Total score: {{ totalScore }} points
    </div>

    <div
      class="field is-grouped"
      style="margin-left: 462px; margin-bottom: 50px"
    >
      <p class="control" style="margin-right: 15px">
        <button
          class="button is-link is-rounded"
          style="width: 150px; font-size: 18px"
          @click="goToStart()"
        >
          Home
        </button>
      </p>
      <p class="control">
        <button
          class="button is-link is-rounded"
          style="width: 150px; font-size: 18px"
          @click="playAgain()"
        >
          Play Again
        </button>
      </p>
    </div>

    <table
      class="table is-bordered is-striped is-narrow is-hoverable"
      style="margin-left: 15%; margin-right: 15%; margin-bottom: 70px"
    >
      <thead>
        <th style="text-align: left">Questions</th>
        <th>Correct Answer</th>
        <th>Your Answer</th>
      </thead>
      <tr v-for="(item, index) in resultInfo.questions" :key="item">
        <td v-html="item.question" style="text-align: left"></td>
        <td v-html="item.correct_answer"></td>
        <td
          v-bind:style="[
            resultInfo.answers[index] === item.correct_answer
              ? { 'background-color': '#96d689' }
              : { 'background-color': '#eb7a7a' },
          ]"
        >
          {{ resultInfo.answers[index] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Result",

  /**
   * Props for data that gets send from the Question component
   */
  props: {
    questionsAnswered: [Object, Array],
    answersToQuestions: [Object, Array],
    userChoice: [Object],
  },

  data() {
    return {
      resultInfo: {
        answers: [],
        questions: [],
        userChoiceInfo: {},
      },
      totalScore: 0,
    };
  },

  /**
   * When the page is created it sets the values inside questionsAnswered, answersToQuestions and userChoice to the answer array, the questions array and the userChoiceInfo object inside
   * the resultInfo object. When the page is created the totalScore is also calculated depending on how many right answers the user got. The values inside
   * resultInfo and totalScore are also saved inside the localStorage.
   */
  created() {
    this.resultInfo.questions = this.questionsAnswered;
    this.resultInfo.answers = this.answersToQuestions;
    this.resultInfo.userChoiceInfo = this.userChoice;
    for (let i = 0; i < this.resultInfo.questions.length; i++) {
      if (
        this.resultInfo.answers[i] ===
        this.resultInfo.questions[i].correct_answer
      ) {
        this.totalScore += 10;
      }
      localStorage.resultInfo = JSON.stringify(this.resultInfo);
      localStorage.totalScore = String(this.totalScore);
    }
  },

  /**
   * Everytime the page is reloaded it sets the values from the localStorage to resultInfo and totalScore which prevetns the data from disappearing when
   * reloading the page.
   */
  mounted() {
    if (localStorage.resultInfo) {
      this.resultInfo = JSON.parse(localStorage.resultInfo);
    }
    if (localStorage.totalScore) {
      this.totalScore = parseInt(localStorage.totalScore);
    }
  },

  methods: {
    /**
     * Method that takes the user to the HomeScreen and then clear the localStorage.
     */
    goToStart: function () {
      this.$router.push({ name: "HomeScreen" });
      localStorage.clear();
    },

    /**
     * If the player wants to play again with the same category, difficulty and amount of questions the userChoices from the Start component is sent to
     * the QuestionScreen which makes it possible for the user to play again with the same choices but with new questions. It also clear the localStorage.
     */
    playAgain: function () {
      this.$router.push({
        name: "QuestionScreen",
        params: { data: this.userChoice },
      });
      localStorage.clear();
    },
  },
};
</script>


<style>
</style>