<template>
  <q-page>
    <h4>Página de comentários</h4>


  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { ref, onMounted, watch, toRefs, nextTick, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PostsPage",
  props:['id'],
  data() {
    return {
      comments: [],
      carregando: false
    };
  },
  methods: {
    loadData() {

      console.log(this.$route.params.id);
      let id = this.$route.params.id;  // Pegando o id do post pela url

      const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
      this.carregando = true; // definir carregando como verdadeiro antes da chamada da API
      api
        .get(url, {
          // headers: {  // Caso haja autenticação na chamada
          //   jwt: this.$store.state.session.jwt
          // }
        })
        .then((response) => {
          console.log(response.data);

          this.comments = response.data;
        })
        .finally(() => {
          this.carregando = false; // definir carregando como falso após a chamada da API
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






