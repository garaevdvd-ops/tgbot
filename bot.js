const TelegramBot = require('node-telegram-bot-api');

const token = '8490698914:AAG0ONWqEndsqOfKgVPqzHpCdg0a_3U9h8U'; 
const bot = new TelegramBot(token, { polling: true });
console.log("Бот запущен и готов к работе!");
let users = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  if(!users[chatId]) users[chatId] = { paid_spins:0, free_spins:0, invited:0 };

  bot.sendMessage(chatId, "Привет! Выбирай действие:", {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🎁 Испытать удачу", web_app: { url: "https://garaevdvd-ops.github.io/jjjjj/miniapp/index.html?demo=true" } }],
      [{ text: "🎮 Демо", web_app: { url: "https://garaevdvd-ops.github.io/jjjjj/miniapp/index.html?demo=true" } }],
      [{ text: "👥 Пригласить друга", callback_data: "referral" }]
    ]
  }
});
});

bot.on('callback_query', query => {
  const chatId = query.message.chat.id;

  if(query.data === "spin") {
    bot.sendMessage(chatId, "Платный прокрут: открывается Mini App!");
  }

  if(query.data === "demo") {
    bot.sendMessage(chatId, "Демо прокрут: открывается Mini App в демо-режиме!");
  }

  if(query.data === "referral") {
    const link = `https://t.me/black_roulettebot?start=${chatId}`;
    bot.sendMessage(chatId, `Пригласи друга по ссылке и получи 1 бесплатный прокрут:\n${link}`);
  }
});