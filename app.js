// E-book Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    initializeSmoothScrolling();
    initializeActiveSection();
    initializeMobileNav();
    initializeInteractiveElements();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Active section highlighting
function initializeActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial call
}

// Mobile navigation
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
        
        // Close mobile nav when clicking a link
        const navLinkElements = navLinks.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Initialize smooth scrolling for all navigation
function initializeSmoothScrolling() {
    // Handle content item clicks
    const contentItems = document.querySelectorAll('.content-item');
    contentItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.textContent.trim();
            let targetId = '';
            
            if (targetSection.includes('Cenário')) targetId = 'threats';
            else if (targetSection.includes('Anatomia')) targetId = 'anatomy';
            else if (targetSection.includes('Identificação')) targetId = 'identification';
            else if (targetSection.includes('Governança')) targetId = 'governance';
            else if (targetSection.includes('Pontuação')) targetId = 'scoring';
            else if (targetSection.includes('Protocolos')) targetId = 'protocols';
            else if (targetSection.includes('90 Dias')) targetId = 'timeline';
            else if (targetSection.includes('Casos')) targetId = 'cases';
            
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// Chart initialization
function initializeCharts() {
    createFraudChart();
}

// Fraud distribution chart
function createFraudChart() {
    const ctx = document.getElementById('fraudChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Taxa Falsa', 'Phishing Logístico', 'Leilões Falsos', 'Outros Golpes'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 14,
                            family: 'var(--font-family-base)'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Interactive elements initialization
function initializeInteractiveElements() {
    initializeAnimations();
    initializeHoverEffects();
    initializeCounterAnimation();
    initializeDetailsToggle();
    addScrollToTop();
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .content-item, .scam-card, .warning-card, .case-card, .protocol-card, .class-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Hover effects for interactive elements
function initializeHoverEffects() {
    const interactiveCards = document.querySelectorAll('.content-item, .protocol-card, .case-card, .class-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Statistics counter animation
function initializeCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract numeric value for animation
                const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                if (!isNaN(numericValue)) {
                    animateCounter(target, 0, numericValue, finalValue, 2000);
                }
                
                // Only animate once
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element, start, end, finalText, duration) {
    const startTime = performance.now();
    const isPercentage = finalText.includes('%');
    const hasRSymbol = finalText.includes('R$');
    const hasMSymbol = finalText.includes('M');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = start + (end - start) * easeOutQuart(progress);
        
        let displayValue = Math.floor(currentValue).toString();
        
        if (hasRSymbol && hasMSymbol) {
            displayValue = 'R$ ' + Math.floor(currentValue) + 'Mi';
        } else if (hasRSymbol) {
            displayValue = 'R$ ' + Math.floor(currentValue);
        } else if (isPercentage) {
            displayValue = Math.floor(currentValue) + '%';
        } else if (hasMSymbol) {
            displayValue = Math.floor(currentValue) + 'M+';
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Details toggle enhancement
function initializeDetailsToggle() {
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
        details.addEventListener('toggle', function() {
            if (this.open) {
                // Close other details in the same section
                const section = this.closest('.section');
                if (section) {
                    const otherDetails = section.querySelectorAll('details');
                    otherDetails.forEach(other => {
                        if (other !== this && other.open) {
                            other.open = false;
                        }
                    });
                }
            }
        });
    });
}

// Scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Voltar ao topo');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
}

// Timeline animation
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        if (item.querySelector('.timeline-content')) {
            const isEven = Array.from(timelineItems).indexOf(item) % 2 === 1;
            if (isEven) {
                item.style.transform = 'translateX(50px)';
            }
        }
        
        timelineObserver.observe(item);
    });
}

// Initialize timeline animation on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeTimelineAnimation, 500);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const sections = ['cover', 'contents', 'threats', 'anatomy', 'identification', 'governance', 'scoring', 'protocols', 'timeline', 'cases', 'contact'];
    const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href')?.substring(1);
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1]);
    }
});

// Print functionality
function initializePrintMode() {
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
        
        // Open all details for printing
        const detailsElements = document.querySelectorAll('details');
        detailsElements.forEach(details => {
            details.open = true;
        });
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
    });
}

document.addEventListener('DOMContentLoaded', initializePrintMode);

// Accessibility improvements
function initializeAccessibility() {
    // Add focus management
    const focusableElements = document.querySelectorAll('a, button, details, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#contents';
    skipLink.textContent = 'Pular para o conteúdo';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 20px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 10px 15px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '20px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Performance optimization - lazy load chart
function optimizePerformance() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                if (chartId === 'fraudChart') {
                    createFraudChart();
                }
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe chart container
    const chartElement = document.getElementById('fraudChart');
    if (chartElement) {
        chartObserver.observe(chartElement);
    }
}

// Form handling for contact section
function initializeContactForm() {
    const ctaButtons = document.querySelectorAll('.btn--primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize contact form handling
document.addEventListener('DOMContentLoaded', initializeContactForm);

// Global error handling
window.addEventListener('error', function(e) {
    console.warn('E-book Error:', e.message);
    // Graceful degradation - ensure basic functionality still works
});

// Utility function for smooth scrolling polyfill
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill for older browsers
        const scrollToOptions = (element, options) => {
            const startTime = performance.now();
            const startTop = element.scrollTop;
            const distance = options.top - startTop;
            const duration = 500;
            
            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = easeOutQuart(progress);
                
                element.scrollTop = startTop + distance * easeProgress;
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }
            
            requestAnimationFrame(animateScroll);
        };
        
        // Override scrollTo for older browsers
        const originalScrollTo = window.scrollTo;
        window.scrollTo = function(options) {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                scrollToOptions(document.documentElement, options);
            } else {
                originalScrollTo.apply(this, arguments);
            }
        };
    }
}

// Initialize polyfill
document.addEventListener('DOMContentLoaded', smoothScrollPolyfill);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        createFraudChart,
        initializeNavigation
    };
}