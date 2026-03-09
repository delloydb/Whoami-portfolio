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
                card.style.display = 'flex';  // Ensure card uses flex
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

// Complete project data for all cards
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
        image: "images/comingsoon.jpg",
        links: {
            live: "#",
            github: "#"
        }
    },
    "property-sales-site": {
        title: "Property Sales Site",
        description: "A real estate project built for property sales. Features modern design and seamless user experience for listing and browsing properties.",
        technologies: ["HTML", "JavaScript", "CSS"],
        features: [
            "Property listing management",
            "Automated contact form handling",
            "Responsive design for mobile and desktop",
            "Search and filter functionality"
        ],
        image: "images/project-realestate.png",
        links: {
            live: "https://delloydb.github.io/propertytech-landing-page/",
            github: "https://github.com/delloydb/propertytech-landing-page"
        }
    },
    "distributed-key-value-store": {
        title: "Distributed Key-Value Store",
        description: "A highly available, consistent key-value storage system implementing the RAFT consensus algorithm. Designed for fault tolerance and scalability.",
        technologies: ["Go", "gRPC", "Docker", "Raft"],
        features: [
            "RAFT consensus for strong consistency",
            "Automatic leader election and failover",
            "gRPC-based communication",
            "Dockerized deployment"
        ],
        image: "images/comingsoon.jpg",
        links: {
            live: "#",
            github: "#"
        }
    },
    "uiux-design-portfolio": {
        title: "UI/UX Design Portfolio",
        description: "A collection of UI/UX design projects and case studies showcasing user-centered design processes, wireframes, prototypes, and final interfaces.",
        technologies: ["Figma", "Adobe XD", "Sketch", "InVision"],
        features: [
            "Interactive prototypes",
            "User journey maps",
            "Design system documentation",
            "Usability testing results"
        ],
        image: "images/project-portfolio.png",
        links: {
            live: "https://www.figma.com/design/GClFNvz1ZDJ3Kh01AjfzYS/SHERIFF?node-id=0-1&t=pxXx3H3T7VadNzRc-1",
            github: "https://www.figma.com/design/GClFNvz1ZDJ3Kh01AjfzYS/SHERIFF?node-id=0-1&t=pxXx3H3T7VadNzRc-1"
        }
    },
    "digital-time-capsule": {
        title: "Digital Time Capsule",
        description: "A superstitious project built for past life reservations of epic memories. Users can create digital time capsules to preserve moments for future discovery.",
        technologies: ["HTML", "JavaScript", "CSS", "Firebase"],
        features: [
            "Memory reservation system",
            "User authentication and profiles",
            "Interactive timeline of events",
            "Encrypted storage"
        ],
        image: "images/project-capsule.png",
        links: {
            live: "https://delloydb.github.io/project-capsule/",
            github: "https://github.com/delloydb/project-capsule"
        }
    },
    "fruiti-lab": {
        title: "Fruiti Lab",
        description: "A fun and interactive project for exploring the world of fruits. Learn about different fruits, their nutritional values, and enjoy visualizations.",
        technologies: ["HTML", "JavaScript", "CSS", "D3.js"],
        features: [
            "Fruit information database",
            "Interactive fruit visualization",
            "Nutritional value comparison charts",
            "Search and filter by properties"
        ],
        image: "images/fruiti-lab.png",
        links: {
            live: "https://delloydb.github.io/fruitilab-main/",
            github: "https://github.com/delloydb/fruitilab-main"
        }
    }
};

// Open modal when project card is clicked (using data-project-id)
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking on links
        if (!e.target.closest('.project-links')) {
            const projectId = card.dataset.projectId;
            const project = projectsData[projectId];
            if (project) {
                openModal(project);
            } else {
                console.warn('No data found for project:', projectId);
            }
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
                <a href="${project.links.live}" class="btn-primary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="${project.links.github}" class="btn-secondary" target="_blank" rel="noopener noreferrer">
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

// Animate project cards on scroll (already handled in CSS, but keep for older browsers)
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1, rootMargin: "50px" });

projectCards.forEach(card => {
    // Set initial state if not already set by CSS
    if (!card.style.opacity) {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    }
    projectObserver.observe(card);
});