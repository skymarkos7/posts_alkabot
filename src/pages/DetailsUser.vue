<template>
  <q-page>
    <h4>Página para detalhes de um usuário</h4>

    <a href="#/users" style="text-decoration: none;"><q-btn style="margin-left: 20px; background: #FF0080; color: white" icon="arrow_back" label="Voltar" /></a>

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
              <h5 class="post-title">{{ users.name }} -
                {{ users.username }}
                <q-icon name="person" color="teal" size="8em" />
              </h5>

              <p class="post-by">
                <q-icon name="tag" color="teal" size="2em" />
                usuário: {{ users.id }}
              </p>
              <p class="post-body">
                <q-icon name="mail" color="teal" size="2em" />
                {{ users.email }}
              </p>
              <p class="post-body">
                <q-icon name="phone" color="teal" size="2em" />
                {{ users.phone }}
              </p>
              <p class="post-body">
                <q-icon name="public" color="teal" size="2em" />
                {{ users.website }}
              </p>
              <p class="post-body">
                <q-icon name="location_on" color="teal" size="2em" />
                {{ address.city }}
              </p>
              <p class="post-body">
                <q-icon name="house" color="teal" size="2em" />
                {{ address.suite }}
              </p>
              <p class="post-body">
                <q-icon name="map" color="teal" size="2em" />
                {{ address.city }}
              </p>
              <p class="post-body">
                <q-icon name="apartment" color="teal" size="2em" />
                {{ company.name }}
              </p>
              <p class="post-body">
                <q-icon name="business_center" color="teal" size="2em" />
                {{ company.bs }}
              </p>
              <p class="post-body">
                <q-icon name="business_center" color="teal" size="2em" />
                {{ company.catchPhrase }}
              </p>
              <p class="post-body">
                <q-icon name="flag" color="teal" size="2em" />
                Código Postal: {{ address.zipcode }}
              </p>
              <p class="post-body">
                <q-icon name="location_searching" color="teal" size="2em" />
                {{ address.geo }}
              </p>



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






