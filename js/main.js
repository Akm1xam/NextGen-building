document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    function init() {
        initParticles();
        initNavbar();
        initParallax();
        initCardTilt();
        initProjectFilter();
        initProjectModal();
        animateStats();
        initCountdown();
        initLogoAnimation();
        initSmoothScroll();
    }

    //Частицы фона
    function initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'background-particles';
        document.body.appendChild(particlesContainer);
        
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const opacity = Math.random() * 0.4 + 0.1;
            const animationDuration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            particle.style.animation = `float ${animationDuration}s ease-in-out ${delay}s infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Навигационное меню
    function initNavbar() {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Изменение навбара при скролле
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.glass-nav');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Параллакс эффекты
    function initParallax() {
        const heroImage = document.querySelector('.hero-image img');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroImage && heroContent) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(${scrollPosition * 0.3}px)`;
                heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            });
        }
    }

    // 3D эффекты для карточек
    function initCardTilt() {
        const cards = document.querySelectorAll('.glass-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Фильтрация проектов
    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-button');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length && projectCards.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.style.transform = 'scale(1)';
                    });
                    
                    this.classList.add('active');
                    this.style.transform = 'scale(1.05)';
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(20px)';
                                setTimeout(() => {
                                    card.style.display = 'block';
                                    setTimeout(() => {
                                        card.style.opacity = '1';
                                        card.style.transform = 'translateY(0)';
                                    }, 50);
                                }, 300);
                            } else {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(-20px)';
                                setTimeout(() => {
                                    card.style.display = 'none';
                                }, 300);
                            }
                        }, index * 100);
                    });
                });
            });
        }
    }

    // Модальное окно проектов
    function initProjectModal() {
        const projectDetailsButtons = document.querySelectorAll('.project-details');
        const projectModal = document.querySelector('.project-modal');
        const closeModal = document.querySelector('.close-modal');
        
        if (projectDetailsButtons.length && projectModal && closeModal) {
            projectDetailsButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const projectCard = this.closest('.project-card');
                    const projectImage = projectCard.querySelector('img').src;
                    
                    document.querySelector('.main-image').src = projectImage;
                    
                    projectModal.style.display = 'flex';
                    setTimeout(() => {
                        projectModal.style.opacity = '1';
                        document.body.style.overflow = 'hidden';
                    }, 10);
                });
            });
            
            closeModal.addEventListener('click', function() {
                projectModal.style.opacity = '0';
                setTimeout(() => {
                    projectModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === projectModal) {
                    projectModal.style.opacity = '0';
                    setTimeout(() => {
                        projectModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        }
    }

    // Анимация статистики
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.getAttribute('data-count'));
                            const duration = 2000;
                            const startTime = Date.now();
                            
                            const animate = () => {
                                const elapsed = Date.now() - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const value = Math.floor(progress * target);
                                
                                stat.textContent = value;
                                
                                if (progress < 1) {
                                    requestAnimationFrame(animate);
                                }
                            };
                            
                            animate();
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const statsSection = document.querySelector('.about-content');
            if (statsSection) {
                observer.observe(statsSection);
            }
        }
    }

    // Таймер обратного отсчета
    function initCountdown() {
        const countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        if (countdownElements.days) {
            const countdownDate = new Date();
            countdownDate.setDate(countdownDate.getDate() + 14);
            
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = countdownDate - now;
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                animateNumber(countdownElements.days, days);
                animateNumber(countdownElements.hours, hours);
                animateNumber(countdownElements.minutes, minutes);
                animateNumber(countdownElements.seconds, seconds);
                
                if (distance < 0) {
                    clearInterval(countdownTimer);
                    Object.values(countdownElements).forEach(el => {
                        el.textContent = '00';
                    });
                }
            }
            
            function animateNumber(element, newValue) {
                const current = parseInt(element.textContent);
                if (current === newValue) return;
                
                element.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    element.textContent = newValue.toString().padStart(2, '0');
                    element.style.transform = 'scale(1)';
                }, 200);
            }
            
            updateCountdown();
            const countdownTimer = setInterval(updateCountdown, 1000);
        }
    }

    // Анимация основного логотипа
    function initLogoAnimation() {
        const mainLogo = document.querySelector('.main-logo');
        
        if (mainLogo) {
            // Параллакс при скролле
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                mainLogo.style.transform = `translateY(${scrollPosition * 0.2}px) scale(1.05)`;
            });
            
            // Анимация при наведении
            mainLogo.addEventListener('mouseenter', () => {
                mainLogo.style.transform = 'scale(1.1) rotate(-5deg)';
                mainLogo.style.filter = 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.9))';
            });
            
            mainLogo.addEventListener('mouseleave', () => {
                const scrollPosition = window.pageYOffset;
                mainLogo.style.transform = `translateY(${scrollPosition * 0.2}px) scale(1.05)`;
                mainLogo.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.7))';
            });
            
            // Кнопка уведомления
            const notifyButton = document.getElementById('notify-me');
            if (notifyButton) {
                notifyButton.addEventListener('click', function() {
                    this.textContent = 'Спасибо! Мы вас уведомим';
                    this.style.backgroundColor = '#4CAF50';
                    setTimeout(() => {
                        this.textContent = 'Уведомить меня о запуске';
                        this.style.backgroundColor = '';
                    }, 3000);
                });
            }
        }
    }

    // Плавная прокрутка
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Запуск инициализации
    init();
});