document.getElementById("generateBtn").addEventListener("click", async () => {
    const url = document.getElementById("urlInput").value.trim();
    const status = document.getElementById("status");
    const downloadLink = document.getElementById("downloadLink");

    if (!url.startsWith("https://")) {
        status.textContent = "Please enter a full URL starting with https://";
        return;
    }

    status.textContent = "Generating report...";
    downloadLink.style.display = "none";

    try {
        const apiKey = "YOUR_API_KEY_HERE"; // Replace later

        const response = await fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`
        );

        if (!response.ok) throw new Error("API request failed.");

        const data = await response.json();

        // TEMP: show something works
        status.textContent = "Success! API returned data.";

        // We’ll add jsPDF here later
    } catch (err) {
        status.textContent = "Error: Could not generate report.";
        console.error(err);
    }
});
