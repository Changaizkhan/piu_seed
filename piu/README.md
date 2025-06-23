npm install
npm run build
npx ts-node --transpile-only ./node_modules/typeorm/cli.js migration:generate -d ormconfig.ts src/database/migrations/InitialMigration
npm run build
npx typeorm migration:run -d dist/ormconfig.js
npm start
