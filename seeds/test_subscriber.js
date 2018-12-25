exports.seed = function (knex, Promise) {
    return knex('subscribers').del().then(function () {
        return knex('subscribers').insert([
            {
                bot_id: 3,
                chat_id: 673834051,
                first_name: 'Oliver',
                last_name: 'Xan',
                nickname: 'OliverXan',
                is_active: true
            },
        ]);
    });
};