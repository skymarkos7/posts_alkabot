<template>
  <q-page>
    <h4>Página de posts</h4>

    <div>
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
        <div class="posts-container">
          <div v-for="(post, index) in posts" :key="index" class="post-card">
            <div class="post-details">
              <h5 class="post-title">{{ post.title }}</h5>
              <p class="post-by">{{ post.id }}</p>
              <p class="post-body">{{ post.body }}</p>
              <button href="/coments" class="read-more-link">Ver comentários</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { ref, onMounted, watch, toRefs, nextTick, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PostsPage",
  data() {
    return {
      posts: [],
      carregando: false,
    };
  },
  methods: {
    outra() {
      const url = `https://jsonplaceholder.typicode.com/posts`;
      this.carregando = true; // definir carregando como verdadeiro antes da chamada da API
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






