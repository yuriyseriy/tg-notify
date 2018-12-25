exports.seed = (knex, Promise) => {
    return knex('users').del().then(() => {
        return knex('users').insert([
            {email: 'test@gmail.com', password: '123456'},
        ]);
    });
};
