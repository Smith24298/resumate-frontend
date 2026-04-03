
const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface CompileResponse {
  pdfUrl?: string;
  error?: string;
  line?: number;
}

/**
 * Compile LaTeX content to PDF
 * Returns a Blob of the PDF or throws with error message
 */
export async function compileResume(
  content: string,
  getToken: () => Promise<string | null>
): Promise<Blob> {
  const token = await getToken();
  if (!token) throw new Error('No auth token');

  try {
    const response = await fetch(`${API_BASE}/api/compile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (response.status === 422) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Compilation failed');
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Compilation error: ${response.status} ${text}`);
    }

    const blob = await response.blob();
    
    if (!blob || blob.size === 0) {
      throw new Error('Compilation produced empty PDF');
    }
    
    return blob;
  } catch (error) {
    console.error('Compile error details:', error);
    throw error;
  }
}

/**
 * Convert Blob to Object URL for preview
 */
export function createPdfUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

/**
 * Revoke Object URL to free memory
 */
export function revokePdfUrl(url: string): void {
  URL.revokeObjectURL(url);
}

/**
 * Trigger PDF download
 */
export function downloadPdf(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
