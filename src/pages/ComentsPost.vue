<template>
  <q-page>
    <h4><TitleComponent />{{ title }}</h4>

    <a href="#/posts" style="text-decoration: none"
      ><q-btn
        style="margin-left: 20px; background: #ff0080; color: white"
        icon="arrow_back"
        label="Voltar"
    /></a>

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

      <div v-if="!load" class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 800px" class="post-card postp">
          <div class="post-details">
            <h5 class="post-title">{{ posts.title }}</h5>
            <p class="post-by">Post {{ posts.id }}</p>
            <p class="post-body">{{ posts.body }}</p>
          </div>
        </div>
        <div
          v-for="(comment, index) in comments"
          :key="index"
          style="width: 100%; max-width: 800px"
        >
          <q-chat-message
            :name="'Autor: ' + comment.name"
            :stamp="'E-mail: ' + comment.email"
            :text="[comment.body]"
          />
          <!-- <q-chat-message name="Jane" :text="['doing fine, how r you?']" /> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import TitleComponent from "components/TitleComponent.vue";

export default defineComponent({
  name: "PostsPage",
  components: {
    TitleComponent,
  },
  props: ["id"],
  data() {
    return {
      comments: [],
      posts: [],
      load: false,
      title: 'comentários',
    };
  },
  methods: {
    loadData() {
      let id = this.$route.params.id; // Pegando o id do post pela url

      const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
      this.load = true; // definir load como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {

          this.comments = response.data;
        });

      api
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {

          this.posts = response.data;
        })
        .finally(() => {
          this.load = false; // definir load como falso após a chamada da API
        });
    },
  },
  mounted: function () {
    // if (this.$route.query.payment_id) {
    // this.payment_id = this.$route.query.payment_id;    // capturar info do post
    // window.location();
    // } else {

    // window.location.href = '/';
    // this.$route.query.payment_id
    // }

    this.loadData();
  },
});
</script>




<style lang="scss" scoped>
// SCOPED permite aplicar estilisação nesta únicapágina
.postp {
  border-radius: 15px;
  background: #f5f5f5;
  box-shadow: 31px 31px 62px #d0d0d0, -31px -31px 62px #ffffff;
}
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






