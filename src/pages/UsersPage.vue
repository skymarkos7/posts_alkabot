<template>
  <q-page>
    <h4>Página de usuários</h4>

    <!-- <div>
      <i class="fa fa-spinner fa-spin flex flex-center" v-show="carregando">
        <q-circular-progress
          indeterminate
          size="45px"
          :thickness="1"
          color="grey-8"
          track-color="lime"
          class="q-ma-md"
        />
      </i>
      <ul v-if="!carregando">
        <div class="users-container">
          <div v-for="(user, index) in users" :key="index" class="user-card">
            <div class="user-details">
              <h5 class="user-title">{{ user.name }}</h5>
              <p class="user-by">{{ user.id }}</p>
              <p class="user-by">E-mail: {{ user.email }}</p>
              <p class="user-body">{{ user.body }}</p>
              <button href="/coments" class="read-more-link">
                Ver comentários
              </button>
            </div>
          </div>
        </div>
      </ul>
    </div> -->
    <div v-for="(user, index) in users" :key="index">
      <div class="q-pa-md">
        <q-card class="card-user">
          <q-card-section>
            <div class="text-h6">{{user.name}}</div>
            <div class="text-subtitle2">{{user.email}}</div>
          </q-card-section>

          <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Tab one" name="one" />
            <q-tab label="Tab two" name="two" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
              The QCard component is a great way to display important pieces of
              grouped content.
            </q-tab-panel>

            <q-tab-panel name="two">
              With so much content to display at once, and often so little
              screen real-estate, Cards have fast become the design pattern of
              choice for many companies, including the likes of Google and
              Twitter.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { ref, onMounted, watch, toRefs, nextTick, computed } from "vue"; // Usando apenas REF por enquanto
import { useStore } from "vuex";

export default defineComponent({
  name: "UsersPage",
  data() {
    return {
      users: [],
      carregando: false,
    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    outra() {
      const url = `https://jsonplaceholder.typicode.com/users`;
      this.carregando = true; // definir carregando como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          console.log(response.data);

          this.users = response.data;
        })
        .finally(() => {
          this.carregando = false; // definir carregando como falso após a chamada da API
        });
    },
  },
  mounted: function () {
    // if (this.$route.query.payment_id) {
    //   this.payment_id = this.$route.query.payment_id;
    //   // window.location();
    // } else {
    //   window.location.href = '/';
    // }

    this.outra();
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina

.card-user {
  width: 100%;
  max-width: 250px;
}
.users-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.user-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.user-details {
  padding: 20px;
}

.user-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.user-by {
  color: #666;
  margin-bottom: 10px;
}

.user-body {
  margin-bottom: 20px;
}

.read-more-link {
  display: inline-block;
  padding: 10px;
  background-color: #0084ff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
}
</style>






