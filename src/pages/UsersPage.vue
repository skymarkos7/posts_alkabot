<template>
  <q-page>
    <h4 style="margin:30px">
      <TitleComponent/>{{ title }}
    </h4>

    <i class="fa fa-spinner fa-spin flex flex-center" v-show="load">
      <q-circular-progress
        indeterminate
        size="45px"
        :thickness="1"
        color="grey-8"
        track-color="lime"
        class="q-ma-md"
      />
    </i>

    <div class="row justify-around items-center" v-if="!load">
      <div class="fa fa-spinner fa-spin flex flex-center" style="width: 100%;">
      <q-input
        style="max-width:600px; width: 50%; margin-bottom: 30px;"
        v-model="search"
        filled
        rounded
        placeholder="Buscar usuário"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

      <div v-for="(user, index) in filteredUsers" :key="index">
        <div class="q-pa-md">
          <q-card

            class="card-user col-auto"
          >
            <q-card-section>
              <a :href="url"
                ><q-btn @click="goUser(user.id)" class="float-right">
                  <q-icon name="open_in_full" color="teal" size="1em" /> </q-btn
              ></a>

              <div class="text-h6">{{ user.name }}</div>
              <div class="text-subtitle3">Usuário {{ user.id }}</div>
              <div class="text-subtitle3">username: {{ user.username }}</div>
              <div class="text-subtitle3">E-mail: {{ user.email }}</div>
              <div class="text-subtitle3">Telefone: {{ user.phone }}</div>
              <div class="text-subtitle2">Website: {{ user.website }}</div>
            </q-card-section>

            <q-tabs v-model="tab" class="text-teal">
              <q-tab label="Endereço" :name="user.name" />
              <q-tab label="Empresa" :name="user.id" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel :name="user.name">
                <p>Cidade: {{ user.address.city }}</p>
                <p>Rua: {{ user.address.street }}</p>
                <p>Suíte: {{ user.address.suite }}</p>
                <p>Código Postal: {{ user.address.zipcode }}</p>
              </q-tab-panel>

              <q-tab-panel :name="user.id">
                <p class="text-subtitle2">{{ user.company.name }}</p>
                <p>Bs: {{ user.company.bs }}</p>
                <p>catchPhrase: {{ user.company.catchPhrase }}</p>
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
import { ref } from "vue";
import TitleComponent from "src/components/TitleComponent.vue";

export default defineComponent({
  name: "UsersPage",
  components:{
    TitleComponent
  },
  data() {
    return {
      users: [],
      load: false,
      url: '',
      search: '',
      title: 'usuários'
    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    loadData() {
      const url = `https://jsonplaceholder.typicode.com/users`;
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso houvesse autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {

          this.users = response.data;
        })
        .finally(() => {
          this.load = false; // define load como falso após a chamada da API
        });
    },

    goUser(id) {
      this.url = `#/details/${id}`; // Recebe o id e o agrega na url que será chamada
    },
  },
  mounted: function () {

    this.loadData();
  },
  computed:{
    filteredUsers() {
      return this.users.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()))  // Filtrar posts pelo título
    }
  }
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina

.card-user {
  width: 100%;
  max-width: 250px;
  background-color: #f4f8f9;
              min-width: 310px;
              min-height: 250px;
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






