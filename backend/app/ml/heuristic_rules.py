import re
from typing import Dict, List, Tuple, Any

# Common free webmail domains
FREE_EMAIL_DOMAINS = {
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "proton.me", 
    "protonmail.com", "icloud.com", "aol.com", "zoho.com", "mail.com", "yandex.com"
}

# Major known enterprise companies that never recruit via free email domains
KNOWN_ENTERPRISES = [
    "google", "microsoft", "amazon", "apple", "meta", "facebook", "netflix",
    "adobe", "oracle", "cisco", "ibm", "intel", "infosys", "tcs", "tata",
    "wipro", "accenture", "cognizant", "deloitte", "pwc", "kpmg", "ey",
    "ernst & young", "goldman sachs", "jpmorgan", "morgan stanley", "salesforce"
]

# Suspicious TLDs commonly used in ephemeral scam portals
SUSPICIOUS_TLDS = {".xyz", ".top", ".tk", ".ml", ".ga", ".cf", ".gq", ".work", ".buzz", ".cam", ".rest"}

# URL shortener domains
SHORTENER_DOMAINS = {"bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "t.co", "is.gd", "ow.ly"}

def extract_domain(email_or_url: str) -> str:
    """Extract domain name safely in lowercase."""
    if not email_or_url:
        return ""
    text = email_or_url.strip().lower()
    # If email
    if "@" in text:
        parts = text.split("@")
        return parts[-1].strip().split("/")[0]
    # If URL
    text = re.sub(r"^https?://", "", text)
    domain = text.split("/")[0].split(":")[0]
    return domain

def evaluate_heuristics(
    job_title: str,
    company_name: str,
    job_description: str,
    location: str = "",
    job_type: str = "",
    salary_stipend: str = "",
    application_url: str = "",
    recruiter_email: str = ""
) -> Tuple[float, List[Dict[str, Any]], List[Dict[str, str]], List[str]]:
    """
    Evaluates rule-based heuristic risk signals.
    Returns:
        rule_score (0-100),
        warning_signs (list of structured warnings),
        explanations (list of explanation cards),
        recommendations (list of practical steps)
    """
    warning_signs: List[Dict[str, Any]] = []
    explanations: List[Dict[str, str]] = []
    recommendations: List[str] = []

    combined_text = f"{job_title} {job_description} {salary_stipend}".lower()
    comp_lower = company_name.strip().lower()
    score_acc = 0.0

    # 1. Registration / Upfront Fees (Critical risk: 35 points)
    fee_patterns = [
        (r"(registration|processing|application|training|onboarding|documentation)\s+fee", "Upfront Processing or Registration Fee"),
        (r"(refundable|security)\s+deposit", "Refundable or Security Deposit Request"),
        (r"(pay|transfer|deposit|send)\s+(money|inr|usd|\$|rs\.?|cash|funds)\s+to\s+apply", "Payment Required to Apply"),
        (r"buy\s+(your\s+own\s+)?(equipment|laptop|software|tools)\s+from\s+(our\s+)?vendor", "Mandatory Vendor Purchase Scheme"),
        (r"cryptocurrency|crypto|bitcoin|usdt|gift\s*card", "Cryptocurrency or Gift Card Transaction"),
    ]
    fee_found = False
    for pat, label in fee_patterns:
        match = re.search(pat, combined_text, re.IGNORECASE)
        if match:
            warning_signs.append({
                "code": "FEE_REQUEST",
                "category": "financial",
                "severity": "high",
                "title": label,
                "description": "Legitimate employers cover their own onboarding, training, and equipment costs. Demanding upfront payments under any label is the single strongest indicator of employment fraud.",
                "evidence": match.group(0)
            })
            fee_found = True
            break
    if fee_found:
        score_acc += 38.0
        explanations.append({
            "title": "Upfront Financial Demands",
            "impact": "High Risk (+38 pts)",
            "detail": "Legitimate recruiters never ask job applicants or interns to pay for job placement, ID cards, background checks, or equipment vendors."
        })
        recommendations.append("Never pay any registration, training, or equipment fee. Legitimate companies never charge candidates to work.")

    # 2. Banking, Credit Card or Sensitive Credential Harvesting (Critical risk: 30 points)
    bank_patterns = [
        (r"bank\s+account\s+(details|number)|credit\s+card|debit\s+card|netbanking", "Premature Banking / Card Information Request"),
        (r"(otp|pin|cvv|password|seed\s+phrase)", "Request for OTP, PIN, or Confidential Credentials"),
        (r"(aadhaar|ssn|social\s+security\s+number)\s+front\s+and\s+back", "Unnecessary Early Government ID Harvesting")
    ]
    bank_found = False
    for pat, label in bank_patterns:
        match = re.search(pat, combined_text, re.IGNORECASE)
        if match:
            warning_signs.append({
                "code": "SENSITIVE_DATA_HARVESTING",
                "category": "financial",
                "severity": "high",
                "title": label,
                "description": "Sensitive financial information like bank credentials, credit cards, or OTPs should never be requested during an application or preliminary interview stage.",
                "evidence": match.group(0)
            })
            bank_found = True
            break
    if bank_found:
        score_acc += 32.0
        explanations.append({
            "title": "Premature Sensitive Data Collection",
            "impact": "High Risk (+32 pts)",
            "detail": "Asking for banking credentials, OTPs, or credit cards prior to formal verified employment is a common identity theft or wire fraud tactic."
        })
        recommendations.append("Do not disclose bank accounts, credit card details, or OTPs on any job portal or chat application.")

    # 3. Guaranteed Placement / No Interview Tactics (20 points)
    guarantee_patterns = [
        (r"100%\s*(job\s*)?guarantee|guaranteed\s*(placement|job|selection)", "100% Guaranteed Selection Claim"),
        (r"(direct\s+selection|direct\s+joining|selected\s+without\s+interview)", "Direct Selection Without Formal Screening"),
        (r"no\s+interview\s+required", "No Interview Required"),
        (r"instant\s+(offer\s*letter|hiring)", "Instant Job Offer Without Prior Application"),
    ]
    guarantee_found = False
    for pat, label in guarantee_patterns:
        match = re.search(pat, combined_text, re.IGNORECASE)
        if match:
            warning_signs.append({
                "code": "UNREALISTIC_GUARANTEE",
                "category": "compensation",
                "severity": "high",
                "title": label,
                "description": "Real companies always conduct structured technical and HR interviews before making a hiring decision. 'Guaranteed jobs' are often used to bait candidates into paying fees.",
                "evidence": match.group(0)
            })
            guarantee_found = True
            break
    if guarantee_found:
        score_acc += 22.0
        explanations.append({
            "title": "Guaranteed Hiring Claims",
            "impact": "High Risk (+22 pts)",
            "detail": "Reputable companies evaluate skills through an interview process. Claims of direct selection without evaluation are almost always misleading."
        })
        recommendations.append("Be skeptical of unsolicited offer letters or immediate selections where no interview took place.")

    # 4. Free Webmail Domain for Established Enterprises (25 points)
    if recruiter_email:
        email_clean = recruiter_email.strip().lower()
        email_domain = extract_domain(email_clean)
        
        # Check if enterprise name is claimed with free email
        claimed_enterprise = any(ent in comp_lower for ent in KNOWN_ENTERPRISES)
        is_free_domain = email_domain in FREE_EMAIL_DOMAINS

        if claimed_enterprise and is_free_domain:
            warning_signs.append({
                "code": "ENTERPRISE_FREE_EMAIL_MISMATCH",
                "category": "contact",
                "severity": "high",
                "title": f"Enterprise Recruiter Using Free Webmail ({email_domain})",
                "description": f"The posting claims to represent '{company_name}', yet the contact email uses a generic public provider (@{email_domain}) instead of the company's verified domain.",
                "evidence": recruiter_email
            })
            score_acc += 28.0
            explanations.append({
                "title": "Company vs Recruiter Domain Mismatch",
                "impact": "High Risk (+28 pts)",
                "detail": "Major tech and enterprise companies strictly use corporate email domains (e.g. @google.com, @microsoft.com) for official recruitment correspondence."
            })
            recommendations.append(f"Verify the recruiter via the official '{company_name}' careers portal or on LinkedIn before responding to personal webmail addresses.")
        elif is_free_domain:
            # Small firm or unknown, milder flag
            warning_signs.append({
                "code": "FREE_EMAIL_DOMAIN",
                "category": "contact",
                "severity": "medium",
                "title": f"Free Email Provider Used (@{email_domain})",
                "description": f"Recruiter contact is hosted on a free domain (@{email_domain}). While small early-stage startups occasionally do this, established employers usually use custom corporate domains.",
                "evidence": recruiter_email
            })
            score_acc += 10.0
            explanations.append({
                "title": "Public Webmail Address",
                "impact": "Moderate Risk (+10 pts)",
                "detail": "Free email accounts have zero identity verification and can be created anonymously by anyone."
            })
            recommendations.append("Ask the recruiter for official corporate contact details or verify the listing on the company's official website.")

    # 5. Suspicious Chat Platforms / Off-Platform Interview Channels (18 points)
    chat_patterns = [
        (r"(telegram|telegram\s*channel|t\.me/|whatsapp\s*(group|only|chat)|signal\s*app)", "Off-Platform Chat Interview (Telegram/WhatsApp)"),
        (r"(google\s*hangouts\s*chat|wire\s*app|skype\s*chat\s*interview)", "Casual Messaging Interview Without Video/Portal"),
    ]
    chat_found = False
    for pat, label in chat_patterns:
        match = re.search(pat, combined_text, re.IGNORECASE)
        if match:
            warning_signs.append({
                "code": "SUSPICIOUS_COMMUNICATION_CHANNEL",
                "category": "contact",
                "severity": "high",
                "title": label,
                "description": "Scammers frequently redirect candidates to Telegram or WhatsApp because chats can be encrypted, auto-deleted, and accounts are disposable.",
                "evidence": match.group(0)
            })
            chat_found = True
            break
    if chat_found:
        score_acc += 20.0
        explanations.append({
            "title": "Discreet Messaging Channels",
            "impact": "High Risk (+20 pts)",
            "detail": "Professional interviews take place over verified corporate video software (Google Meet, Microsoft Teams, Zoom) or on-site, not anonymous text chats."
        })
        recommendations.append("Refuse interview or onboarding processes carried out solely via anonymous Telegram or WhatsApp text messaging.")

    # 6. Unrealistic Salary / Exaggerated Compensation (15 points)
    salary_patterns = [
        (r"(earn|make)\s+(\$|rs\.?|inr)\s*([0-9]{2,3},[0-9]{3}|\d{4,6})\s*(per|a)\s*(day|hour|week)", "Extraordinarily High Compensation for Basic Tasks"),
        (r"(data\s*entry|copy\s*paste|sms\s*sending|form\s*filling).*?(50,000|1,00,000|\$5,000|\$100\s*/\s*hr)", "High Payout for Low-Skill Data Entry"),
        (r"(stipend|salary)\s*:\s*(\$?\d{5,}|rs\.?\s*1[0-9]{5,})\s*per\s*month\s*for\s*(intern|fresher)", "Excessive Intern/Fresher Compensation Claim"),
    ]
    salary_found = False
    for pat, label in salary_patterns:
        match = re.search(pat, combined_text, re.IGNORECASE)
        if match:
            warning_signs.append({
                "code": "UNREALISTIC_COMPENSATION",
                "category": "compensation",
                "severity": "medium",
                "title": label,
                "description": "Compensation promises that significantly exceed prevailing market rates for student internships or simple data entry often serve as clickbait to lure vulnerable applicants.",
                "evidence": match.group(0)
            })
            salary_found = True
            break
    if salary_found:
        score_acc += 16.0
        explanations.append({
            "title": "Inflated Compensation Promises",
            "impact": "Moderate Risk (+16 pts)",
            "detail": "Promising thousands of dollars or six-figure stipends for beginner or part-time typing tasks is a classic scam hook."
        })
        recommendations.append("Compare the offered compensation with industry benchmark salaries on Glassdoor, Levels.fyi, or AmbitionBox.")

    # 7. Artificial Urgency and High-Pressure Language (12 points)
    urgency_patterns = [
        (r"(urgent|hurry|act\s+fast|immediate\s+joining|limited\s+slots?\s+left)", "Artificial Urgency Tactics"),
        (r"(offer\s+expires\s+in\s+\d+\s+(hours?|minutes?)|only\s+\d+\s+vacancies\s+remaining)", "Countdown / Short Expiration Window"),
        (r"(pay\s+before\s+today|slot\s+will\s+be\s+given\s+to\s+next)", "High-Pressure Reservation Deadline")
    ]
    urgency_found = False
    for pat, label in urgency_patterns:
        match = re.search(pat, combined_text, re.IGNORECASE)
        if match:
            warning_signs.append({
                "code": "ARTIFICIAL_URGENCY",
                "category": "urgency",
                "severity": "medium",
                "title": label,
                "description": "Creating artificial time pressure reduces candidate skepticism and forces impulsive decisions before they have time to verify the company.",
                "evidence": match.group(0)
            })
            urgency_found = True
            break
    if urgency_found:
        score_acc += 12.0
        recommendations.append("Take your time to conduct independent due diligence. Legitimate employers grant candidates adequate time to evaluate offers.")

    # 8. Suspicious Application URL / TLD / Free Form Check (15 points)
    if application_url:
        url_domain = extract_domain(application_url)
        
        # Check suspicious TLD
        has_suspicious_tld = any(url_domain.endswith(tld) for tld in SUSPICIOUS_TLDS)
        # Check shortener
        is_shortener = any(short in url_domain for short in SHORTENER_DOMAINS)
        # Check free form used by enterprise
        is_free_form = "docs.google.com/forms" in application_url.lower() or "forms.gle" in application_url.lower()

        if has_suspicious_tld:
            warning_signs.append({
                "code": "SUSPICIOUS_DOMAIN_TLD",
                "category": "content",
                "severity": "high",
                "title": f"Unusual or Suspicious Top-Level Domain ({url_domain})",
                "description": "The portal URL uses a top-level domain frequently associated with spam, phishing, or cheap disposable websites.",
                "evidence": application_url
            })
            score_acc += 18.0
        elif is_shortener:
            warning_signs.append({
                "code": "URL_SHORTENER_MASKING",
                "category": "content",
                "severity": "medium",
                "title": "Masked Application URL via Link Shortener",
                "description": "Using link shorteners conceals the real destination server, hiding potential phishing links or unauthorized affiliate pages.",
                "evidence": application_url
            })
            score_acc += 10.0
        elif is_free_form and any(ent in comp_lower for ent in KNOWN_ENTERPRISES):
            warning_signs.append({
                "code": "ENTERPRISE_FREE_FORM",
                "category": "content",
                "severity": "high",
                "title": "Corporate Position Using Free Google Form",
                "description": f"The post claims to be for '{company_name}', but directs applicants to an unverified Google Form rather than an ATS portal (e.g. Workday, Greenhouse, Lever).",
                "evidence": application_url
            })
            score_acc += 20.0

    # 9. Vague / Low Information Quality (8 points)
    words = job_description.strip().split()
    if len(words) < 35:
        warning_signs.append({
            "code": "VAGUE_JOB_DESCRIPTION",
            "category": "content",
            "severity": "medium",
            "title": "Very Short or Vague Job Description",
            "description": "The job description contains very few specific details regarding day-to-day responsibilities, required qualifications, reporting hierarchy, or technical toolchains.",
            "evidence": f"Only {len(words)} words provided"
        })
        score_acc += 10.0
        recommendations.append("Request a comprehensive job description detailing key deliverables, team structure, and qualifications.")

    # 10. Missing Core Details Check
    missing_fields = []
    if not location or location.strip() == "":
        missing_fields.append("Job Location / Jurisdiction")
    if not job_type or job_type.strip() == "":
        missing_fields.append("Employment Type")
    if missing_fields:
        warning_signs.append({
            "code": "INCOMPLETE_POSTING_METADATA",
            "category": "content",
            "severity": "low",
            "title": "Incomplete Posting Metadata",
            "description": f"The posting omits: {', '.join(missing_fields)}. Genuine postings generally provide transparent location and role taxonomy.",
            "evidence": ", ".join(missing_fields)
        })
        score_acc += 5.0

    # Cap rule score at 100
    rule_score = min(100.0, max(0.0, round(score_acc, 1)))

    # If clean with zero warnings, give positive feedback
    if not warning_signs:
        recommendations.append("The listing does not exhibit common red flags. Proceed through standard application channels and verify on official company pages.")

    return rule_score, warning_signs, explanations, recommendations
