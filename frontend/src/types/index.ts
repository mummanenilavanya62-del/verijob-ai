export interface WarningSignItem {
  code: string;
  category: 'financial' | 'urgency' | 'contact' | 'compensation' | 'content';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  evidence?: string | null;
}

export interface ExplanationCard {
  title: string;
  impact: string;
  detail: string;
}

export interface JobAnalysisRequest {
  job_title: string;
  company_name: string;
  job_description: string;
  location?: string;
  job_type?: string;
  salary_stipend?: string;
  application_url?: string;
  recruiter_email?: string;
  session_id?: string;
}

export interface JobAnalysisResponse {
  id: string;
  job_title: string;
  company_name: string;
  location?: string;
  job_type?: string;
  salary_stipend?: string;
  application_url?: string;
  recruiter_email?: string;
  risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  ml_score: number;
  rule_score: number;
  model_mode: string;
  warning_signs: WarningSignItem[];
  explanations: ExplanationCard[];
  recommendations: string[];
  created_at: string;
}

export interface HistoryItemSummary {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  warning_count: number;
  created_at: string;
}

export interface SampleJob {
  id: string;
  label: string;
  category: string;
  expected_risk: string;
  description_summary: string;
  data: JobAnalysisRequest;
}

export interface MethodologyResponse {
  title: string;
  pipeline_overview: string;
  ml_components: Record<string, any>;
  rule_heuristics: Array<{
    rule_name: string;
    severity: string;
    rationale: string;
  }>;
  scoring_calibration: {
    score_range: string;
    categories: Record<string, string>;
    ensemble_weighting: string;
  };
  disclaimer: string;
}

export interface ScamReportCreate {
  job_title: string;
  company_name: string;
  source_url?: string;
  scam_description: string;
  scam_type: string;
  contact_email?: string;
}
