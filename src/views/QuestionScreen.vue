<template>
   <div>
     <Question :userChoice="paramData"></Question> <!--Binds the data from the params to the prop inside the Question component-->
   </div>
</template>

<script>

import Question from '../components/Question.vue'

export default{
    name: 'QuestionScreen',

    components:{
        Question    
    },

    data() {
      return {
         /**
         * Saves the data that were sent thorugh the params
         */
        paramData: this.$route.params.data
      }
    }
}

</script>

<style>

</style>