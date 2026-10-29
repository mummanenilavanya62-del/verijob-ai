"""
Benchmark Dataset Module for AI-Based Fake Job and Internship Detection System.

Schema Definition:
- id: unique string identifier
- job_title: Title of job or internship
- company_name: Purported hiring entity
- job_description: Text of job responsibilities and requirements
- location: Physical city/state or remote
- job_type: Internship, Full-time, Part-time, Remote
- salary_stipend: Compensation string
- application_url: Target URL
- recruiter_email: Contact email address
- is_fraudulent: Binary label (0 = Legitimate, 1 = Fraudulent/Suspicious)
- fraud_category: Classification of scam tactic or 'legitimate'
- reference_source: Origin documentation (e.g., FTC Job Alert, University Career Advisory, Open Corporates)
"""

import json
from pathlib import Path
from typing import List, Dict, Any
from backend.app.config import settings

BENCHMARK_DATA: List[Dict[str, Any]] = [
    # --- LEGITIMATE POSTINGS (Label: 0) ---
    {
        "id": "legit-001",
        "job_title": "Software Engineering Intern - Summer 2026",
        "company_name": "Datadog",
        "job_description": "Join our distributed tracing engineering team as a Software Engineering Intern. You will design, build, and deploy high-throughput backend services using Go and Python. Collaborate with senior engineers on telemetry ingestion pipelines and monitor production reliability using our own observability platform. Requirements: Pursuing a BS or MS in Computer Science or related STEM field. Solid foundational knowledge of data structures, algorithms, and object-oriented programming. Familiarity with Unix/Linux environments, Git version control, and relational databases. Excellent collaborative problem solving and verbal communication skills.",
        "location": "New York, NY (Hybrid)",
        "job_type": "Internship",
        "salary_stipend": "$55 / hour + housing stipend",
        "application_url": "https://careers.datadoghq.com/internships/swe-2026",
        "recruiter_email": "university-recruiting@datadoghq.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified Corporate Careers Portal"
    },
    {
        "id": "legit-002",
        "job_title": "Junior Full Stack Developer",
        "company_name": "Thoughtworks",
        "job_description": "We are seeking a Junior Full Stack Developer passionate about clean code, test-driven development (TDD), and continuous delivery. You will work within agile cross-functional teams delivering custom web applications for enterprise clients using React, TypeScript, and Java Spring Boot. Responsibilities include writing maintainable unit and integration tests, participating in pair programming sessions, and contributing to sprint planning and retrospectives. Qualifications: Bachelor's degree in Computer Science or equivalent software engineering bootcamp certificate with project portfolio. Strong understanding of modern JavaScript (ES6+), HTML5, CSS3, and RESTful APIs. Eagerness to learn cloud platforms (AWS/GCP) and microservices architecture.",
        "location": "Chicago, IL (On-site)",
        "job_type": "Full-time",
        "salary_stipend": "$78,000 - $88,000 / year + health benefits & 401(k)",
        "application_url": "https://www.thoughtworks.com/careers/jobs/junior-dev-chi",
        "recruiter_email": "talent-acquisition@thoughtworks.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified Corporate Careers Portal"
    },
    {
        "id": "legit-003",
        "job_title": "Machine Learning Research Intern",
        "company_name": "Allen Institute for AI",
        "job_description": "The Allen Institute for AI (AI2) invites applications for our Machine Learning Research Internship. You will collaborate with research scientists on open-source foundation models, evaluation benchmarks, and multimodal reasoning datasets. Responsibilities include running distributed training experiments using PyTorch, documenting empirical findings, and co-authoring scientific papers for submission to conferences such as NeurIPS, ICML, or ACL. Requirements: Currently enrolled in a PhD or research-oriented Master's program in Computer Science or Statistics. Demonstrated proficiency in Python and deep learning frameworks (PyTorch or JAX). Prior research publications or open-source ML contributions preferred.",
        "location": "Seattle, WA (Hybrid)",
        "job_type": "Internship",
        "salary_stipend": "$60 / hour + comprehensive relocation allowance",
        "application_url": "https://allenai.org/careers/internships/ml-research",
        "recruiter_email": "careers@allenai.org",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified Academic/Research Lab Portal"
    },
    {
        "id": "legit-004",
        "job_title": "Frontend React Engineer",
        "company_name": "Canva",
        "job_description": "Canva is looking for a Frontend Engineer to join our Creative Suite web team. You will build intuitive, highly responsive design tools used by millions of creators worldwide. Key duties: architect reusable components using React, TypeScript, and WebGL, optimize rendering performance and bundle sizes, and partner with product designers to implement accessible UX patterns. What we are looking for: 2+ years of professional front-end web development experience, mastery of browser rendering concepts, DOM lifecycle, and modern CSS tooling. Familiarity with automated frontend testing frameworks such as Jest, Vitest, and Cypress.",
        "location": "Austin, TX (Remote)",
        "job_type": "Full-time",
        "salary_stipend": "$115,000 - $135,000 / year + equity",
        "application_url": "https://www.canva.com/careers/job/frontend-react-eng",
        "recruiter_email": "talent@canva.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified Corporate Careers Portal"
    },
    {
        "id": "legit-005",
        "job_title": "Cybersecurity Analyst",
        "company_name": "CrowdStrike",
        "job_description": "Join CrowdStrike as a Cybersecurity Analyst in our Falcon Operations Center. Responsibilities include monitoring security event feeds, triaging endpoint detection alerts, analyzing suspicious malware binaries in sandbox environments, and assisting with enterprise incident response actions. Qualifications: Bachelor's degree in Cybersecurity, Information Systems, or equivalent experience. Fundamental knowledge of TCP/IP networking, OSI model, common attack vectors (MITRE ATT&CK), and operating system internals (Windows/Linux). Relevant industry certifications such as CompTIA Security+, CySA+, or GIAC are a plus.",
        "location": "Sunnyvale, CA (Hybrid)",
        "job_type": "Full-time",
        "salary_stipend": "$92,000 - $110,000 / year + bonus",
        "application_url": "https://crowdstrike.wd5.myworkdayjobs.com/security-analyst",
        "recruiter_email": "recruiting-ops@crowdstrike.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Enterprise Workday ATS"
    },
    {
        "id": "legit-006",
        "job_title": "Data Science & Analytics Intern",
        "company_name": "Spotify",
        "job_description": "Spotify's Content Insights team is hiring a Data Science Intern for our summer cohort. You will analyze listener engagement trends, build automated ETL pipelines using Python and Google Cloud BigQuery, and build interactive dashboards in Tableau to guide podcast and playlist curation decisions. Requirements: Enrolled in a Bachelor's or Master's program in Data Science, Statistics, Mathematics, or Computer Science graduating in late 2026 or 2027. Proficiency in SQL queries, Python data analysis libraries (pandas, NumPy, statsmodels), and experimental design principles (A/B testing).",
        "location": "Boston, MA (Hybrid)",
        "job_type": "Internship",
        "salary_stipend": "$48 / hour",
        "application_url": "https://www.lifeatspotify.com/jobs/data-science-intern-summer",
        "recruiter_email": "campus-americas@spotify.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified Corporate Careers Portal"
    },
    {
        "id": "legit-007",
        "job_title": "Associate DevOps / Cloud Engineer",
        "company_name": "Red Hat",
        "job_description": "Red Hat is looking for an Associate DevOps Engineer to help maintain our OpenShift CI/CD continuous integration pipelines. Responsibilities: Automate multi-cloud infrastructure provisioning using Ansible and Terraform, configure monitoring and alerting with Prometheus and Grafana, and maintain Docker container registries. Desired skills: Foundational knowledge of Linux administration, shell scripting (Bash), container concepts (Podman/Docker), and Git workflows. Great team player with dedication to open source community development.",
        "location": "Raleigh, NC (On-site)",
        "job_type": "Full-time",
        "salary_stipend": "$85,000 - $95,000 / year",
        "application_url": "https://careers-redhat.icims.com/jobs/devops-assoc",
        "recruiter_email": "talentteam@redhat.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified iCIMS Enterprise ATS"
    },
    {
        "id": "legit-008",
        "job_title": "Technical Content & Documentation Intern",
        "company_name": "MongoDB",
        "job_description": "MongoDB is seeking a Technical Writing Intern to collaborate with our Developer Relations and Product Documentation squads. You will create developer tutorials, verify sample code snippets in Python, JavaScript, and Java, and help improve API documentation for our MongoDB Atlas cloud platform. Requirements: Enrolled in Computer Science, Technical Writing, English, or related degree. Clear written communication skills, basic programming knowledge, and familiarity with Markdown, Git, and GitHub pull requests.",
        "location": "Remote (US)",
        "job_type": "Internship",
        "salary_stipend": "$38 / hour",
        "application_url": "https://www.mongodb.com/careers/internships/technical-writing",
        "recruiter_email": "university-hiring@mongodb.com",
        "is_fraudulent": 0,
        "fraud_category": "legitimate",
        "reference_source": "Verified Corporate Careers Portal"
    },

    # --- FRAUDULENT / SCAM POSTINGS (Label: 1) ---
    {
        "id": "scam-001",
        "job_title": "Remote Data Entry Clerk - Immediate Joining",
        "company_name": "Apex Global Logistics Corp",
        "job_description": "URGENT REQUIREMENT: Work from home as our Remote Data Entry Clerk. Earn $45 to $65 per hour just doing simple copy paste, email handling, and spreadsheet updating. No previous experience or degree required! 100% Guaranteed selection without interview! Limited slots remaining. Selected candidates must pay a refundable security deposit of $150 for your company-provided MacBook laptop and software package via Bitcoin or Zelle before onboarding can begin. Contact hiring manager on Telegram @ApexManager.",
        "location": "Remote / Anywhere",
        "job_type": "Part-time",
        "salary_stipend": "$65 / hour ($1,200 per day possible)",
        "application_url": "https://tinyurl.com/apex-jobs-2026",
        "recruiter_email": "apexglobal.hiring.manager77@gmail.com",
        "is_fraudulent": 1,
        "fraud_category": "upfront_fee_and_equipment_deposit",
        "reference_source": "FTC Job Scam Alert Case Archive"
    },
    {
        "id": "scam-002",
        "job_title": "Google Cloud Support Intern - Direct Hiring",
        "company_name": "Google LLC",
        "job_description": "Google is directly hiring 50 Summer Interns for Cloud Support. Instant offer letter! No technical test or coding interview required. All college students qualify. Selected candidates will receive a monthly stipend of Rs. 95,000 plus work from home perks. To confirm your seat and generate your official Google Employee Badge, you must transfer a registration and background verification fee of Rs. 2,999 to our authorized HR coordinator within 2 hours. Send confirmation screenshot on WhatsApp.",
        "location": "Bangalore / Remote",
        "job_type": "Internship",
        "salary_stipend": "Rs. 95,000 / month guaranteed",
        "application_url": "https://careers-google-verify.xyz/apply",
        "recruiter_email": "google.hr.recruitment.india@gmail.com",
        "is_fraudulent": 1,
        "fraud_category": "impersonation_and_registration_fee",
        "reference_source": "University Career Center Warning Bulletin"
    },
    {
        "id": "scam-003",
        "job_title": "Virtual Assistant & Crypto Transaction Specialist",
        "company_name": "Summit Horizon Ventures",
        "job_description": "Looking for honest remote assistants to process daily cryptocurrency transactions and vendor orders. Daily payout of $300 to $600 directly to your account. Duties: You will receive customer funds into your personal bank account or crypto wallet, convert them to USDT or Bitcoin, and forward them to designated addresses. Requirements: Must have an active bank account, provide your bank account details and online login verification for payroll setup. No resume needed. Chat with our supervisor immediately on Telegram.",
        "location": "Remote",
        "job_type": "Remote",
        "salary_stipend": "$3,000 / week",
        "application_url": "https://t.me/summit_crypto_hr",
        "recruiter_email": "hiring.summitventures@yahoo.com",
        "is_fraudulent": 1,
        "fraud_category": "money_mule_and_banking_harvesting",
        "reference_source": "FBI IC3 Warning - Wire Fraud Schemes"
    },
    {
        "id": "scam-004",
        "job_title": "HR Trainee & Payroll Data Specialist",
        "company_name": "Amazon Fulfillment Services",
        "job_description": "Congratulations! You have been shortlisted for Amazon HR Trainee Position. Urgent joining tomorrow! High salary Rs. 75,000 per month with zero experience. Before sending your contract, we require your Aadhaar card front and back, PAN card, and netbanking account details with OTP verification to test direct deposit readiness. Fill out our free application form immediately. Offer expires in 30 minutes if you do not submit your credentials.",
        "location": "Hyderabad / Remote",
        "job_type": "Full-time",
        "salary_stipend": "Rs. 75,000 / month",
        "application_url": "https://docs.google.com/forms/d/e/1FAIpQLScamExample/viewform",
        "recruiter_email": "amazon.recruiter.hr786@outlook.com",
        "is_fraudulent": 1,
        "fraud_category": "credential_phishing_and_urgency",
        "reference_source": "Consumer Protection Incident Database"
    },
    {
        "id": "scam-005",
        "job_title": "Online SMS Sending & Captcha Solver",
        "company_name": "FastCash Mobile Marketing",
        "job_description": "Earn Rs. 2,000 to Rs. 5,000 daily working 1 hour from your Android smartphone! Simply copy promotional SMS and paste them into customer groups. 100% genuine guaranteed income for housewives and students. Mandatory registration fee Rs. 1,499 for software activation key and training manual. Fee is 100% refundable after 7 days. Pay immediately via PhonePe or Google Pay to start earning today.",
        "location": "Work From Home",
        "job_type": "Part-time",
        "salary_stipend": "Rs. 60,000 - Rs. 90,000 / month",
        "application_url": "https://fastcash-jobs.top/register",
        "recruiter_email": "fastcash.support@mail.com",
        "is_fraudulent": 1,
        "fraud_category": "task_scam_and_activation_fee",
        "reference_source": "Cyber Crime Portal Advisory"
    },
    {
        "id": "scam-006",
        "job_title": "Microsoft IT Support Associate - Direct Placement",
        "company_name": "Microsoft Corporation",
        "job_description": "Direct recruitment drive for Microsoft Global Support. Guaranteed appointment letter without interview! High compensation package: $8,500 monthly. Candidates must purchase their certified workstation from our authorized third-party vendor before starting training. Send money via wire transfer or Apple gift cards to vendor billing department. Once receipt is uploaded, Microsoft laptop will be couriered to your home address.",
        "location": "Redmond, WA / Remote",
        "job_type": "Full-time",
        "salary_stipend": "$8,500 / month",
        "application_url": "https://bit.ly/microsoft-direct-hire-2026",
        "recruiter_email": "microsoft.recruitment.team99@proton.me",
        "is_fraudulent": 1,
        "fraud_category": "vendor_equipment_and_gift_card_fraud",
        "reference_source": "Better Business Bureau Scam Tracker"
    },
    {
        "id": "scam-007",
        "job_title": "Junior Python Developer - Instant Placement",
        "company_name": "Infosys BPM",
        "job_description": "Selected without interview! We have 25 open seats for freshers in Python programming. Package: 12 LPA. To finalize offer letter and schedule onboarding, candidates must pay Rs. 4,500 security deposit for company ID and training documentation kit. Limited slots remaining! Pay today to block your employee code or offer will be transferred to next applicant.",
        "location": "Pune / Remote",
        "job_type": "Full-time",
        "salary_stipend": "12,00,000 INR per annum",
        "application_url": "https://infosys-careers.top/apply",
        "recruiter_email": "infosys.hr.onboarding@gmail.com",
        "is_fraudulent": 1,
        "fraud_category": "campus_placement_fee_scam",
        "reference_source": "College Placement Cell Warning Advisory"
    },
    {
        "id": "scam-008",
        "job_title": "Executive Personal Assistant to CEO",
        "company_name": "Global Trade Alliance",
        "job_description": "Looking for a dedicated virtual assistant. We will mail you a cashier check of $4,500. Deposit it into your personal bank account, keep $600 as your first week salary, and wire the remaining $3,900 via MoneyGram or Bitcoin to our office equipment supplier. Once completed, your regular employment begins. Chat with CEO via Skype chat or Telegram.",
        "location": "Remote",
        "job_type": "Part-time",
        "salary_stipend": "$600 / week",
        "application_url": "https://t.me/ceotradealliance",
        "recruiter_email": "ceo.office.desk@hotmail.com",
        "is_fraudulent": 1,
        "fraud_category": "fake_check_and_wire_fraud",
        "reference_source": "USPS Postal Inspection Service Fraud Notice"
    }
]

def ensure_dataset_exists() -> Path:
    """Ensures benchmark dataset is stored as JSON file."""
    data_dir = settings.DATA_DIR
    data_dir.mkdir(parents=True, exist_ok=True)
    json_path = settings.DATASET_PATH
    if not json_path.exists():
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(BENCHMARK_DATA, f, indent=2)
    return json_path

def load_benchmark_records() -> List[Dict[str, Any]]:
    """Loads benchmark records from disk."""
    json_path = ensure_dataset_exists()
    with open(json_path, "r", encoding="utf-8") as f:
        return json.load(f)
