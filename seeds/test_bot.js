exports.seed = function (knex, Promise) {
    return knex('bots').del().then(function () {
        return knex('bots').insert([
            {user_id: 1, bot_id: 670598478, token: '670598478:AAHynAoP9tILankqXVQO7RkZcY0tiRPbSOA'}
        ]);
    });
};