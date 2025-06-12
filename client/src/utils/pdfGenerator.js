import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async () => {
  const element = document.getElementById('resume-content');

  if (!element) {
    console.error("Element #resume-content not found");
    return;
  }

  // Сохраняем исходные стили и классы
  const originalStyle = element.getAttribute("style") || "";
  const originalClass = element.getAttribute("class") || "";
  const originalDisplayStyles = new Map(); // Для сохранения display стилей элементов

  // Сохраняем исходные display стили для элементов с классами no-print и print-only
  document.querySelectorAll('.no-print, .print-only').forEach((el) => {
    originalDisplayStyles.set(el, el.style.display || '');
  });

  // Применяем стили A4-страницы для захвата
  element.style.width = "794px"; // A4 при 96dpi
  element.style.minHeight = "1123px";
  element.style.padding = "40px";
  element.style.boxSizing = "border-box";
  element.style.zoom = "1";
  element.style.backgroundColor = "#fff";
  element.style.overflow = "visible";

  // Временные стили для изображений
  const style = document.createElement('style');
  style.innerHTML = `
    #resume-content img {
      object-fit: contain !important;
      max-width: 100% !important;
      height: auto !important;
      display: block;
      margin: 0 auto;
    }
    .no-print {
      display: none !important;
    }
    .print-only {
      display: block !important;
    }
  `;
  document.head.appendChild(style);

  // Скрываем no-print элементы и показываем print-only
  document.querySelectorAll('.no-print').forEach((el) => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.print-only').forEach((el) => {
    el.style.display = 'block';
  });

  // Захват DOM в canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    scrollY: -window.scrollY,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  // Восстанавливаем исходные стили
  element.setAttribute("style", originalStyle);
  element.setAttribute("class", originalClass);
  document.head.removeChild(style);

  // Восстанавливаем display стили
  originalDisplayStyles.forEach((display, el) => {
    el.style.display = display;
  });

  // Создаем PDF
  const imgData = canvas.toDataURL("image/png");

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

  pdf.addImage(imgData, 'PNG', x, y, pdfImgWidth, pdfImgHeight);
  pdf.save("resume.pdf");
};