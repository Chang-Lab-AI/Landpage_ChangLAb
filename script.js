document.addEventListener('DOMContentLoaded', () => {
    // 0. Cache Busting for Images (Helps refresh images when replaced)
    const refreshImages = () => {
        const images = document.querySelectorAll('img');
        const timestamp = new Date().getTime();
        images.forEach(img => {
            const currentSrc = img.src.split('?')[0];
            img.src = `${currentSrc}?t=${timestamp}`;
        });
    };
    // Tự động làm mới ảnh mỗi khi tải trang
    refreshImages();

    // 1. Accordion Logic for Journey Section
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const mainNav = document.querySelector('.main-nav');
                if (mainNav) mainNav.classList.remove('active');

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2.5 Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle button icon
            mobileMenuBtn.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // 3. AI Slider Logic
    const slider = document.getElementById('aiSlider');
    const slides = document.querySelectorAll('.ai-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots automatically based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // 4. Simple Comment Interaction (Frontend Only)
    const commentBtn = document.querySelector('.comment-btn');
    const commentInput = document.querySelector('.comment-input');
    const commentsDisplay = document.getElementById('comments-display');

    if (commentBtn && commentInput && commentsDisplay) {
        commentBtn.addEventListener('click', () => {
            const text = commentInput.value.trim();

            if (text) {
                // Remove placeholder if exists
                const placeholder = commentsDisplay.querySelector('.placeholder-text');
                if (placeholder) {
                    placeholder.remove();
                }

                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment-item';
                commentDiv.style.background = 'rgba(255, 255, 255, 0.05)';
                commentDiv.style.padding = '15px';
                commentDiv.style.borderRadius = '10px';
                commentDiv.style.marginBottom = '15px';
                commentDiv.style.borderLeft = '4px solid #FFD60A';

                commentDiv.innerHTML = `
                    <p style="font-weight: 600; margin-bottom: 5px;">Người xem</p>
                    <p>${text}</p>
                `;

                commentsDisplay.prepend(commentDiv);
                commentInput.value = '';
            } else {
                alert('Vui lòng nhập câu hỏi của bạn.');
            }
        });
    }

    // 5. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .ai-card, .accordion-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});
