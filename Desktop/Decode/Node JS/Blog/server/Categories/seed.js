
// Импортируем модель жанров
const Categories = require('./Categories')

// data содержит список жанров, которые мы хотим добавить в базу данных
const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Фриланс',
    'Алгоритмы',
    'Тестирование IT систем',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интелект',
    'Машинное обучение'
]


// Функция для записи данных в базу
async function writeDataCategory() {
    const length = await Categories.find();  // Это запрос к базе данных, который возвращает все категорий, уже записанные в коллекции Categories.
    if (length.length === 0) {  // Проверяем, пуста ли коллекция
        // Мы используем Promise.all(), чтобы записать все категорий в базу данных одновременно.
        await Promise.all(data.map(async (item, index) => {
            const category = new Categories({ //Для каждой категорий создаем новый объект Category с названием и индексом.
                name: item,
                key: index
            });
            await category.save();  // Асинхронно сохраняем категорию
        }));
        console.log("Категорий добавлены в базу данных.");
    } else {
        console.log("Категорий уже существуют в базе данных.");
    }
}

// Экспортируем функцию, чтобы использовать её в других файлах
module.exports = writeDataCategory;
