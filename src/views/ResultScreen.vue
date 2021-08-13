<template>
  <div>
     <Result :questionsAnswered="questionsData" :answersToQuestions="answersData" :userChoice="userChoiceData" /> <!--Binds the data from the params to the props inside the Result component-->
  </div>
</template>

<script>

import Result from '../components/Result.vue'

export default{
    name: 'ResultScreen',

    components:{
        Result    
    },

    data() {
      return {
        /**
         * Saves the data that were sent thorugh the params
         */
        questionsData: this.$route.params.answeredQuestions,
        answersData: this.$route.params.answers,
        userChoiceData: this.$route.params.userChoice
     
      }
    }
}


</script>

<style>

</style>
ResultScreen