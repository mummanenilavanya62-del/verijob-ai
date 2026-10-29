# AI-Based Fake Job and Internship Detection System (VeriJob AI)

> **College CSE Mini Project** — Department of Computer Science & Engineering  
> **Academic Year:** 2025–2026  
> **Degree:** Bachelor of Technology (B.Tech) in Computer Science and Engineering

---

## 1. Abstract

The explosive growth of remote working arrangements and digitized recruitment platforms has unfortunately led to a corresponding surge in sophisticated recruitment scams. College students, fresh graduates, and junior professionals are frequently targeted by malicious actors offering lucrative work-from-home internships and entry-level positions. These fraudulent postings often serve as bait for upfront fee extortion, identity theft, banking credential harvesting, or illicit money-mule operations.

**VeriJob AI** is an autonomous, full-stack risk analysis platform engineered to detect fraudulent job and internship postings before candidates disclose sensitive personal information or transfer funds. The system integrates a dual-stage detection engine comprising:
1. **Statistical Natural Language Processing (NLP)** utilizing Term Frequency-Inverse Document Frequency (TF-IDF) feature vectorization paired with a balanced **Logistic Regression** classifier.
2. An explainable **Heuristic Rule Audit Engine** that evaluates ten deterministic scam indicators, including registration fees, enterprise-free email domain mismatches, guaranteed hiring tactics, and premature financial credential requests.

The platform provides a calibrated risk score (0 to 100), risk tier categorization (Low, Medium, High), highlighted evidence snippets, and actionable safety recommendations.

---

## 2. Problem Statement

Job seekers, especially university students seeking initial internships, encounter deceptive recruitment campaigns across LinkedIn, Telegram, WhatsApp, and unverified job portals. Existing defenses present severe limitations:
- **Delayed Intervention:** Traditional job boards rely on manual user flagging after victims have already lost money or identity credentials.
- **Opacity / Black-Box Warnings:** Commercial spam filters either silently discard emails or provide binary labels without explaining *why* an offer is untrustworthy.
- **Inadequate Heuristic Cross-Referencing:** Machine learning algorithms trained purely on text often miss subtle social engineering tactics such as enterprise recruiters operating from personal `@gmail.com` accounts or link shorteners directing applicants to unverified forms.

There is a critical need for a lightweight, explainable, transparent, and instantly accessible web platform that evaluates recruitment offers in real time without requiring user authentication.

---

## 3. Objectives

- **Develop an Interpretable Hybrid AI/ML Engine:** Combine statistical text classification with explainable rule heuristics to maximize both recall on known scams and precision on genuine postings.
- **Eliminate Barriers to Entry:** Enable instantaneous risk analysis without requiring mandatory user registration, resume uploads, or login credentials.
- **Provide Actionable Transparency:** Accompany all calculated risk scores with specific extracted text evidence, impact weights, and concrete verification steps.
- **Cross-Examine Identity Consistency:** Identify corporate impersonation by cross-referencing claimed enterprise names against recruiter contact domains and application portals.
- **Safeguard Privacy:** Prevent data leaks by implementing local, session-isolated persistence backed by SQLAlchemy and SQLite.

---

## 4. Existing System vs Proposed System

| Dimension | Existing System / Standard Portals | Proposed VeriJob AI System |
|---|---|---|
| **Detection Approach** | Post-facto user complaints & manual administrative moderation | Proactive pre-application hybrid AI + deterministic heuristic analysis |
| **Explainability** | Opaque binary flags (e.g., "Post flagged as spam") | Transparent score breakdown (0-100), evidence quotes, and impact factors |
| **Identity Verification** | Superficial badge verification often circumvented by spoofing | Dynamic cross-referencing of enterprise identity vs public free webmail |
| **User Privacy** | Mandatory account registration, tracking, and personal data collection | 100% anonymous, session-isolated scanning with zero credential storage |
| **Model Interpretability** | Closed-source or uncalibrated heuristics | Auditable TF-IDF token coefficients and documented heuristic matrices |

