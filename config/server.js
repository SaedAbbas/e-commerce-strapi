module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  cors: {
    origin: ['http://localhost:3000','https://e-commerce-nextjs-90p6e3ki9-saed-abbas-projects.vercel.app/'], // عنوان Next.js المحلي
    credentials: true, // تفعيل الكوكيز عبر CORS
  },
});
