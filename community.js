// Discussion Forum Functionality
const newTopicBtn = document.getElementById('newTopicBtn');
const topicForm = document.getElementById('topicForm');
const cancelTopic = document.getElementById('cancelTopic');
const discussionForm = document.getElementById('discussionForm');
const discussionThreads = document.getElementById('discussionThreads');

// Toggle Topic Form Visibility
newTopicBtn.addEventListener('click', () => {
    topicForm.classList.remove('hidden');
    newTopicBtn.classList.add('hidden');
});

cancelTopic.addEventListener('click', () => {
    topicForm.classList.add('hidden');
    newTopicBtn.classList.remove('hidden');
    discussionForm.reset();
});

// Form Submission
discussionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('topicTitle').value;
    const category = document.getElementById('topicCategory').value;
    const content = document.getElementById('topicContent').value;
    
    // Create new thread card with modern structure
    const newThread = document.createElement('div');
    newThread.className = 'thread-card';
    newThread.setAttribute('data-category', category);
    newThread.innerHTML = `
        <div class="thread-avatar">
            <img src="https://i.pravatar.cc/40?u=${Date.now()}" alt="Your avatar">
        </div>
        <div class="thread-content">
            <div class="thread-header">
                <span class="thread-category ${category}">${getCategoryName(category)}</span>
                <h3>${escapeHTML(title)}</h3>
            </div>
            <p class="thread-preview">${escapeHTML(content.substring(0, 100))}${content.length > 100 ? '...' : ''}</p>
            <div class="thread-meta">
                <span class="thread-author"><i class="fas fa-user-circle"></i> You • Just now</span>
                <span class="thread-stats"><i class="fas fa-comment"></i> 0 replies</span>
                <span class="thread-stats"><i class="fas fa-eye"></i> 1 view</span>
            </div>
        </div>
    `;
    
    // Prepend new thread
    discussionThreads.prepend(newThread);
    
    // Reset and hide form
    discussionForm.reset();
    topicForm.classList.add('hidden');
    newTopicBtn.classList.remove('hidden');
    
    // Animate new thread
    setTimeout(() => {
        newThread.style.opacity = '1';
        newThread.style.transform = 'translateY(0)';
    }, 10);
});

// Helper: escape HTML to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"]/g, function(match) {
        if (match === '&') return '&amp;';
        if (match === '<') return '&lt;';
        if (match === '>') return '&gt;';
        if (match === '"') return '&quot;';
        return match;
    });
}

function getCategoryName(category) {
    const categories = {
        'general': 'General',
        'ai': 'AI',
        'webdev': 'Web',
        'algorithms': 'Algorithms'
    };
    return categories[category] || 'General';
}

// Animate Thread Cards on Load
const threadCards = document.querySelectorAll('.thread-card');
threadCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// Coding Challenge Interactions
const challengeCards = document.querySelectorAll('.challenge-card');
challengeCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-secondary')) {
            // In a real app, this would navigate to challenge details
            console.log('Opening challenge:', card.querySelector('h3').textContent);
        }
    });
});

// Live Code Collaboration
const joinSessionBtn = document.getElementById('joinSessionBtn');
const liveCodeBlock = document.getElementById('liveCodeBlock');
const onlineCountSpan = document.getElementById('onlineCount');

// Simulate live editing (in real app would use WebSockets)
joinSessionBtn.addEventListener('click', () => {
    joinSessionBtn.innerHTML = '<i class="fas fa-network-wired"></i> Connected';
    joinSessionBtn.classList.remove('btn-primary');
    joinSessionBtn.classList.add('btn-connected');
    
    // Update online count
    onlineCountSpan.textContent = '6';
    
    // Make code block editable
    liveCodeBlock.setAttribute('contenteditable', 'true');
    liveCodeBlock.focus();
    
    // Simulate other users typing
    setTimeout(simulateCollaboration, 3000);
});

function simulateCollaboration() {
    const codeExamples = [
        '\n\n// Example from collaborator:\nconst optimize = (model) => {\n  // Prune small weights\n  return model.compressed();\n};',
        '\n\n/* Sarah\'s suggestion:\nUse quantization for \nfurther size reduction */',
        '\n\n// Debug tip:\nconsole.log("Layer sizes:", model.layers.map(l => l.size));'
    ];
    
    const randomCode = codeExamples[Math.floor(Math.random() * codeExamples.length)];
    liveCodeBlock.textContent += randomCode;
    
    // Keep cursor at end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(liveCodeBlock);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

// Simple syntax highlighting simulation (just for demo)
function applySyntaxHighlighting() {
    // In production, use Prism.js or similar.
    // This is a very basic placeholder.
}

// Periodically update "online" count to simulate activity
setInterval(() => {
    if (joinSessionBtn.classList.contains('btn-connected')) {
        const current = parseInt(onlineCountSpan.textContent, 10);
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newCount = Math.max(1, current + change);
        onlineCountSpan.textContent = newCount;
    }
}, 5000);