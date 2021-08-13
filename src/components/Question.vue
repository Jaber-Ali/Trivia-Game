<template>
  <div class="hero-body" style="text-align: center">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.css"
      integrity="sha256-8c3iUwMTRp4NGIoybGwbQUO27Luo4DwwC27e+2IXGzM="
      crossorigin="anonymous"
    />
    <div class="questionNumber">Question: {{ questionNumber }}</div>

    <div class="question" v-bind="index">
      {{ toText(allQuestions[index].question) }}
    </div>

    <div v-if="allQuestions[index].type === 'multiple'">
      <!--If the question is a multiple answers questions then four buttons are displayed-->
      <div class="answerBtn">
        <button
          class="button is-link is-rounded"
          style="width: 500px; font-size: 20px"
          @click="nextQuestion(toText(questionAnswers[0]))"
        >
          {{ toText(questionAnswers[0]) }}
        </button>
      </div>
      <div class="answerBtn">
        <button
          class="button is-link is-rounded"
          style="width: 500px; font-size: 20px"
          @click="nextQuestion(toText(questionAnswers[1]))"
        >
          {{ toText(questionAnswers[1]) }}
        </button>
      </div>
      <div class="answerBtn">
        <button
          class="button is-link is-rounded"
          style="width: 500px; font-size: 20px"
          @click="nextQuestion(toText(questionAnswers[2]))"
        >
          {{ toText(questionAnswers[2]) }}
        </button>
      </div>
      <div class="answerBtn">
        <button
          class="button is-link is-rounded"
          style="width: 500px; font-size: 20px"
          @click="nextQuestion(toText(questionAnswers[3]))"
        >
          {{ toText(questionAnswers[3]) }}
        </button>
      </div>
    </div>
    <div v-else>
      <!--If the question is a true or false question then two buttons are displayed-->
      <div class="answerBtn">
        <button
          class="button is-link is-rounded"
          style="width: 200px; font-size: 20px"
          @click="nextQuestion(true)"
        >
          True
        </button>
      </div>
      <div class="answerBtn">
        <button
          class="button is-link is-rounded"
          style="width: 200px; font-size: 20px"
          @click="nextQuestion(false)"
        >
          False
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",

  props: {
    userChoice: Object, //A prop that contain the information that the useer choosed in the StartScreen.
  },

  data() {
    return {
      index: 0,
      questionsLeft: 0,
      questionNumber: 1,
      allQuestions: [],
      allAnsweredQuestions: [],
      userAnswers: [],
      API_url: "https://opentdb.com/api.php", //Url to the Web API
      questionAnswers: [],
      userChoiceInfo: {},
    };
  },

  /**
   * When the page is created the value inside the userChoice prop is added to the userChoiceInfo object. Depending on what´s the values inside the
   * userChoiceInfo object are, it creates a url which is used to send a request to the API which then returns a number of questions.
   */
  created() {
    this.userChoiceInfo = this.userChoice;

    console.log(this.userChoiceInfo.amount);

    this.API_url += "?amount=" + this.userChoice.amount;

    if (this.userChoiceInfo.category !== 0) {
      this.API_url += "&category=" + this.userChoiceInfo.category;
    }

    if (this.userChoice.difficulty !== 0) {
      this.API_url += "&difficulty=" + this.userChoiceInfo.difficulty;
    }

    fetch(this.API_url)
      .then((response) => response.json())
      .then((data) => {
        this.allQuestions = data.results;
        if (data.response_code === 1) {
          alert(
            "There are not enough questions of this difficulty in this category!"
          );
          this.$router.push({ name: "StartScreen" });
        } else if (data.response_code != 0) {
          console.log("Error occured when fetching the data!");
        } else {
          this.getRandomQuestion();
          this.questionsLeft = this.allQuestions.length;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * This is used to continuously check the values of each data variable or object. Everytime a data variable or object changes it´s value it automatically update the values inside the localStorage.
   * The questionsLeft function checks if there are any questions left and if there isn´t then
   * it clear the localStorage and redirect the user to the ResultScreen.
   */

  watch: {
    questionsLeft: function () {
      localStorage.questionsLeft = JSON.stringify(this.questionsLeft);
      if (this.questionsLeft === 0) {
        alert("Well done! You have answered all questions!");
        this.$router.push({
          name: "ResultScreen",
          params: {
            answeredQuestions: this.allAnsweredQuestions,
            answers: this.userAnswers,
            userChoice: this.userChoiceInfo,
          },
        });
        localStorage.clear();
      }
    },
    index: function () {
      localStorage.index = JSON.stringify(this.index);
    },
    userChoiceInfo: function () {
      localStorage.userChoiceInfo = JSON.stringify(this.userChoiceInfo);
    },
    allQuestions: function () {
      localStorage.allQuestions = JSON.stringify(this.allQuestions);
    },
    userAnswers: function () {
      localStorage.userAnswers = JSON.stringify(this.userAnswers);
    },
    allAnsweredQuestions: function () {
      localStorage.allAnsweredQuestions = JSON.stringify(
        this.allAnsweredQuestions
      );
    },
    API_url: function () {
      localStorage.API_url = JSON.stringify(this.API_url);
    },
    questionNumber: function () {
      localStorage.questionNumber = JSON.stringify(this.questionNumber);
    },
    questionAnswers: function () {
      localStorage.questionAnswers = JSON.stringify(this.questionAnswers);
    },
  },

  /**
   * Everytime the page is reloaded the data inside the localStorage sets it´s values to the data variables and objects.
   * By doing this the data doesn´t disappear when reloading the page.
   */
  mounted() {
    if (localStorage.questionsLeft) {
      this.questionsLeft = parseInt(localStorage.questionsLeft);
    }
    if (localStorage.index) {
      this.index = parseInt(localStorage.index);
    }
    if (localStorage.userChoiceInfo) {
      this.userChoiceInfo = JSON.parse(localStorage.userChoiceInfo);
    }
    if (localStorage.allQuestions) {
      this.allQuestions = JSON.parse(localStorage.allQuestions);
    }
    if (localStorage.allAnsweredQuestions) {
      this.allAnsweredQuestions = JSON.parse(localStorage.allAnsweredQuestions);
    }
    if (localStorage.userAnswers) {
      this.userAnswers = JSON.parse(localStorage.userAnswers);
    }
    if (localStorage.API_url) {
      this.API_url = JSON.parse(localStorage.API_url);
    }
    if (localStorage.questionNumber) {
      this.questionNumber = parseInt(localStorage.questionNumber);
    }
    if (localStorage.questionAnswers) {
      this.questionAnswers = JSON.parse(localStorage.questionAnswers);
    }
  },

  methods: {
    /**
     * This method calls a method that resets the array which contains answers for the displayed question. It also calls a method that randomizes the index.
     * It also calls a method that sets the answers which belongs to the question with the actual index to the answer buttons.
     */
    getRandomQuestion() {
      this.resetAnswerArray();
      this.randomizeIndex();
      this.setAnswersToButtons();
    },

    randomizeIndex() {
      this.index = Math.floor(Math.random() * this.allQuestions.length);
    },

    setAnswersToButtons() {
      this.questionAnswers.push(
        this.allQuestions[this.index].incorrect_answers[0]
      );
      this.questionAnswers.push(
        this.allQuestions[this.index].incorrect_answers[1]
      );
      this.questionAnswers.push(
        this.allQuestions[this.index].incorrect_answers[2]
      );
      this.questionAnswers.push(this.allQuestions[this.index].correct_answer);

      this.shuffleAnswerArray(); //Calls a method to shuffle all answers.
    },

    /**
     * Method to shuffle the answers inside the questionAnswers array.
     */
    shuffleAnswerArray() {
      for (let i = this.questionAnswers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.questionAnswers[i];
        this.questionAnswers[i] = this.questionAnswers[j];
        this.questionAnswers[j] = temp;
      }
    },

    /**
     * Takes in a userAnswer and checks if the answer is from a multiple answers question or a true or false question. Everytime this method
     * is called the questionNumber increases and it prevents from making the same question appear again. It also sets a new value to questionsLeft
     * and it also calls the getRandomQuestion method to randomize a new question which is then displayed to the user to answer.
     */
    nextQuestion(userAnswer) {
      let str = "";

      if (this.allQuestions[this.index].type === "multiple") {
        this.allAnsweredQuestions.push(this.allQuestions[this.index]);
        this.userAnswers.push(userAnswer);
      } else if (this.allQuestions[this.index].type === "boolean") {
        if (userAnswer === true) {
          str = "True";
        } else {
          str = "False";
        }

        this.allAnsweredQuestions.push(this.allQuestions[this.index]);
        this.userAnswers.push(str);
      }

      this.questionNumber++;
      this.allQuestions = this.allQuestions.filter(
        (q) => q.question != this.allQuestions[this.index].question
      );
      this.questionsLeft = this.allQuestions.length;
      this.getRandomQuestion();
    },

    resetAnswerArray() {
      this.questionAnswers.splice(0, this.questionAnswers.length);
    },

    /**
     * If a text from a JSON object contains some characters (like ' &quot;') it converts this to normal text.
     */
    toText(objectAttribute) {
      let text = document.createElement("textarea");
      text.innerHTML = objectAttribute;
      return text.value;
    },
  },
};
</script>

<style scoped>
.answerBtn {
  margin-top: 20px;
}
.questionNumber {
  font-size: 35px;
  font-weight: bold;
}
.question {
  font-size: 23px;
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>