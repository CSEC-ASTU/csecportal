export default defineConfig({
  migrations: {
    seed: 'node ./seed.js',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});