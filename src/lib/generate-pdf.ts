import { PDFDocument, rgb } from "pdf-lib";

export async function generatePdf(data: any) {
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the PDF document
  const page = pdfDoc.addPage([600, 850]);

  const { intro, categories } = data;

  // Write the intro text
  page.drawText(intro, {
    x: 30,
    y: 800,
    size: 12,
    color: rgb(0, 0, 0),
    maxWidth: 550,
  });

  let currentY = 750;

  // Create a form for checkboxes
  const form = pdfDoc.getForm();

  // Keep track of checkbox field names to disable them later
  const checkboxNames = [];

  // Loop through categories and services to add them to the PDF
  for (const categoryKey in categories) {
    const category = categories[categoryKey];

    // Write category name and description
    page.drawText(`${category.name}: ${category.description}`, {
      x: 30,
      y: currentY,
      size: 14,
      color: rgb(0, 0, 0),
    });

    currentY -= 30; // Move down for the services list

    // Loop through services in the category
    for (const serviceKey in category.services) {
      const service = category.services[serviceKey];

      const checkbox = form.createCheckBox(`${category.name}-${service.name}`);
      checkbox.addToPage(page, { x: 30, y: currentY });

      // Add the checkbox to the tracking list for later disabling
      checkboxNames.push(`${category.name}-${service.name}`);

      // Add service name
      page.drawText(service.name, {
        x: 60,
        y: currentY + 3,
        size: 12,
        color: rgb(0, 0, 0),
      });

      currentY -= 30; // Move down to next service
    }

    currentY -= 20; // Add space between categories
  }

  // Create a 'Confirm' button (this won't trigger any action in a PDF viewer)
  const button = form.createButton("Confirm");
  button.addToPage("Confirm", page, {
    x: 50,
    y: 75,
    width: 200,
    height: 100,
    textColor: rgb(1, 0, 0),
    backgroundColor: rgb(0, 1, 0),
    borderColor: rgb(0, 0, 1),
    borderWidth: 2,
  });

  // Draw text to simulate the label of the button
  page.drawText("Confirm", {
    x: 30 + 20, // Position text inside the button
    y: currentY - 30, // Adjust Y position to be centered within the button
    size: 14,
    color: rgb(0, 0, 0),
  });

  // Disable all checkboxes by "checking" them (to simulate disabling)
  checkboxNames.forEach((name) => {
    const checkboxField = form.getCheckBox(name);
    checkboxField.check(); // Check the checkbox to simulate confirmation
  });

  // Serialize the document to bytes (for download)
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