---

## 5. Technology Stack

### Frontend
- **Framework:** React 18 with Vite & TypeScript
- **Styling:** Tailwind CSS (Navy/Royal/Purple glassmorphism aesthetic)
- **Icons:** Lucide React
- **Data Visualization:** Recharts & Custom Radial SVG Gauges

### Backend & API
- **Framework:** Python 3.11+ / 3.14 with FastAPI
- **Data Validation & Schemas:** Pydantic v2
- **Database ORM:** SQLAlchemy 2.0 (SQLite for development, PostgreSQL-ready for production)
- **Server:** Uvicorn ASGI Server

### Machine Learning & NLP
- **Library:** scikit-learn
- **Vectorization:** TF-IDF (Term Frequency-Inverse Document Frequency) with unigram & bigram extraction
- **Classifier:** L2-regularized Logistic Regression with balanced class weighting
- **Serialization:** Joblib

### DevOps & Deployment
- **Containerization:** Docker & Docker Compose
- **Cloud Configurations:** Render (`render.yaml`), Vercel (`vercel.json`)
- **Automated Testing:** Pytest, HTTPX, and Starlette TestClient

---

## 6. System Architecture

```mermaid
flowchart TD
    User["Job Seeker / Student"] -->|Pastes Job Details| Frontend["React + Vite + TypeScript Frontend"]
    
    subgraph Client Application
        Frontend --> Form["Job Analysis Form & Preset Loader"]
        Frontend --> Dashboard["Results Dashboard & Gauge Meter"]
        Frontend --> HistoryUI["Session Scan History"]
    end

    Frontend -->|POST /api/analyze (JSON)| Gateway["FastAPI REST API Gateway"]

    subgraph Backend Engine
        Gateway --> SecurityMW["Security Middleware (Rate Limiter, Sanitizer, URL Validator)"]
        SecurityMW --> Engine["Hybrid Fraud Detection Engine"]
        
        subgraph Detection Pipeline
            Engine --> TFIDF["TF-IDF Vectorizer (1-2 N-Grams)"]
            TFIDF --> ML["Logistic Regression Classifier"]
            Engine --> Rules["Deterministic Heuristic Rule Auditor"]
            
            Rules --> F1["Registration Fee & Deposit Check"]
            Rules --> F2["Enterprise vs Free Webmail Audit"]
            Rules --> F3["Banking & Sensitive Credential Harvesting"]
            Rules --> F4["Guaranteed Placement & Urgent Pressure Tactics"]
        end

        Engine --> Calibrator["Risk Score Calibration & Ensemble Blending"]
        Calibrator --> DBRecord["Database Transaction (SQLAlchemy)"]
    end

    subgraph Persistence Layer
        DBRecord --> SQLite[("SQLite Database / PostgreSQL")]
    end

    Calibrator -->|JobAnalysisResponse JSON| Dashboard
```

---

## 7. System Modules

1. **Input & Validation Module:** Validates job title, company name, text length, and application URL format. Enforces strictly passive URL validation to prevent Server-Side Request Forgery (SSRF).
2. **Text Preprocessing & Normalization:** Sanitizes input strings, strips control characters, removes null bytes, and generates standardized feature corpus tokens.
3. **Statistical ML Classifier:** Generates n-gram TF-IDF vectors (max 2,500 features) and estimates fraud class probability using trained Logistic Regression weights.
4. **Deterministic Heuristic Engine:** Audits ten critical vulnerability indicators including upfront fees, direct selection promises, off-platform Telegram/WhatsApp chat traps, and suspicious top-level domains (`.xyz`, `.top`, `.tk`).
5. **Score Calibration & Decision Module:** Computes a composite risk score (0 to 100) using a weighted ensemble, applying safety floors when high-severity financial red flags are triggered.
6. **Persistence & Session History Module:** Stores scan history in SQLite using client session isolation, allowing users to review and delete prior scans without account creation.
7. **Interactive Results Dashboard:** Displays the overall radial risk gauge, ML vs Rule score comparison, detected warning evidence snippets, and safety checklists.

