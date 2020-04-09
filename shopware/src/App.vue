<template>
  <div>
    <Navbar />
    
    <div class="container custom-margin-top">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navigation/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style scoped>
  .custom-margin-top{
    margin-top: 5.2rem;
  }
</style>