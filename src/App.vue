<template>
  <authenticator>
    <template v-slot="{ signOut }">
      <button @click="signOut">Sign out</button>
      <PubSubHome />
    </template>
  </authenticator>
</template>

<script>
import PubSubHome from '@/components/PubSubHome.vue';
export default {
  components: {
    PubSubHome,
  },
};
</script>
