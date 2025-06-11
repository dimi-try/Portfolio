import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async () => {
  const element = document.getElementById('resume-content');

  if (!element) {
    console.error("Element #resume-content not found");
    return;
  }

  // Сохраняем старые стили
  const originalStyle = element.getAttribute("style") || "";
  const originalClass = element.getAttribute("class") || "";

  // Применяем стили A4-страницы для захвата
  element.style.width = "794px"; // A4 при 96dpi
  element.style.minHeight = "1123px";
  element.style.padding = "40px";
  element.style.boxSizing = "border-box";
  element.style.zoom = "1";
  element.style.backgroundColor = "#fff";
  element.style.overflow = "visible";

  // Временный стиль для изображений чтобы не растягивались в своих контейнерах
  const style = document.createElement('style');
  style.innerHTML = `
    #resume-content img {
      object-fit: contain !important;
      max-width: 100% !important;
      height: auto !important;
      display: block;
      margin: 0 auto;
    }
  `;
  document.head.appendChild(style);

  // Захват DOM в canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    scrollY: -window.scrollY,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  // Восстанавливаем оригинальные стили
  element.setAttribute("style", originalStyle);
  element.setAttribute("class", originalClass);
  document.head.removeChild(style);

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
