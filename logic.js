/**
 * Получение сообщений из Телеграм
 * 1. пользователь создает телеграм бот и получает API TOKEN
 * 2. пользователь вводит API TOKEN при добавлении bot
 * 3. генерация url: https://notify.com/webhook/1234567
 * 4. установка setWebhook с url
 * отдельная кнопка setWebhook
 * 5. когда пользователь отправляет сообщение, то оно приходит на /webhook/:id
 * 6. ищем в базе id, если находим то инициализируем new Telegram(bot.token)
 * 7. читаем text, если это /start, то заносим в БД нового подписчика
 * !8. в будующем сделать раздел Автоответы
 * 9. отправить webhook, если он установлен
 */

/**
 * Отправка сообщений в Телеграм
 * 1. с помощью Middleware определить пользователя по api_key
 * 2. найти bot с id
 * 3. получить список подписчиков(isBlocked = false) и по циклу отправить всем письмо
 */

/**
 *
 */