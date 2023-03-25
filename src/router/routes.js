const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/posts", component: () => import("pages/PostsPage.vue") },
      { path: "/users", component: () => import("pages/UsersPage.vue") },
      {
        path: "/details/:id",
        component: () => import("pages/DetailsUser.vue"),
      },
      {
        path: "/coments/:id",
        component: () => import("pages/ComentsPost.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
