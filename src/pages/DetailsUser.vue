<template>
  <q-page >
    <h4>Página de usuários</h4>

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

    <div class="row justify-around items-center" v-if="!carregando">
    <div v-for="(user, index) in users" :key="index">
      <div class="q-pa-md">
        <q-card class="card-user col-auto">
          <q-card-section>
            <q-btn to="#/perfil" class="float-right" >
              <q-icon name="open_in_full" color="teal" size="1em" />
            </q-btn>
            <div class="text-h6">{{user.name}}</div>
            <div class="text-subtitle2">Usuário {{user.id}}</div>
            <div class="text-subtitle2">username: {{user.username}}</div>
            <div class="text-subtitle2">E-mail: {{user.email}}</div>
            <div class="text-subtitle2">Telefone: {{user.phone}}</div>
            <div class="text-subtitle2">Website: {{user.website}}</div>

          </q-card-section>

          <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Endereço" :name="user.name" />
            <q-tab label="Empresa" :name="user.id" />

          </q-tabs>


          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel :name="user.name">
              <p>Cidade: {{user.address.city}}</p>
              <p>Rua: {{user.address.street}}</p>
              <p>Suíte: {{user.address.suite}}</p>
              <p>Código Postal: {{user.address.zipcode}}</p>
            </q-tab-panel>

            <q-tab-panel :name="user.id">
              <p class="text-subtitle2">{{user.company.name}}</p>
              <p>Bs: {{user.company.bs}}</p>
              <p>catchPhrase: {{user.company.catchPhrase}}</p>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
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
  name: "DetailsUser",
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






