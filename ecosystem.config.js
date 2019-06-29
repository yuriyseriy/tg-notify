module.exports = {
    apps: [{
        name: 'Notifier',
        script: 'app.js',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development',
            JWT_SECRET_PHRASE: 'secret',
            URL: 'https://tg-notify.herokuapp.com/',
            PORT: 1337
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};
