exports.up = (knex, Promise) => {
    return knex.schema.createTable('bots', (table) => {
        table.increments('id').unsigned().primary();
        table.integer('user_id').references('users.id').notNullable();
        table.integer('bot_id').notNullable();
        table.string('token').unique().notNullable();
        table.timestamps(true, true)
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('bots')
};
