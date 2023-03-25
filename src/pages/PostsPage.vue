<template>
  <q-page>
    <h4>
    <TitleComponent/>{{ title }}
  </h4>
    <div>
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
      <div class="fa fa-spinner fa-spin flex flex-center" v-if="!load">

        <q-input
        style="max-width:600px; width: 50%; margin-bottom: 30px;"
        v-model="search"
        filled
        rounded
        placeholder="Buscar post por título"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

        <div class="posts-container">
          <div
            v-for="(post, index) in filteredPost"  :key="index"
            style="width: 100%; max-width: 700px"
            class="post-card"
          >
            <div class="post-details">
              <h5 class="post-title">{{ post.title }}</h5>
              <p class="post-by">Post {{ post.id }}</p>
              <p class="post-body">{{ post.body }}</p>
              <a :href="url"
                ><button @click="goComents(post.id)" class="read-more-link">
                  comentários
                  <!-- Passa para a função o id do post escolhido-->
                  <q-icon name="chat" color="white" size="1.5em" /></button
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useStore } from "vuex";
import TitleComponent from 'components/TitleComponent.vue'

export default defineComponent({
  name: "PostsPage",
  components: {
    TitleComponent
  },
  data() {
    return {
      posts: [],
      load: false,
      url: '',
      title: 'posts',
      search:''
    };
  },
  methods: {
    loadData() {
      const url = `https://jsonplaceholder.typicode.com/posts`;
      this.load = true; // definir load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          console.log(response.data);

          this.posts = response.data;
        })
        .finally(() => {
          this.load = false; // definir load como falso após a chamada da API
        });
    },

    goComents(id) {
      this.url = `#/coments/${id}`; // Recebe o id e o agrega na url que será chamada
    },
  },
  mounted: function () {

    this.loadData();
  },
  computed:{
    filteredPost() {
      return this.posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()))  // Filtrar posts pelo título
    }
  }
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.posts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.post-card {
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.post-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-details {
  padding: 20px;
}

.post-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.post-by {
  color: #666;
  margin-bottom: 10px;
}

.post-body {
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






