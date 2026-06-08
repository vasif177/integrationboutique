// Integration Boutique - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe process steps
    document.querySelectorAll('.process-step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate capability bars
    const capabilityBars = document.querySelectorAll('.capability-fill');
    const capabilityObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    capabilityBars.forEach(bar => {
        capabilityObserver.observe(bar);
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        statsObserver.observe(stats[0].parentElement.parentElement);
    }

    function animateStats() {
        stats.forEach(stat => {
            const text = stat.textContent;
            const isPercentage = text.includes('%');
            const isPlusSign = text.includes('+');
            const number = parseInt(text.replace(/[^0-9]/g, ''));

            let current = 0;
            const increment = number / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(counter);
                }

                let displayValue = Math.floor(current);
                if (isPercentage) {
                    displayValue += '%';
                } else if (isPlusSign) {
                    displayValue += '+';
                }

                stat.textContent = displayValue;
            }, stepTime);
        });
    }

    // Form Validation and Submission (Netlify Forms)
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const service = document.getElementById('service').value;

            if (!firstName || !lastName || !email || !company || !service) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Update hidden subject field with company name and service
            const subjectField = document.getElementById('formSubject');
            subjectField.value = `🎯 New Consultation: ${company} - ${service}`;

            // Show submitting state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Encode form data for Netlify
            const formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                showNotification('Thank you! Your consultation request has been sent. We\'ll be in touch within 24 hours.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            })
            .catch((error) => {
                console.error('Error:', error);
                showNotification('There was an error submitting the form. Please try again or email us directly at connect@integrationboutique.com', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${type === 'success' ? '#00C853' : '#FF5252'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 24px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                animation: slideDown 0.3s ease;
            }

            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(8px, 8px);
            }

            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');

        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Integration diagram animation
    const diagramNodes = document.querySelectorAll('.diagram-node.satellite');
    diagramNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.5}s`;
    });

    // Add hover effect to connector badges
    const connectorBadges = document.querySelectorAll('.connector-badge');
    connectorBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Lazy load capability chart animations
    const capabilityChart = document.querySelector('.capability-chart');
    if (capabilityChart) {
        const chartObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        capabilityChart.style.opacity = '1';
                        capabilityChart.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        }, { threshold: 0.3 });

        capabilityChart.style.opacity = '0';
        capabilityChart.style.transform = 'translateY(30px)';
        capabilityChart.style.transition = 'all 0.8s ease';
        chartObserver.observe(capabilityChart);
    }

    // Track scroll depth for analytics (placeholder)
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
        if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;

            // Track milestones
            if (maxScroll > 25 && maxScroll < 30) {
                console.log('User reached 25% of page');
            } else if (maxScroll > 50 && maxScroll < 55) {
                console.log('User reached 50% of page');
            } else if (maxScroll > 75 && maxScroll < 80) {
                console.log('User reached 75% of page');
            } else if (maxScroll > 95) {
                console.log('User reached bottom of page');
            }
        }
    });

    // Add focus states for accessibility
    document.querySelectorAll('a, button, input, select, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(0, 160, 223, 0.5)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('Integration Boutique website loaded successfully!');
});
