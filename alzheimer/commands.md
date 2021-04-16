##
psql -U leonardouemura -h localhost
root


npx knex migrate:latest --knexfile src/database/knexfile.js

npx knex migrate:rollback --migrations-directory src/database/migrations --knexfile src/database/knexfile.js