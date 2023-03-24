<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Posts alkabot
        </q-toolbar-title>

        <a target='_blank' style="text-decoration:none; color: aliceblue;" href="https://www.linkedin.com/in/skymarkos7/"><div>Marcos Lourenço</div></a>
      </q-toolbar>
    </q-header>
s
    <q-drawer
    style="background-color: #f5f5f5;"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list >
        <!-- <q-item-label
          header
        >
          Início
        </q-item-label> -->

        <EssentialLink

          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    icon: 'home',
    href: '/',
    target:"_self"
  },
  {
    title: 'Usuários',
    caption: 'Listagem de usuários',
    icon: 'group',
    href: '#/users',
    target:"_self"
  },
  {
    title: 'Posts',
    caption: 'Posts e comentários',
    icon: 'chat',
    href: '#/posts',
    target:"_self"
  },
  {
    title: 'Favoritos',
    caption: 'Posts favoritados',
    icon: 'star',
    link: '#/favorites',
    target:"_self"
  },
  {
    title: 'Buscar',
    caption: 'Busque por conteúdo específico',
    icon: 'search',
    link: '#/favorites',
    target:"_self"
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
body{
  background-color:#f1f4f6 ;
}
</style>
