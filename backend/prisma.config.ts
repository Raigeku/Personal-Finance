import { config as loadEnv } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

// Load environment variables from backend/.env so Prisma's config helpers
// (env(...)) can find DATABASE_URL when the CLI imports this file.
loadEnv({ path: '.env' });

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	engine: 'classic',
	datasource: {
		url: env('DATABASE_URL'),
	},
});