---

## 8. Installation & Execution Guide

### Prerequisites
- **Python:** 3.11, 3.12, 3.13, or 3.14
- **Node.js:** v18+ or v20+ with npm
- **Git**

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/fake-job-detection-system.git
cd fake-job-detection-system
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory or remain in root
# Install Python dependencies
pip install -r backend/requirements.txt

# Train the ML model and generate benchmark artifacts
python -m backend.app.ml.train

# Start the FastAPI backend server
python backend/run.py
```
The backend API server will start on: `http://127.0.0.1:8000`  
Interactive OpenAPI Swagger Documentation: `http://127.0.0.1:8000/docs`

### Step 3: Frontend Setup
```bash
# In a new terminal window:
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
The React frontend will start on: `http://localhost:5173`

---

## 9. Machine Learning Methodology

### Benchmark Dataset Schema
The model is trained on a documented, balanced benchmark dataset (`backend/data/job_postings_benchmark.json`) consisting of authentic industry postings from recognized engineering teams (Datadog, Spotify, Canva, CrowdStrike, Red Hat) and documented fraud schemes cataloged by the **FTC**, **FBI IC3**, and **University Career Advisories**.

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier |
| `job_title` | String | Position name |
| `company_name` | String | Purported organization |
| `job_description` | Text | Complete role description |
| `salary_stipend` | String | Compensation details |
| `recruiter_email` | String | Contact email |
| `is_fraudulent` | Integer | Binary ground truth (0 = Legitimate, 1 = Fraudulent) |
| `fraud_category` | String | Scam tactic taxonomy |
| `reference_source` | String | Origin advisory bulletin |

### Training Pipeline
```bash
python -m backend.app.ml.train
```
- **Vectorization:** `TfidfVectorizer(ngram_range=(1, 2), max_features=2500, sublinear_tf=True, stop_words='english')`
- **Estimator:** `LogisticRegression(C=1.5, class_weight='balanced', max_iter=500)`
- **Saved Artifacts:** `backend/data/job_classifier_model.joblib`, `backend/data/tfidf_vectorizer.joblib`

### Model Interpretability & Feature Weights
Run the standalone model evaluation script:
```bash
python -m backend.app.ml.evaluate
```

**Top Fraud-Indicative Features (Positive Log-Odds Coefficients):**
- `rs` (+0.2459) — Characteristic of Indian placement fee solicitations
- `account` (+0.1667) — Premature banking information requests
- `pay` (+0.1641) — Upfront deposit demands
- `hr` (+0.1611) — Fake HR coordinator impersonation
- `support` (+0.1602) — Generic outsourced support scam templates

**Top Legitimacy-Indicative Features (Negative Log-Odds Coefficients):**
- `science` (-0.1814) — Formal degree requirements
- `using` (-0.1664) — Concrete technical toolchains
- `intern` (-0.1527) — Structured university cohort descriptions
- `computer science` (-0.1359) — Standard academic prerequisites

---

## 10. Automated Testing & Verification

The test suite includes 17 automated tests covering unit heuristics, ML training and inference, and complete REST API workflows:

```bash
python -m pytest backend/tests -v
```

