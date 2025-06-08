import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async () => {
  const element = document.getElementById('resume-content');

  // Сохраняем старые стили
  const originalStyle = element.getAttribute("style") || "";
  const originalClass = element.getAttribute("class") || "";

  // A4 в пикселях при 96dpi ≈ 794 x 1123
  element.style.width = "794px";
  element.style.minHeight = "1123px";
  element.style.padding = "40px";
  element.style.boxSizing = "border-box";
  element.style.zoom = "1";
  element.style.backgroundColor = "#fff";
  element.style.overflow = "visible";

  const canvas = await html2canvas(element, {
    scale: 2,
    scrollY: -window.scrollY,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  // Восстанавливаем стили
  element.setAttribute("style", originalStyle);
  element.setAttribute("class", originalClass);

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  // Рассчитываем соотношение
  const imgProps = {
    width: canvas.width,
    height: canvas.height
  };

  const ratio = imgProps.width / imgProps.height;
  const pdfImgWidth = pageWidth;
  const pdfImgHeight = pdfImgWidth / ratio;

  // Если слишком высоко — уменьшаем до высоты страницы
  const finalHeight = pdfImgHeight > pageHeight ? pageHeight : pdfImgHeight;
  const finalWidth = finalHeight * ratio;

  // Центрируем по вертикали (если меньше по высоте)
  const x = 0;
  const y = (pageHeight - finalHeight) / 2;

  pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
  pdf.save("resume.pdf");
};
