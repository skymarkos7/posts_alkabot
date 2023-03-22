<template>
  <q-page>
    <h4>Página de posts</h4>
    <button @click="apiCompleta">api completa</button>
    <button @click="apiPequena">api pequena</button>
    <button @click="outra">outra</button>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from '../boot/axios';
import { ref, onMounted, watch, toRefs, nextTick, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PostsPage',
  data () {
    return {

    }
  },
  methods: {
    apiCompleta() {

        get
          .get('https://jsonplaceholder.typicode.com/posts', {
            // headers: {
            //   jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkxMy5zbGljZS5nbG9iYWwiLCJpYXQiOjE2NzAwMDE3MjUsImV4cCI6MTY3MDAwODkyNSwiaWQxIjoiVVV0WSIsImlkMiI6Ik1qZE1UZz09In0.-Pj1PqMrA28rHVMKYVGG2ycMdnaSuknO-bESSU56JK4"
            // }
          })
          .then((response) => {
            // this.match = response.data.data.match;
            console.log(response);

          });
    },

    outra() {
      const url = `https://jsonplaceholder.typicode.com/posts`;
      api
        .get(url, {
          // headers: {
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          console.log(response);
          if (response.data.data.status_external) {
            this.check_identificar_recused = true;
            this.check_aprovar_recused = true;
            this.tab = 'Aprovar';
            this.btnReprobate = false;
            this.btnApprove = false;
            this.TabApproved = false;
            this.TxtApproved = false;
            this.TxtRefused = false;
            this.Refused = true;
            this.TitleApprove = false;
            // this.StatusPaymnt = 'aprovado';
          } else {
            this.tab = 'Aprovar';
            this.value = response.data.data.value;
            this.installments = response.data.data.installments;
            // this.StatusPayment = 'recusado';

            let string = response.data.data.value_code;
            let metade = Math.floor(string.length / 2);
            this.value_code_formatted =
              string.substr(0, metade) + ',' + string.substr(metade);

            this.market = response.data.data.market;
            this.check_identificar_approved = true;
            this.btnReprobate = true;
            this.btnApprove = true;
            this.TxtApproved = false;
            this.TxtARefused = false;
          }
          //console.log(response.data);
        });
    },



    async apiPequena () {
      $q.loading.show();

      try {
        const response = await api.get(`https://jsonplaceholder.typicode.com/posts`, {
          // headers: {
          //   jwt: jwt.value
          // }
        });

        console.log(response);
      } catch (e) {
        console.log('error', e);
      } finally {
        $q.loading.hide();
      }
    }



  }
})
</script>
