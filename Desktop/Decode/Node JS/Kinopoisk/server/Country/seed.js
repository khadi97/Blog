
// Импортируем модель жанров
const Country = require('./Country')

// data содержит список жанров, которые мы хотим добавить в базу данных
const data = [
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Южная Корея',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Норвегия',
    'Гонконг'
]

// async function writeDataCountry() {
//     const length = await Country.find();
//     if(length == 0) {
//         data.map((item, index) => {
//             new Country({
//                 name: item,
//                 key: index
//             }).save()
//         })
//     }
// }

// Функция для записи данных в базу
async function writeDataCountry() {
    const length = await Country.find();  // Это запрос к базе данных, который возвращает все жанры, уже записанные в коллекции Genres.
    if (length.length === 0) {  // Проверяем, пуста ли коллекция
        // Мы используем Promise.all(), чтобы записать все жанры в базу данных одновременно.
        await Promise.all(data.map(async (item, index) => {
            const country = new Country({ //Для каждого жанра создаем новый объект Genres с названием и индексом.
                name: item,
                key: index
            });
            await country.save();  // Асинхронно сохраняем жанр
        }));
        console.log("Страны добавлены в базу данных.");
    } else {
        console.log("Страны уже существуют в базе данных.");
    }
}

// Экспортируем функцию, чтобы использовать её в других файлах
module.exports = writeDataCountry
