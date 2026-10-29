import React, { useState } from 'react';
import { JobAnalysisRequest } from '../types';
import { SampleJobSelector } from './SampleJobSelector';
import { Search, RotateCcw, Building2, Briefcase, MapPin, DollarSign, Link, Mail, FileText, AlertCircle, Loader2 } from 'lucide-react';

interface AnalysisFormProps {
  onSubmit: (data: JobAnalysisRequest) => void;
  isLoading: boolean;
}

export const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<JobAnalysisRequest>({
    job_title: '',
    company_name: '',
    job_description: '',
    location: '',
    job_type: 'Internship',
    salary_stipend: '',
    application_url: '',
    recruiter_email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.job_title.trim()) {
      errs.job_title = 'Job or internship title is required';
    }
    if (!formData.company_name.trim()) {
      errs.company_name = 'Company name is required';
    }
    if (!formData.job_description.trim()) {
      errs.job_description = 'Job description is required';
    } else if (formData.job_description.trim().length < 20) {
      errs.job_description = 'Description must be at least 20 characters long';
    }

    if (formData.application_url?.trim()) {
      const url = formData.application_url.trim().toLowerCase();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        errs.application_url = 'URL must start with http:// or https://';
      }
    }

    if (formData.recruiter_email?.trim()) {
      const email = formData.recruiter_email.trim();
      if (!email.includes('@') || !email.includes('.')) {
        errs.recruiter_email = 'Please provide a valid email format (e.g. recruiter@company.com)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      job_title: '',
      company_name: '',
      job_description: '',
      location: '',
      job_type: 'Internship',
      salary_stipend: '',
      application_url: '',
      recruiter_email: ''
    });
    setErrors({});
  };

  const handleSelectSample = (sample: JobAnalysisRequest) => {
    setFormData(sample);
    setErrors({});
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border-slate-800 shadow-2xl relative">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2.5">
          <Search className="w-6 h-6 text-blue-400" />
          <span>Job & Internship Risk Analyzer</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Paste the job posting details below. No registration or personal credentials required.
        </p>
      </div>

      {/* Preset Sample Selector for Interactive Demos */}
      <SampleJobSelector onSelectSample={handleSelectSample} />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Job or Internship Title <span className="text-rose-400">*</span></span>
            </label>
            <input
              type="text"
              placeholder="e.g. Machine Learning Engineering Intern"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.job_title ? 'border-rose-500/80 bg-rose-950/20' : 'border-slate-800'
              }`}
            />
            {errors.job_title && (
              <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.job_title}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Company / Employer Name <span className="text-rose-400">*</span></span>
            </label>
            <input
              type="text"
              placeholder="e.g. Google, Datadog, Stripe"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.company_name ? 'border-rose-500/80 bg-rose-950/20' : 'border-slate-800'
              }`}
            />
            {errors.company_name && (
              <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.company_name}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Location, Job Type, Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Location</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Remote, New York, NY, Bangalore"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              <span>Job Type</span>
            </label>
            <select
              value={formData.job_type}
              onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract / Freelance">Contract / Freelance</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Salary / Stipend</span>
            </label>
            <input
              type="text"
              placeholder="e.g. $50/hr, Rs. 40,000/month"
              value={formData.salary_stipend}
              onChange={(e) => setFormData({ ...formData, salary_stipend: e.target.value })}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Row 3: Application URL & Recruiter Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Link className="w-3.5 h-3.5 text-blue-400" />
              <span>Application Portal URL (Optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://company.com/careers/job-123"
              value={formData.application_url}
              onChange={(e) => setFormData({ ...formData, application_url: e.target.value })}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.application_url ? 'border-rose-500/80 bg-rose-950/20' : 'border-slate-800'
              }`}
            />
            {errors.application_url && (
              <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.application_url}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recruiter Email (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. university-recruiting@company.com"
              value={formData.recruiter_email}
              onChange={(e) => setFormData({ ...formData, recruiter_email: e.target.value })}
              className={`w-full bg-slate-900/90 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                errors.recruiter_email ? 'border-rose-500/80 bg-rose-950/20' : 'border-slate-800'
              }`}
            />
            {errors.recruiter_email && (
              <p className="text-xs text-rose-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.recruiter_email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Full Job Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Full Job Description & Offer Text <span className="text-rose-400">*</span></span>
          </label>
          <textarea
            rows={6}
            placeholder="Paste complete job requirements, responsibilities, compensation claims, or recruiter communication message..."
            value={formData.job_description}
            onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
            className={`w-full bg-slate-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y ${
              errors.job_description ? 'border-rose-500/80 bg-rose-950/20' : 'border-slate-800'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.job_description ? (
              <p className="text-xs text-rose-400 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.job_description}</span>
              </p>
            ) : (
              <span className="text-xs text-slate-500">
                Minimum 20 characters. More text provides higher ML model precision.
              </span>
            )}
            <span className="text-xs text-slate-500">{formData.job_description.length} chars</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Form</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Posting...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Run AI Risk Analysis</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
