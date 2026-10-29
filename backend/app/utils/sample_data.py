from typing import List, Dict, Any

SAMPLE_JOBS: List[Dict[str, Any]] = [
    {
        "id": "sample-legit-stripe",
        "label": "Legitimate Tech Internship",
        "category": "Verified Legit",
        "expected_risk": "Low",
        "description_summary": "Authentic Software Engineering internship at Stripe with transparent requirements and corporate domain.",
        "data": {
            "job_title": "Software Engineering Intern - Infrastructure",
            "company_name": "Stripe",
            "job_description": "Join Stripe's Infrastructure Engineering team for our 12-week summer internship. You will build and scale distributed systems powering global economic infrastructure. Responsibilities include designing scalable APIs in Ruby and Go, improving observability with metrics and tracing, and collaborating with our core payments team. Requirements: Enrolled in a BS/MS program in Computer Science or related technical field, proficiency in at least one modern programming language, solid grasp of data structures and algorithms, and an eagerness to solve complex real-world distributed systems challenges.",
            "location": "San Francisco, CA (Hybrid)",
            "job_type": "Internship",
            "salary_stipend": "$58 / hour + comprehensive relocation housing",
            "application_url": "https://stripe.com/jobs/intern-infrastructure-2026",
            "recruiter_email": "university-recruiting@stripe.com"
        }
    },
    {
        "id": "scam-blatant-crypto",
        "label": "High-Risk Upfront Fee Scam",
        "category": "Blatant Scam",
        "expected_risk": "High",
        "description_summary": "Classic work-from-home scam demanding refundable laptop deposit via Bitcoin and Telegram interview.",
        "data": {
            "job_title": "Remote Data Entry Assistant - Immediate Joining",
            "company_name": "Vertex Global Business Solutions",
            "job_description": "URGENT REQUIREMENT: Work from the comfort of your home! Earn $500 per day doing simple data entry and typing. 100% Guaranteed selection without interview! Limited seats left. Selected candidates must pay a refundable security deposit of $120 for your company-provided MacBook laptop and software package via Bitcoin or wire transfer before dispatch. Chat directly with the hiring manager on Telegram @VertexHiringManager to reserve your slot now.",
            "location": "Remote / Worldwide",
            "job_type": "Part-time",
            "salary_stipend": "$500 / day ($15,000 / month)",
            "application_url": "https://tinyurl.com/vertex-remote-apply",
            "recruiter_email": "vertexglobal.hr.recruiter@gmail.com"
        }
    },
    {
        "id": "scam-enterprise-impersonation",
        "label": "Enterprise Impersonation Scheme",
        "category": "Phishing / Impersonation",
        "expected_risk": "High",
        "description_summary": "Claims to be Microsoft hiring with instant offer letter, free Gmail contact, and registration fee.",
        "data": {
            "job_title": "Microsoft Cloud Support Intern",
            "company_name": "Microsoft Corporation",
            "job_description": "Direct recruitment drive for Microsoft Global Support. Guaranteed appointment letter without interview! High package: Rs. 85,000 per month. Candidates must transfer an onboarding registration fee of Rs. 2,499 for ID card generation and security clearance to our authorized coordinator. Offer expires in 2 hours if fee is not submitted.",
            "location": "Hyderabad / Remote",
            "job_type": "Internship",
            "salary_stipend": "Rs. 85,000 / month guaranteed",
            "application_url": "https://microsoft-jobs-portal.top/register",
            "recruiter_email": "microsoft.campus.recruiter.hr@gmail.com"
        }
    },
    {
        "id": "sample-moderate-ambiguous",
        "label": "Ambiguous Early-Stage Posting",
        "category": "Moderate Risk / Vague",
        "expected_risk": "Medium",
        "description_summary": "Startup posting with minimal description, free email contact, and vague compensation.",
        "data": {
            "job_title": "Marketing & Social Media Helper",
            "company_name": "Nova Brands Digital",
            "job_description": "Looking for energetic student interns to help grow our Instagram and TikTok channels. Post content daily and reply to direct messages. Must be hard working. Commission and stipend based on performance. Work anytime you want.",
            "location": "",
            "job_type": "Internship",
            "salary_stipend": "Performance based bonus",
            "application_url": "",
            "recruiter_email": "novabrands2026@gmail.com"
        }
    }
]
