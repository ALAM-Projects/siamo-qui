import { generatePdf } from "@/lib/generate-pdf";
import { validateAccessToken } from "@/lib/validateAccessToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const roles = ["Admin"];

    const res = await validateAccessToken(req, roles);

    if (res.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (res.status === 403) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();

    // Check if the data is valid
    if (!data || typeof data !== "object") {
      return new Response("Invalid data structure", { status: 400 });
    }

    // Generate the PDF
    const pdfBytes = await generatePdf(data);

    // Return the generated PDF as a downloadable response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated-document.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error); // Log the error for debugging

    // Return a detailed error message with status 500
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(`Error generating PDF: ${errorMessage}`, {
      status: 500,
    });
  }
}
