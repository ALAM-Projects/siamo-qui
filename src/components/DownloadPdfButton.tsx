// components/DownloadPdfButton.js
import { useState } from "react";

const DownloadPdfButton = ({ data }: any) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("res", res);

      if (res.ok) {
        // Check if the response is a PDF file
        const blob = await res.blob();

        console.log("blob", blob);

        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "generated-document.pdf"; // Filename for the download
        link.click(); // Trigger the download

        console.log("Downloaded successfully");
      } else {
        console.error("Error generating PDF");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    setLoading(false);
  };

  // async function testGeneratePdf() {
  //   const testData = {
  //     intro: "Test intro",
  //     categories: {
  //       WEBSITE: {
  //         name: "WEBSITE",
  //         description: "Website design and development",
  //         services: {
  //           service1: { name: "Test service", price: 100, time: 10 },
  //         },
  //       },
  //     },
  //   };

  //   try {
  //     const pdf = await generatePdf(testData);

  //     console.log("PDF generated successfully", pdf);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // }

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
};

export default DownloadPdfButton;
