<template>
  <div v-html="data"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


  export default {
    name: 'Home',
    data(){
      return{
        data: '1'
      }
    },
    mounted(){
      this.start()
    },
    watch:{
      fundamentus(){
        this.data = this.fundamentus
      }
    },
    computed:{
      ...mapGetters('fundamentus', ['fundamentus'])
    },
    methods:{
      ...mapActions('fundamentus', ['start']),
    }
  }
</script>
