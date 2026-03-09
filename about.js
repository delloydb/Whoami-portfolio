// Bio Toggle Functionality
const bioBtns = document.querySelectorAll('.bio-btn');
const professionalBio = document.getElementById('professionalBio');
const personalBio = document.getElementById('personalBio');

bioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        bioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding bio
        const bioType = btn.dataset.bio;
        if (bioType === 'professional') {
            professionalBio.classList.remove('hidden');
            personalBio.classList.add('hidden');
        } else {
            professionalBio.classList.add('hidden');
            personalBio.classList.remove('hidden');
        }
    });
});

// Skill meters - create bar structure and animate on view
const skillMeters = document.querySelectorAll('.skill');

// Add skill-bar span inside each skill
skillMeters.forEach(skill => {
    const bar = document.createElement('span');
    bar.className = 'skill-bar';
    skill.appendChild(bar);
});

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skill = entry.target;
            const level = skill.dataset.level;
            skill.style.setProperty('--skill-level', `${level}%`);
            skill.classList.add('animate');
            skillObserver.unobserve(skill);
        }
    });
}, observerOptions);

skillMeters.forEach(skill => {
    skillObserver.observe(skill);
});

// Optional: Animate certification cards on scroll (simple fade-in)
const certCards = document.querySelectorAll('.badge-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

certCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    cardObserver.observe(card);
});

// Also observe interest cards
const interestCards = document.querySelectorAll('.interest-card');
interestCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    setTimeout(() => {
        cardObserver.observe(card);
    }, index * 100);
});