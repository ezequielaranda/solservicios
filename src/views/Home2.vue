<template>
    <b-container class="home2 mt-5">
    <div v-if='isAuthenticated && !isAdminUser'>
       <homeUser />
    </div>
    <div v-if='isAdminUser'>
       <homeAdmin />
    </div>
    <div v-if='!isAuthenticated'>
       <auth />
    </div>
    </b-container>

</template>

<script>
import auth from '@/views/login/Auth.vue'
import homeAdmin from '@/views/HomeAdmin.vue'
import homeUser from '@/views/HomeUser.vue'

export default {
  name: 'home2',
  components: {
    auth,
    homeAdmin,
    homeUser
  },

  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated
    },
    isAdminUser: function () {
      return this.$store.getters.isAdminUser
    }
  },
  data () {
    return {

    }
  }
}
</script>
