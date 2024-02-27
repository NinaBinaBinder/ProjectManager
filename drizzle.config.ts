import { Config, defineConfig } from 'drizzle-kit'

export default defineConfig({

 schema: "./src/db/schema.ts",
  driver: 'pg',
  out: "./src/db/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
}satisfies Config
)