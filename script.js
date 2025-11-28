document.getElementById("seoForm").addEventListener("submit", async e => {
  e.preventDefault();
  const url = document.getElementById("websiteUrl").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Generating report...";

  try {
    const response = await fetch(`/api/seo-report?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.error) {
      resultsDiv.innerHTML = "Error: " + data.error;
      return;
    }

    const perfScore = data.lighthouseResult.categories.performance.score * 100;
    const seoScore = data.lighthouseResult.categories.seo.score * 100;
    const accessibility = data.lighthouseResult.categories.accessibility.score * 100;

    resultsDiv.innerHTML = `
      <p><strong>Performance Score:</strong> ${perfScore}</p>
      <p><strong>SEO Score:</strong> ${seoScore}</p>
      <p><strong>Accessibility Score:</strong> ${accessibility}</p>
    `;

    document.getElementById("downloadPdf").style.display = "block";
    window.lastData = data;

  } catch (err) {
    resultsDiv.innerHTML = "Error generating report. Please try again.";
    console.error(err);
  }
});

document.getElementById("downloadPdf").onclick = () => {
  if (!window.lastData) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const url = document.getElementById("websiteUrl").value;

  const perfScore = window.lastData.lighthouseResult.categories.performance.score * 100;
  const seoScore = window.lastData.lighthouseResult.categories.seo.score * 100;
  const accessibility = window.lastData.lighthouseResult.categories.accessibility.score * 100;

  doc.setFont("Oswald");
  doc.setFontSize(24);
  doc.text(`SEO Report for ${url}`, 10, 20);

  doc.setFont("Montserrat");
  doc.setFontSize(12);
  doc.text(`Performance Score: ${perfScore}`, 10, 40);
  doc.text(`SEO Score: ${seoScore}`, 10, 50);
  doc.text(`Accessibility Score: ${accessibility}`, 10, 60);
  doc.text("This is a free basic report. For a full SEO audit, book our comprehensive service.", 10, 80);

  doc.save("SEO_Report.pdf");
};
