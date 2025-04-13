module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/logout',
      handler: 'auth.logout',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};