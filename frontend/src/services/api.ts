import {
  JobAnalysisRequest,
  JobAnalysisResponse,
  HistoryItemSummary,
  SampleJob,
  MethodologyResponse,
  ScamReportCreate
} from '../types';

function getApiBase(): string {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || !envUrl.trim()) {
    return '/api';
  }
  const trimmed = envUrl.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const API_BASE = getApiBase();

export function getSessionId(): string {
  let sessionId = localStorage.getItem('verijob_session_id');
  if (!sessionId) {
    sessionId = 'vj_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('verijob_session_id', sessionId);
  }
  return sessionId;
}

function parseErrorMessage(errorData: any, status: number, defaultMsg: string): string {
  if (!errorData) return `HTTP ${status}: ${defaultMsg}`;
  if (typeof errorData.detail === 'string') return errorData.detail;
  if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
    return errorData.detail
      .map((item: any) => item.msg || item.message || JSON.stringify(item))
      .join('; ');
  }
  if (errorData.message && typeof errorData.message === 'string') return errorData.message;
  return `HTTP ${status}: ${defaultMsg}`;
}

export async function analyzeJob(payload: JobAnalysisRequest): Promise<JobAnalysisResponse> {
  const bodyWithSession = {
    ...payload,
    session_id: payload.session_id || getSessionId()
  };

  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyWithSession)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(parseErrorMessage(errorData, res.status, 'Failed to analyze job posting'));
  }

  return res.json();
}

export async function getSampleJobs(): Promise<SampleJob[]> {
  const res = await fetch(`${API_BASE}/sample-jobs`);
  if (!res.ok) throw new Error('Failed to load sample postings');
  return res.json();
}

export async function getHistory(sessionId?: string): Promise<HistoryItemSummary[]> {
  const sid = sessionId || getSessionId();
  const res = await fetch(`${API_BASE}/history?session_id=${encodeURIComponent(sid)}`);
  if (!res.ok) throw new Error('Failed to fetch analysis history');
  return res.json();
}

export async function getHistoryById(id: string): Promise<JobAnalysisResponse> {
  const res = await fetch(`${API_BASE}/history/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Failed to fetch detailed analysis');
  return res.json();
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/history/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete history item');
}

export async function getMethodology(): Promise<MethodologyResponse> {
  const res = await fetch(`${API_BASE}/methodology`);
  if (!res.ok) throw new Error('Failed to load methodology documentation');
  return res.json();
}

export async function submitScamReport(report: ScamReportCreate): Promise<{ status: string; message: string }> {
  const res = await fetch(`${API_BASE}/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(parseErrorMessage(errorData, res.status, 'Failed to submit report'));
  }
  return res.json();
}

export async function checkHealth(): Promise<{ status: string; ml_engine_mode: string }> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}
