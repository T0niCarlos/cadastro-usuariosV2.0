// csvUtils.js
export const exportCSV = (data) => {
    const csvContent = data.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "usuarios.txt");
    document.body.appendChild(link);
    link.click();
  };
  
  // pdfUtils.js
  export const exportPDF = (data) => {
    // Utilizar uma biblioteca como jsPDF para gerar o PDF
  };
  