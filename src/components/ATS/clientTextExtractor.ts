export interface ClientExtractionResult {
  text: string;
  hash: string;
}

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }

  const arrayBuffer = await file.arrayBuffer();
  const document = await pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
  }).promise;

  const chunks: string[] = [];
  for (let page = 1; page <= document.numPages; page += 1) {
    const currentPage = await document.getPage(page);
    const content = await currentPage.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    chunks.push(pageText);
  }

  return chunks.join("\n").trim();
}

async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return String(result.value || "").trim();
}

export async function extractResumeTextClientSide(
  file: File,
): Promise<ClientExtractionResult> {
  const extension = file.name.toLowerCase().split(".").pop();

  let text = "";
  if (extension === "pdf") {
    text = await extractPdfText(file);
  } else if (extension === "docx") {
    text = await extractDocxText(file);
  } else {
    throw new Error("Only PDF and DOCX files are supported.");
  }

  if (!text.trim()) {
    throw new Error("This file appears to be image-only. Use a text-based PDF.");
  }

  const hash = await sha256(text);
  return { text, hash };
}
