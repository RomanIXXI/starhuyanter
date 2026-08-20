// === 1 УРОВЕНЬ: Логика больших картинок и их персональных окон ===
const toggleImages = document.querySelectorAll('.toggle-img');
const allDropdowns = document.querySelectorAll('.row-dropdown');

toggleImages.forEach(img => {
  img.addEventListener('click', function() {
    const buttonId = this.id; 
    const targetDropdown = document.querySelector(`.row-dropdown[data-for="${buttonId}"]`);
    const isCurrentlyActive = this.classList.contains('active-border');

    // СБРОС: Закрываем все окна
    allDropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
      const subDropdown = dropdown.querySelector('.sub-dropdown');
      if (subDropdown) subDropdown.classList.remove('open');
    });
    toggleImages.forEach(image => image.classList.remove('active-border'));
    document.querySelectorAll('.sub-toggle-img').forEach(subImg => subImg.classList.remove('active-sub-border'));

    if (!isCurrentlyActive && targetDropdown) {
      targetDropdown.classList.add('open');
      this.classList.add('active-border');
    }
  });
});

// === 2 УРОВЕНЬ: Логика маленьких картинок (Подмена изображения) ===
const subToggleImages = document.querySelectorAll('.sub-toggle-img');

subToggleImages.forEach(subImg => {
  subImg.addEventListener('click', function() {
    const dropdownInner = this.closest('.dropdown-inner');
    const subDropdown = dropdownInner.querySelector('.sub-dropdown');
    // Находим тег img, куда нужно вставить большую картинку
    const finalImg = subDropdown.querySelector('.final-dropdown-img');
    
    const isSubActive = this.classList.contains('active-sub-border');

    // Сбрасываем выделение с маленьких картинок текущего окна
    dropdownInner.querySelectorAll('.sub-toggle-img').forEach(img => img.classList.remove('active-sub-border'));
    subDropdown.classList.remove('open');

    if (!isSubActive) {
      // 1. Берем путь к картинке из атрибута data-subimg (например: "img/big_result_1.png")
      const imgPath = this.getAttribute('data-subimg');
      
      // 2. Меняем источник src у финальной картинки на этот путь
      finalImg.src = imgPath;

      // 3. Плавно открываем нижнее окно и подсвечиваем маленькую иконку
      subDropdown.classList.add('open');
      this.classList.add('active-sub-border');
    }
  });
});
