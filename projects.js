// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        
        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');

// Sample project data (would typically come from an API in real implementation)
const projectsData = {
    "neural-network-optimizer": {
        title: "Neural Network Optimizer",
        description: "A comprehensive framework for optimizing deep learning models that achieves 40% faster inference times without sacrificing accuracy. Implements novel pruning and quantization techniques.",
        technologies: ["Python", "TensorFlow", "CUDA", "ONNX Runtime"],
        features: [
            "Layer-wise pruning algorithms",
            "Dynamic quantization for GPU/CPU",
            "Automated benchmarking suite",
            "Visualization tools for model analysis"
        ],
        image: "images/project-ai-optimization.jpg",
        links: {
            live: "#",
            github: "#"
        }
    },

        "Property Sales Site": {
        title: "Property Sales Site",
        description: "A real estate project built for property sales",
        technologies: ["Html", "JavaScript", "CSS"],
        features: [
            "Real estate listing management",
            "Automated contact form handling",
            "Responsive design for mobile and desktop"
        ],
        image: "images/project-realestate.png",
        links: {
            live: "https://delloydb.github.io/propertytech-landing-page/",
            github: "https://github.com/delloydb/propertytech-landing-page"
        }
    },

        "Digital Time Capsule": {
        title: "Digital Time Capsule",
        description: "A superstitious project built for past life reservations of epic memories",
        technologies: ["Html", "JavaScript", "CSS"],
        features: [
            "Memory reservation system",
            "User authentication and profile management",
            "Interactive timeline of past life events"
        ],
        image: "images/project-capsule.png",
        links: {
            live: "https://delloydb.github.io/project-capsule/",
            github: "https://github.com/delloydb/project-capsule"
        }
    },
    // Other projects would follow same structure
};

// Open modal when project card is clicked
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking on links
        if (!e.target.closest('.project-links')) {
            const projectTitle = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
            openModal(projectsData[projectTitle] || projectsData['Property Sales Site']);
        }
    });
});

function openModal(project) {
    const modalBody = document.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="modal-details">
            <h2>${project.title}</h2>
            <p class="modal-description">${project.description}</p>
            
            <div class="modal-features">
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feat => `<li>${feat}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-tech">
                <h3>Technologies</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-links">
                <a href="${project.links.live}" class="btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="${project.links.github}" class="btn-secondary" target="_blank">
                    <i class="fab fa-github"></i> View Code
                </a>
            </div>
        </div>
    `;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Close when clicking outside modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Animate project cards on scroll
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s, transform 0.5s";
    projectObserver.observe(card);
});
