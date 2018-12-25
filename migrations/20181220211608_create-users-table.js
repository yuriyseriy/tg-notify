exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true)
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users')
};
