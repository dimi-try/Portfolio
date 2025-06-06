import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async () => {
  const element = document.getElementById('resume-content');

  // Сохраняем старые стили
  const originalStyle = element.getAttribute("style") || "";
  const originalClass = element.getAttribute("class") || "";

  // Временные стили для A4 (96dpi = 794x1123 px)
  element.style.width = "794px";
  element.style.minHeight = "1123px";
  element.style.padding = "40px";
  element.style.boxSizing = "border-box";
  element.style.zoom = "1";
  element.style.backgroundColor = "#fff"; // важно для сохранения фона
  element.style.overflow = "visible";

  // Применяем canvas-рендер
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

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Если контент вмещается на одну страницу
  if (pdfHeight <= pdf.internal.pageSize.getHeight()) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  } else {
    // Многостраничный PDF
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    while (position < pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight);
      position += pageHeight;
      if (position < pdfHeight) pdf.addPage();
    }
  }

  pdf.save("resume.pdf");
};
