// Sample data for alerts
const alertsData = {
    all: [
        {
            category: 'health',
            title: 'Viral "Miracle Cure" Claims Spread on Facebook',
            description: 'A viral post claims a common household item cures multiple diseases. Health experts warn this is misleading.',
            tips: 'Check claims against WHO, DOH, and verified medical sources. Be skeptical of miracle cures.',
            date: '2 days ago'
        },
        {
            category: 'politics',
            title: 'Election Result Misquote Circulating',
            description: 'Altered quote attributed to government official has been shared 100k times across social media.',
            tips: 'Always verify quotes from primary sources. Check official government statements.',
            date: '1 day ago'
        },
        {
            category: 'finance',
            title: 'Investment Scheme Pyramid Promise',
            description: 'Scam scheme promising 300% returns within 30 days targeting Filipino investors.',
            tips: 'Legitimate investments never guarantee returns. Be wary of "too good to be true" offers.',
            date: '3 days ago'
        },
        {
            category: 'tech',
            title: 'AI Deepfake Video of Celebrity',
            description: 'AI-generated video of celebrity fake endorsement spreading on TikTok and YouTube.',
            tips: 'Check for signs of deepfakes: unnatural eye movements, audio sync issues, lighting inconsistencies.',
            date: '4 days ago'
        },
        {
            category: 'health',
            title: 'COVID Vaccine Side Effect Exaggeration',
            description: 'Cherry-picked health data presented out of context to make vaccines appear dangerous.',
            tips: 'Look for complete data, not isolated incidents. Check context and timeframes.',
            date: '5 days ago'
        },
        {
            category: 'politics',
            title: 'Manipulated Photo of Political Event',
            description: 'Crowd size image edited and reposted with false claims about attendance.',
            tips: 'Use reverse image search. Look for inconsistencies in shadows and lighting.',
            date: '6 days ago'
        }
    ]
};

// Educational content
const eduContent = {
    all: [
        {
            category: 'spotting',
            title: 'How to Spot Fake News in 5 Steps',
            description: 'Learn the essential techniques to identify misinformation before sharing',
            duration: '5 min read'
        },
        {
            category: 'sources',
            title: 'Evaluating News Sources',
            description: 'Understanding credibility indicators and checking author credentials',
            duration: '8 min read'
        },
        {
            category: 'social',
            title: 'Social Media Manipulation Tactics',
            description: 'Common tricks used by scammers and how to protect yourself',
            duration: '7 min read'
        },
        {
            category: 'verification',
            title: 'Fact-Checking Tools Guide',
            description: 'Your toolkit for verifying claims and cross-checking information',
            duration: '10 min read'
        },
        {
            category: 'spotting',
            title: 'Recognizing Deepfakes',
            description: 'Technical signs that indicate a video or image has been manipulated',
            duration: '6 min read'
        },
        {
            category: 'sources',
            title: 'Reading Beyond the Headline',
            description: 'Why context matters and how to read full articles critically',
            duration: '4 min read'
        }
    ]
};

// Verification results database
const verificationResults = {
    'president signs new education law': {
        status: 'true',
        explanation: 'This news item matches recent verified reports from official government sources and major credible news outlets.',
        sources: 'Official Government Portal, GMA News, ABS-CBN',
        category: 'Politics & Government',
        confidence: 94,
        date: '2024-11-16'
    },
    'local celebrity tests positive': {
        status: 'false',
        explanation: 'No credible evidence found. This appears to be baseless rumor spread on social media without verification.',
        sources: 'Celebrity Official Statements',
        category: 'Entertainment & Celebrity',
        confidence: 88,
        date: '2024-11-16'
    },
    'breaking: new vaccine side effect discovered': {
        status: 'partial',
        explanation: 'Some vaccine side effects are documented, but claims are often exaggerated. Always consult health authorities.',
        sources: 'WHO, FDA, DOH Philippines',
        category: 'Health & Science',
        confidence: 76,
        date: '2024-11-16'
    }
};

// Page navigation
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

    window.scrollTo(0, 0);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchPage(this.dataset.page);
        });
    });

    renderAlerts('all');
    renderEducation('all');

    document.getElementById('reportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitReport();
    });
});

