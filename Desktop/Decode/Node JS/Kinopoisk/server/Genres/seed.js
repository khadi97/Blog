
// Импортируем модель жанров
const Genres = require('./Genres')

// data содержит список жанров, которые мы хотим добавить в базу данных
const data = [
    'Комедии',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодрамы',
    'Детективы',
    'Приключения',
    'Фэнтези'
]

// async function writeDataGenre() {
//     const length = await Genres.find();
//     if(length == 0) {
//         data.map((item, index) => {
//             new Genres({
//                 name: item,
//                 key: index
//             }).save()
//         })
//     }
// }

// Функция для записи данных в базу
async function writeDataGenre() {
    const length = await Genres.find();  // Это запрос к базе данных, который возвращает все жанры, уже записанные в коллекции Genres.
    if (length.length === 0) {  // Проверяем, пуста ли коллекция
        // Мы используем Promise.all(), чтобы записать все жанры в базу данных одновременно.
        await Promise.all(data.map(async (item, index) => {
            const genre = new Genres({ //Для каждого жанра создаем новый объект Genres с названием и индексом.
                name: item,
                key: index
            });
            await genre.save();  // Асинхронно сохраняем жанр
        }));
        console.log("Жанры добавлены в базу данных.");
    } else {
        console.log("Жанры уже существуют в базе данных.");
    }
}

// Экспортируем функцию, чтобы использовать её в других файлах
module.exports = writeDataGenre
