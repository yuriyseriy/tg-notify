exports.up = (knex, Promise) => {
    return knex.schema.table('users', (table) => {
        table.string('api_key').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.table('users', (table) => {
        table.dropColumn('api_key');
    });
};