// Verify news
function verifyNews() {
    const input = document.getElementById('newsInput').value.trim().toLowerCase();
    if (!input) {
        alert('Please enter a news headline or link');
        return;
    }
    const result = verificationResults[input] || generateRandomResult(input);
    displayResult(input, result);
}

function testVerify(text) {
    document.getElementById('newsInput').value = text;
    verifyNews();
}

function generateRandomResult(text) {
    const statuses = ['true', 'false', 'partial'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return {
        status: status,
        explanation: `Analysis of "${text}" indicates ${status === 'true' ? 'credible information' : status === 'false' ? 'likely misinformation' : 'partially accurate information'} based on available sources.`,
        sources: 'Multiple verified sources',
        category: 'General News',
        confidence: 75 + Math.random() * 20,
        date: new Date().toISOString().split('T')[0]
    };
}

function displayResult(article, result) {
    const container = document.getElementById('resultsContainer');

    document.getElementById('submittedArticle').textContent = article;

    const badge = document.getElementById('resultBadge');
    badge.className = 'result-badge ' + result.status;
    badge.textContent = result.status.toUpperCase();

    const statusText = result.status === 'true' ? 'Verified as True' :
        result.status === 'false' ? 'Likely False' : 'Partially True';
    document.getElementById('resultStatus').textContent = statusText;
    document.getElementById('resultExplanation').textContent = result.explanation;

    document.getElementById('sources').textContent = result.sources;
    document.getElementById('category').textContent = result.category;
    document.getElementById('lastUpdated').textContent = result.date;

    const confidence = Math.round(result.confidence);
    document.getElementById('confidenceScore').textContent = confidence + '%';
    document.getElementById('confidenceFill').style.width = confidence + '%';

    container.classList.remove('hidden');
    setTimeout(() => container.scrollIntoView({ behavior: 'smooth' }), 100);
}

// Alerts rendering
function renderAlerts(filter) {
    const grid = document.getElementById('alertsGrid');
    const data = filter === 'all' ? alertsData.all : alertsData.all.filter(a => a.category === filter);

    grid.innerHTML = data.map(alert => `
        <div class="alert-card">
            <span class="alert-badge">${alert.category.toUpperCase()}</span>
            <h3>${alert.title}</h3>
            <p>${alert.description}</p>
            <div class="alert-tips">
                <strong>Tip:</strong> ${alert.tips}
            </div>
            <small style="color: var(--text-muted); margin-top: var(--spacing-md); display: block;">${alert.date}</small>
        </div>
    `).join('');
}

function filterAlerts(category) {
    document.querySelectorAll('.alert-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderAlerts(category);
}

// Education rendering
function renderEducation(filter) {
    const grid = document.getElementById('eduGrid');
    const data = filter === 'all' ? eduContent.all : eduContent.all.filter(e => e.category === filter);

    grid.innerHTML = data.map(item => `
        <div class="edu-card">
            <span class="edu-category-tag">${item.category.toUpperCase()}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div style="margin-top: var(--spacing-md); color: var(--text-muted);">📖 ${item.duration}</div>
        </div>
    `).join('');
}

function filterEdu(category) {
    document.querySelectorAll('.edu-categories .category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderEducation(category);
}

// Feedback
function toggleFeedback() {
    document.getElementById('feedbackForm').classList.toggle('hidden');
}

function submitFeedback() {
    const type = document.getElementById('feedbackType').value;
    const text = document.getElementById('feedbackText').value;

    if (!type || type === 'Select feedback type...' || !text.trim()) {
        alert('Please fill in all feedback fields');
        return;
    }

    alert('Thank you for your feedback! Our team will review it to improve our verification system.');
    toggleFeedback();
    document.getElementById('feedbackType').value = '';
    document.getElementById('feedbackText').value = '';
}

// Report
function submitReport() {
    const title = document.getElementById('reportTitle').value;
    const content = document.getElementById('reportContent').value;

    if (!title || !content) {
        alert('Please fill in all required fields');
        return;
    }

    alert('Report submitted successfully! Our team will review it within 24 hours. Thank you for helping combat misinformation.');
    document.getElementById('reportForm').reset();
}
