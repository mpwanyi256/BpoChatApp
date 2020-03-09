<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" md="6" offset-md="3">
          <v-card class="mx-auto mt-6">
            <v-card-text class="font-weight-light" elevation="5">
              <div>
                <v-row>
                  <v-col cols="12" xs="12">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <div class="center">
                          <v-img :src="ChatIcon" aspect-ratio="1.5" class="center homeImage"></v-img>
                          <h3 class="center mt-3 blue--text darken-2">Connect</h3>
                        </div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field label="Email Address" aria-autocomplete="off" outlined dense v-model="inputUserEmail"></v-text-field>
                          <v-text-field type="password" aria-autocomplete="off"  class="mt-2" label="Password" outlined dense v-model="inputPassword"></v-text-field>
                            <router-link to="/ResetPassword" tag="span" style="cursor: pointer" class="mr-3 blue--text">
                              Create Account
                            </router-link>
                          <small class="float-right">
                          <span class="green--text">
                            <router-link to="/ResetPassword" tag="span" style="cursor: pointer">
                            Forgot Password?
                            </router-link>
                          </span></small>
                      </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-btn block class="blue" @click="Login" dark>SIGN IN</v-btn>
                          <v-banner class="mt-1" v-if="getErrorStatus"
                            :sticky="sticky" :single-line="singleLine" :icon="icon"
                            :color="color" :icon-color="iconColor" :elevation="elevation">
                            {{getErrorMessgae}}
                            <template v-slot:actions>
                            <v-btn @click="ClearError" text color="blue accent-4">
                              Close
                            </v-btn>
                          </template>
                          </v-banner>
                          </v-col>
                      </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
              <v-progress-linear indeterminate color="blue darken-2"></v-progress-linear>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ChatIcon () {
      return this.$store.getters.ChatIcon
    }
  },
  methods: {
    Login () {
      var userDetails = { username: 'Samuel', password: '123' }
      this.$store.dispatch('loginUser', userDetails)
    }
  }
}
</script>
<style scoped>
  .center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.homeImage{
   height: "200";
   width: "200";
}
</style>
