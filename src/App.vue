<template>
    <v-app>
        <v-content>
            <kjeld></kjeld>
        </v-content>
    </v-app>
</template>
<style>
    html { overflow-y: auto!important; }
</style>
<script>
import kjeld from './components/kjeld';

export default {
  name: 'App',
  components: {
    kjeld,
  },
  data: () => ({
    //
  }),
};
</script>
