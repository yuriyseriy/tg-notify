exports.up = (knex, Promise) => {
    return knex.schema.createTable('subscribers', (table) => {
        table.increments('id').unsigned().primary();
        table.integer('bot_id').references('bots.id').notNullable();
        table.integer('chat_id').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('nickname').notNullable();
        table.boolean('is_active');
        table.timestamps(true, true)
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('subscribers')
};