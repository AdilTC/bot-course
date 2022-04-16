const TelegramApi = require('node-telegram-bot-api');


const {gameOptions,againOpyions} =require('./options.js')
// const command = require('nodemon/lib/config/command');


const token = '5193174336:AAF8jy8q3UKGHHBuRDt3EAeR_Kg9d0TLNvI'

const bot = new TelegramApi(token,  {polling: true})

const chats = {}


const startGame = async (chatid)=>{

    await bot.sendMessage(chatid, `Сейчас я загадаю цифру от 0 до 9  и ты должен ее угодать`) 
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatid] = randomNumber;
    return bot.sendMessage(chatid,'Отгадывай', gameOpyions)

}

const start = () =>{
    bot.setMyCommands([
        { command:'/start', description:'Начальное приветвие'},
        { command:'/info', description:'Получение информацию о ползователе'},
        { command:'/game', description:'отгодай цифру'},
    ])
    
    
    
    
    bot.on('message', async msg=>{
        const text = msg.text;
        const chatid = msg.chat.id;
    
        if( text === '/start'){
           await bot.sendSticker(chatid, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
           return bot.sendMessage(chatid,` Добро пожаловать, это бот Исмаилова Абду-Адиля `)
        }
        
        if (text === '/info'){
           return bot.sendMessage(chatid, ` Тебя зовут ${msg.from.first_name}  ${msg.from.last_name}`)
        }
        if(text === '/game'){
            return startGame(chatid);
           
        }
        return bot.sendMessage(chatid,`Простите  я не понял что вы имели ввиду говоря это  --${text}-- попробуте еще раз `)


    
     
    })
    
 bot.on('callback_query', msg =>{
     const data = msg.data;
     const chatid = msg.message.chat.id;
    if(data === '/again'){
        return startGame(chatid);
    }
     
     if(data === chats[chatid]){
         return  bot.sendMessage(chatid , `Поздравляю, ты одгодал ${chats[chatid]} `,againOpyions);

     }else {
        return bot.sendMessage(chatid , `К сожелению ты не угодал цифру , бот загадал цифру ${chats[chatid] } `,againOpyions);

     }

  
     
 })
}

start()