<template>
  <q-page>
    <h4 style="margin:30px">
      <TitleComponent/>{{ title }}
    </h4>

    <a href="#/users" style="text-decoration: none"
      ><q-btn
        style="margin-left: 20px; background: #ff0080; color: white"
        icon="arrow_back"
        label="Voltar"
    /></a>

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
      <div class="posts-container userdetails">
        <div style="width: 100%; max-width: 800px" class="post-card">
          <div class="post-details">
            <h5 class="post-title">
              {{ users.name }} -
              {{ users.username }}
              <q-icon name="person" color="teal" size="8em" />
            </h5>

            <p class="post-by">
              <q-icon name="tag" color="teal" size="2em" />
              usuário: {{ users.id }}
            </p>
            <a
              style="text-decoration: none; color: black"
              :href="'mailto:' + users.email"
              >.<br />
              <p class="post-body">
                <q-icon name="mail" color="teal" size="2em" />
                {{ users.email }}
              </p>
            </a>
            <a
              style="text-decoration: none; color: black"
              :href="'tel:' + users.phone"
              ><p class="post-body">
                <q-icon name="phone" color="teal" size="2em" />
                {{ users.phone }}
              </p></a
            >
            <a
              style="text-decoration: none; color: black"
              target="_blank"
              :href="'https://www.' + users.website"
              ><p class="post-body">
                <q-icon name="public" color="teal" size="2em" />
                {{ users.website }}
              </p></a
            >
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
import { ref } from "vue";
import TitleComponent from "components/TitleComponent.vue";

export default defineComponent({
  name: "DetailsUser",
  components: {
    TitleComponent
  },
  data() {
    return {
      users: [],
      address: '',
      company: '',
      load: false,
      title: 'detalhes de um usuário'
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
      this.load = true; // define load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {

          this.users = response.data;
          this.address = response.data.address;
          this.company = response.data.company;
        })
        .finally(() => {
          this.load = false; // define load como falso após a chamada da API
        });
    },
  },
  mounted: function () {

    this.loadData();
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.userdetails {
  border-radius: 50px;
  background: #ededee;
  box-shadow: 20px 20px 60px #c9c9ca, -20px -20px 60px #ffffff;

  margin-bottom: 50px;
  padding: 10px;
}
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






