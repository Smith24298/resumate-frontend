
const RAW_API_BASE = (
  (import.meta as ImportMeta & { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL
)?.trim();
const API_BASE = (RAW_API_BASE || 'http://localhost:4000').replace(/\/+$/, '');

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${API_BASE}${path}`, init);
  } catch (error) {
    const httpLocalhostBase = API_BASE.replace(/^https:\/\/localhost/i, 'http://localhost');
    if (httpLocalhostBase !== API_BASE) {
      return fetch(`${httpLocalhostBase}${path}`, init);
    }
    throw error;
  }
}

interface CompileResponse {
  pdfUrl?: string;
  error?: string;
  line?: number;
}

function formatCompileErrorMessage(rawMessage: string): string {
  if (/Cannot POST \/?/i.test(rawMessage)) {
    return 'Compile provider is misconfigured on the backend. Set LATEX_API_URL to a valid compile endpoint (usually ending with /compile).';
  }

  return rawMessage;
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
    const response = await apiFetch('/api/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (response.status === 422) {
      const errorData = (await response.json().catch(async () => {
        const text = await response.text().catch(() => '');
        return { error: text };
      })) as CompileResponse;

      throw new Error(
        formatCompileErrorMessage(errorData.error || 'Compilation failed'),
      );
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        formatCompileErrorMessage(`Compilation error: ${response.status} ${text}`),
      );
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
