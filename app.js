// === 1 УРОВЕНЬ: Логика больших картинок и их персональных окон ===
const toggleImages = document.querySelectorAll('.toggle-img');
const allDropdowns = document.querySelectorAll('.row-dropdown');

toggleImages.forEach(img => {
  img.addEventListener('click', function() {
    const buttonId = this.id; 
    const targetDropdown = document.querySelector(`.row-dropdown[data-for="${buttonId}"]`);
    const isCurrentlyActive = this.classList.contains('active-border');

    // СБРОС: Закрываем все окна на странице
    allDropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
      const subDropdown = dropdown.querySelector('.sub-dropdown');
      if (subDropdown) subDropdown.classList.remove('open');
    });
    toggleImages.forEach(image => image.classList.remove('active-border'));
    document.querySelectorAll('.sub-toggle-img').forEach(subImg => subImg.classList.remove('active-sub-border'));

    // Если картинка не была активной, открываем её окно
    if (!isCurrentlyActive && targetDropdown) {
      targetDropdown.classList.add('open');
      this.classList.add('active-border');
    }
  });
});

// === 2 УРОВЕНЬ: Логика маленьких картинок (Надежное переключение через CSS) ===
const subToggleImages = document.querySelectorAll('.sub-toggle-img');

subToggleImages.forEach(subImg => {
  subImg.addEventListener('click', function() {
    const dropdownInner = this.closest('.dropdown-inner');
    const subDropdown = dropdownInner.querySelector('.sub-dropdown');
    const finalImg = subDropdown.querySelector('.final-dropdown-img');
    
    const isSubActive = this.classList.contains('active-sub-border');

    // Если нажали на ту же самую маленькую иконку — закрываем её
    if (isSubActive) {
      this.classList.remove('active-sub-border');
      subDropdown.classList.remove('open');
      return;
    }

    // Сбрасываем выделение с других маленьких картинок текущего окна
    dropdownInner.querySelectorAll('.sub-toggle-img').forEach(img => img.classList.remove('active-sub-border'));
    subDropdown.classList.remove('open'); // На миг закрываем окно для мягкой смены картинки

    this.classList.add('active-sub-border');
    const imgPath = this.getAttribute('data-subimg');

    // Меняем путь к картинке без каких-либо условий и ожиданий
    finalImg.src = imgPath;
    
    // Сразу же открываем окно. CSS плавно развернет его ровно до размера картинки
    subDropdown.classList.add('open');
  });
});
