// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: 'postgres://osmpdvvbaiqapw:679f853ba87c1bbd1a5e24269bd0698d68c92c9c7d75ede3539bc96e2611663f@ec2-54-247-125-116.eu-west-1.compute.amazonaws.com:5432/d60tv8bet0aooa?ssl=true',
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
