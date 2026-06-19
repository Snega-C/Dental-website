/**
 * PREMIUM DENTAL CLINIC WEBSITE - JAVASCRIPT BUNDLE
 * Features: Navigation, Counters, Slider, Accordion, Lightbox, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- STICKY NAV & MOBILE MENU ---
    const header = document.querySelector('.header-wrapper');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksA = document.querySelectorAll('.nav-links a');

    // Scroll Handler for Sticky Nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });
    }

    // Close menu when link is clicked
    navLinksA.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        });
    });


    // --- FLOATING ACTIONS (Scroll to Top) ---
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- BEFORE & AFTER SLIDER ---
    const sliderInput = document.querySelector('.slider-range-input');
    const imageAfter = document.querySelector('.image-after');
    const sliderHandle = document.querySelector('.slider-handle');

    if (sliderInput && imageAfter && sliderHandle) {
        const updateSlider = (val) => {
            // Adjust clip path (Right side shows after image, Left side shows before image)
            // clip-path: polygon(X% 0, 100% 0, 100% 100%, X% 100%)
            imageAfter.style.clipPath = `polygon(${val}% 0, 100% 0, 100% 100%, ${val}% 100%)`;
            // Move handle line
            sliderHandle.style.left = `${val}%`;
        };

        sliderInput.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });

        // Initialize at 50%
        updateSlider(50);
    }


    // --- DYNAMIC SERVICES DRAWERS (Learn More) ---
    const serviceLearnBtn = document.querySelectorAll('.service-card .btn-text');

    serviceLearnBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.service-card');
            const drawer = card.querySelector('.service-drawer');
            
            if (drawer) {
                const isOpen = drawer.style.display === 'block';
                
                // Toggle display
                drawer.style.display = isOpen ? 'none' : 'block';
                btn.textContent = isOpen ? 'Learn More' : 'Read Less';
                
                // Keep the dynamic arrow indicator in text
                if (isOpen) {
                    btn.classList.remove('open');
                } else {
                    btn.classList.add('open');
                }
            }
        });
    });


    // --- STATISTICS COUNTER ---
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetNum = parseInt(el.getAttribute('data-target'), 10);
                    let currentNum = 0;
                    const duration = 1500; // ms
                    const stepTime = Math.max(Math.floor(duration / targetNum), 15);
                    
                    const counter = setInterval(() => {
                        currentNum += Math.ceil(targetNum / (duration / stepTime));
                        if (currentNum >= targetNum) {
                            el.textContent = targetNum;
                            clearInterval(counter);
                        } else {
                            el.textContent = currentNum;
                        }
                    }, stepTime);

                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => {
            counterObserver.observe(num);
        });
    }


    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (button && answer) {
            button.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other active items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', false);
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                button.setAttribute('aria-expanded', !isActive);

                if (!isActive) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });


    // --- TESTIMONIALS SLIDER ---
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        // Create dots dynamically
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
        });

        const dots = document.querySelectorAll('.slider-dot');

        const goToSlide = (index) => {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const startAutoPlay = () => {
            slideInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % slides.length;
                goToSlide(nextIndex);
            }, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(slideInterval);
            startAutoPlay();
        };

        startAutoPlay();
    }


    // --- IMAGE GALLERY LIGHTBOX ---
    const galleryThumbs = document.querySelectorAll('.gallery-thumbnail');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryThumbs.length > 0 && lightbox && lightboxImg) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const img = thumb.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || 'Lightbox View';
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Release scrolling
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }


    // --- CUSTOM TOAST NOTIFICATION ---
    const showToast = (message) => {
        // Create toast elements dynamically if not already present
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <span class="toast-success-icon">✓</span>
                <span class="toast-message"></span>
            `;
            document.body.appendChild(toast);
        }

        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('visible');

        setTimeout(() => {
            toast.classList.remove('visible');
        }, 4000);
    };


    // --- FORM VALIDATIONS & SUBMISSIONS ---
    const bookingForm = document.getElementById('bookingForm');
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    // Appointment Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check
            const name = document.getElementById('bookingName').value.trim();
            const phone = document.getElementById('bookingPhone').value.trim();
            const email = document.getElementById('bookingEmail').value.trim();
            const date = document.getElementById('bookingDate').value;
            const time = document.getElementById('bookingTime').value;
            const service = document.getElementById('bookingService').value;

            if (!name || !phone || !email || !date || !time || !service) {
                alert('Please fill out all required fields.');
                return;
            }

            // Email validation regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Success simulation
            showToast('Appointment Request Submitted! We will contact you shortly to confirm.');
            bookingForm.reset();
        });
    }

    // Newsletter Form Submission
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                showToast('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    });

    // --- SCROLL REVEAL ANIMATIONS INTERSECTION OBSERVER ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
});
