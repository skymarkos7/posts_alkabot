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

        <div>José freire</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
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
    title: 'Perfil',
    caption: 'Informações sobre seu perfil',
    icon: 'face',
    href: '#/perfil',
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
