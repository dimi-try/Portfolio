import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async ({ includeImages = true, excludeProjects = false } = {}) => {
  const element = document.getElementById('resume-content');

  if (!element) {
    console.error("Element #resume-content not found");
    return;
  }

  // Сохраняем исходные стили и классы
  const originalStyle = element.getAttribute("style") || "";
  const originalClass = element.getAttribute("class") || "";
  const originalDisplayStyles = new Map(); // Для сохранения display стилей элементов

  // Сохраняем исходные display стили для элементов с классами no-print, print-only и portfolio-section
  document.querySelectorAll('.no-print, .print-only, #portfolio-section').forEach((el) => {
    originalDisplayStyles.set(el, el.style.display || '');
  });

  // Определяем текущую тему
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  console.log('Текущая тема:', currentTheme);

  // Получаем значение --background
  const rootStyles = getComputedStyle(document.documentElement);
  let backgroundColor = rootStyles.getPropertyValue('--background').trim();
  console.log('Извлечённый --background:', backgroundColor);

  // Применяем стили A4-страницы для захвата
  element.style.width = "794px"; // A4 при 96dpi
  element.style.minHeight = "1123px";
  element.style.padding = "40px";
  element.style.boxSizing = "border-box";
  element.style.zoom = "1";
  element.style.backgroundColor = backgroundColor; // Используем тему сайта
  element.style.overflow = "visible";

  // Временные стили для изображений и элементов
  const style = document.createElement('style');
  style.innerHTML = `
    #resume-content img {
      object-fit: contain !important;
      max-width: 100% !important;
      height: auto !important;
      display: ${includeImages ? 'block' : 'none'} !important;
      margin: 0 auto;
    }
    .no-print {
      display: none !important;
    }
    .print-only {
      display: block !important;
    }
    #portfolio-section {
      display: ${excludeProjects ? 'none' : 'block'} !important;
    }
  `;
  document.head.appendChild(style);

  // Скрываем no-print элементы, показываем print-only и управляем видимостью portfolio-section
  document.querySelectorAll('.no-print').forEach((el) => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.print-only').forEach((el) => {
    el.style.display = 'block';
  });
  if (excludeProjects) {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.style.display = 'none';
    }
  }

  // Захват DOM в canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    scrollY: -window.scrollY,
    useCORS: true,
    backgroundColor: backgroundColor, // Фон из --background
  });

  // Восстанавливаем исходные стили
  element.setAttribute("style", originalStyle);
  element.setAttribute("class", originalClass);
  document.head.removeChild(style);

  // Восстанавливаем display стили
  originalDisplayStyles.forEach((display, el) => {
    el.style.display = display;
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();   // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Соотношение сторон canvas
  const ratio = canvasWidth / canvasHeight;

  // Ширина и высота изображения в PDF
  let pdfImgWidth = pageWidth;
  let pdfImgHeight = pdfImgWidth / ratio;

  // Если слишком высоко — уменьшаем до высоты страницы
  if (pdfImgHeight > pageHeight) {
    pdfImgHeight = pageHeight;
    pdfImgWidth = pdfImgHeight * ratio;
  }

  // Центровка по вертикали и горизонтали
  const x = (pageWidth - pdfImgWidth) / 2;
  const y = (pageHeight - pdfImgHeight) / 2;

  // Устанавливаем фон страницы PDF
  pdf.setFillColor(backgroundColor);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Добавляем изображение с сжатием (JPEG, quality 0.7)
  const imgData = canvas.toDataURL('image/jpeg', 0.7);
  pdf.addImage(imgData, 'JPEG', x, y, pdfImgWidth, pdfImgHeight);

  // Извлекаем английское имя из localStorage
  let fullName = '';
  try {
    const englishFullName = localStorage.getItem('englishFullName');
    console.log('Извлечено englishFullName:', englishFullName);
    if (englishFullName) {
      fullName = englishFullName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      console.log('Форматированное имя для файла:', fullName);
    } else {
      fullName = "Resume";
      console.warn('englishFullName не найдено в localStorage');
    }
  } catch (error) {
    console.error('Ошибка при извлечении englishFullName:', error);
  }

  // Формируем имя файла
  const fileName = `${fullName}${includeImages ? '' : '_NoImages'}${excludeProjects ? '_CV' : ''}.pdf`;
  console.log('Сохраняем PDF как:', fileName);
  pdf.save(fileName);
};