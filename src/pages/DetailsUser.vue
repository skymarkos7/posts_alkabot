<template>
  <q-page>
    <h4>Página de detalhes de um usuário</h4>

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

      <div class="posts-container ">
          <div style="width: 100%; max-width: 700px" class="post-card">
            <div class="post-details">
              <h5 class="post-title">{{ users.name }}
                <q-icon name="person" color="teal" size="8em" />
              </h5>
              <p class="post-by">
                usuário: {{ users.id }}
              </p>
              <p class="post-body">{{ users.username }}</p>
              <p class="post-body">{{ users.email }}</p>
              <p class="post-body">{{ users.phone }}</p>
              <p class="post-body">{{ users.website }}</p>
              <p class="post-body">{{ address.city }}</p>
              <p class="post-body">{{ address.suite }}</p>
              <p class="post-body">{{ address.city }}</p>
              <p class="post-body">{{ address.zipcode }}</p>
              <p class="post-body">{{ address.geo }}</p>
              <p class="post-body">{{ company.name }}</p>
              <p class="post-body">{{ company.bs }}</p>
              <p class="post-body">{{ company.catchPhrase }}</p>


            </div>
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
      address: '',
      company: '',
      carregando: false,
    };
  },
  setup() {
    return {
      tab: ref("one"),
    };
  },
  methods: {
    loadData() {
      let id = this.$route.params.id;
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      this.carregando = true; // definir carregando como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          console.log(response.data);

          this.users   = response.data;
          this.address = response.data.address;
          this.company = response.data.company;
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

    this.loadData();
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






