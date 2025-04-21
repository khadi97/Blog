function moreFunctions(event) {
    // Предотвращаем всплытие
    event.stopPropagation();

   
    const moreButton = event.currentTarget;
    const editOrDelete = moreButton.querySelector('.editOrDelete');

    // Закрываем все остальные открытые меню
    document.querySelectorAll('.editOrDelete.active').forEach(el => {
        if (el !== editOrDelete) el.classList.remove('active');
    });

    // Переключаем активность только у нужного блока
    editOrDelete.classList.toggle('active');    
}


// Чтобы при клике вне меню окно закрывалось
document.addEventListener('click', function () {
    document.querySelectorAll('.editOrDelete.active').forEach(el => {
        el.classList.remove('active');
    });
});
