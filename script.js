document.getElementById("seoForm").addEventListener("submit", async e => {
  e.preventDefault();
  const url = document.getElementById("websiteUrl").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Generating report...";

  try {
    // Call your Vercel serverless function
    const response = await fetch(`/api/pagespeed?url=${encodeURIComponent(url)}`);
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

    // Save last data for PDF
    window.lastData = data;

  } catch (err) {
    resultsDiv.innerHTML = "Error generating report. Please try again.";
    console.error(err);
  }
});