### Actual Test Results Obtained:
```text
backend/tests/test_api.py::test_health_endpoint PASSED                   [  5%]
backend/tests/test_api.py::test_methodology_endpoint PASSED              [ 11%]
backend/tests/test_api.py::test_sample_jobs_endpoint PASSED              [ 17%]
backend/tests/test_api.py::test_analyze_legitimate_job PASSED            [ 23%]
backend/tests/test_api.py::test_analyze_fraudulent_job PASSED            [ 29%]
backend/tests/test_api.py::test_analyze_validation_errors PASSED         [ 35%]
backend/tests/test_api.py::test_history_workflow PASSED                  [ 41%]
backend/tests/test_api.py::test_scam_report_submission PASSED            [ 47%]
backend/tests/test_ml.py::test_benchmark_dataset_integrity PASSED        [ 52%]
backend/tests/test_ml.py::test_ml_training_pipeline PASSED               [ 58%]
backend/tests/test_ml.py::test_ml_evaluation_summary PASSED              [ 64%]
backend/tests/test_ml.py::test_prediction_engine_hybrid PASSED           [ 70%]
backend/tests/test_rules.py::test_clean_legitimate_posting PASSED        [ 76%]
backend/tests/test_rules.py::test_registration_fee_detection PASSED      [ 82%]
backend/tests/test_rules.py::test_enterprise_free_email_mismatch PASSED  [ 88%]
backend/tests/test_rules.py::test_banking_credential_harvesting PASSED   [ 94%]
backend/tests/test_rules.py::test_telegram_and_guarantee_tactics PASSED  [100%]

======================== 17 passed in 2.27s ========================
```

---

## 11. Deployment Guide

### Option A: Docker Deployment (Recommended)
Build and run both frontend and backend with a single command:
```bash
docker compose up --build
```
- Access Frontend: `http://localhost:5173`
- Access Backend API: `http://localhost:8000`

### Option B: Cloud Hosting (Render / Vercel)
1. **Backend on Render:**
   - Link your GitHub repository to Render.
   - Select **Web Service** using `render.yaml` or Docker runtime.
   - Build Command: `pip install -r backend/requirements.txt && python -m backend.app.ml.train`
   - Start Command: `python backend/run.py`
2. **Frontend on Vercel or Render Static Site:**
   - Framework preset: **Vite**
   - Root directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Set Environment Variable: `VITE_API_URL=https://your-backend.onrender.com`

---

## 12. Limitations & Future Scope

### Limitations
- **Passive URL Verification:** The system strictly parses URL structure and does not crawl live external websites to prevent SSRF vulnerabilities and rate-limiting blocks.
- **English-Language Corpus:** The primary dataset and vectorizer dictionary are optimized for English-language postings.
- **Offline Text Input:** Analysis relies on text provided by the candidate rather than automated session interception.

### Future Enhancements
- **Browser Extension:** Develop a Chrome/Firefox extension that automatically scans postings on LinkedIn, Glassdoor, and Internshala directly in the browser viewport.
- **WHOIS & Domain Age Telemetry:** Integrate an external domain age API to detect newly registered recruitment domains (< 30 days old).
- **Multilingual NLP:** Expand TF-IDF tokenizers and training corpora to support regional recruitment fraud in Hindi, Spanish, and French.
- **Graph Neural Network (GNN) Employer Mapping:** Model relationships between recruiters, domains, and corporate registries to detect distributed syndicates.

---

## 13. Project Presentation Checklist for Faculty Demo

When demonstrating this project to academic faculty:
1. **Show Backend Health:** Navigate to `http://127.0.0.1:8000/api/health` to demonstrate live model loading and database connectivity.
2. **Interactive 1-Click Samples:** On the home or analyze page, click each demo preset:
   - *Legitimate Tech Intern:* Low Risk score (< 20) with clean verification check.
   - *High-Risk Upfront Fee Scam:* High Risk score (100) flagging registration fee and Bitcoin payment.
   - *Enterprise Impersonation Scheme:* High Risk score (95+) highlighting enterprise claimed vs `@gmail.com` contact mismatch.
3. **Show ML Interpretability:** Run `python -m backend.app.ml.evaluate` in the terminal to display the live confusion matrix and top token log-odds weights.
4. **Show Automated Tests:** Run `python -m pytest backend/tests -v` to prove all 17 unit and integration tests pass cleanly.

---

## License

This project is open-source software licensed under the [MIT License](LICENSE).
