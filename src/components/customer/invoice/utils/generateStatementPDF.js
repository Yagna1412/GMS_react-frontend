import { jsPDF } from "jspdf";

const BLUE       = [30, 58, 138];
const LIGHT_BLUE = [219, 234, 254];
const MUTED      = [100, 116, 139];
const WHITE      = [255, 255, 255];
const GREEN_BG   = [220, 252, 231];
const GREEN_TEXT = [21, 128, 61];
const RED_BG     = [254, 226, 226];
const RED_TEXT   = [185, 28, 28];

function generateStatementPDF(invoices, filename = "Statement.pdf") {
  if (!invoices || invoices.length === 0) {
    console.error("No invoice data provided");
    return;
  }

  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();

  doc.setFillColor(239, 246, 255);
  doc.rect(0, 0, pageW, 297, "F");

  doc.setFillColor(...BLUE);
  doc.rect(0, 0, pageW, 28, "F");

  doc.setTextColor(...WHITE);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const title = invoices.length === 1 ? "Invoice" : "Invoices & Payments — Statement";
  doc.text(title, 14, 18);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Generated: ${today}`, pageW - 14, 18, { align: "right" });

  let y = 44;

  invoices.forEach((invoice, index) => {
    // ── Map backend fields ──────────────────────────────
    const invId       = invoice.invoiceNumber || "N/A";
    const invDate     = invoice.serviceDate   || "N/A";
    const invAmount   = `$${(invoice.totalAmount || 0).toFixed(2)}`;
    const invCustomer = invoice.customerName  || "Customer";
    const invAddress  = invoice.customerAddress || "";
    const invStatus   = invoice.status        || "PENDING";

    // ── Build items from backend charges ───────────────
    const invItems = [
      { description: "Service Charge", cost: `$${(invoice.serviceCharge || 0).toFixed(2)}` },
      { description: "Labor Charge",   cost: `$${(invoice.laborCharge   || 0).toFixed(2)}` },
    ];

    // card background
    doc.setFillColor(...WHITE);
    doc.roundedRect(12, y - 6, pageW - 24, 72 + invItems.length * 10, 4, 4, "F");

    doc.setDrawColor(...LIGHT_BLUE);
    doc.setLineWidth(0.4);
    doc.roundedRect(12, y - 6, pageW - 24, 72 + invItems.length * 10, 4, 4, "S");

    // invoice number
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLUE);
    doc.text(invId.toUpperCase(), 18, y + 4);

    // status badge
    const badgeBg   = invStatus.toUpperCase() === "PAID" ? GREEN_BG  : RED_BG;
    const badgeText = invStatus.toUpperCase() === "PAID" ? GREEN_TEXT : RED_TEXT;
    doc.setFillColor(...badgeBg);
    doc.roundedRect(pageW - 52, y - 3, 36, 10, 3, 3, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...badgeText);
    doc.text(invStatus, pageW - 34, y + 4, { align: "center" });

    y += 14;

    // customer info
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text("Customer", 18, y);
    doc.text("Date", 90, y);
    doc.text("Total Amount", 150, y);

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLUE);
    doc.setFontSize(10);
    doc.text(invCustomer, 18, y);
    doc.text(invDate, 90, y);
    doc.text(invAmount, 150, y);

    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(invAddress, 18, y);

    y += 10;

    // items table header
    doc.setFillColor(...LIGHT_BLUE);
    doc.rect(18, y, pageW - 36, 8, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLUE);
    doc.text("DESCRIPTION", 22, y + 5.5);
    doc.text("COST", pageW - 22, y + 5.5, { align: "right" });

    y += 8;

    // items rows
    invItems.forEach((item) => {
      doc.setDrawColor(...LIGHT_BLUE);
      doc.setLineWidth(0.2);
      doc.line(18, y, pageW - 18, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...BLUE);
      doc.setFontSize(9);
      doc.text(item.description, 22, y + 6);
      doc.text(item.cost, pageW - 22, y + 6, { align: "right" });
      y += 10;
    });

    // total row
    doc.setFillColor(239, 246, 255);
    doc.rect(18, y, pageW - 36, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLUE);
    doc.setFontSize(9);
    doc.text("Total", 22, y + 6);
    doc.text(invAmount, pageW - 22, y + 6, { align: "right" });

    y += 20;

    if (index < invoices.length - 1 && y > 240) {
      doc.addPage();
      doc.setFillColor(239, 246, 255);
      doc.rect(0, 0, pageW, 297, "F");
      y = 20;
    }
  });

  // footer
  doc.setFillColor(...BLUE);
  doc.rect(0, 282, pageW, 15, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...WHITE);
  doc.text("Thank you for your business.", pageW / 2, 291, { align: "center" });

  doc.save(filename);
}

export default generateStatementPDF;