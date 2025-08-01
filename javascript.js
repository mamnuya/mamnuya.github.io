/*
When you click a menu link, it shows the corresponding section and hides the others.
runs after the page has loaded.
*/
document.addEventListener('DOMContentLoaded', function () {
    // === Section Navigation ===
    const navLinks = document.querySelectorAll('nav a[data-section]');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const target = this.getAttribute('data-section');

            // Hide all sections
            sections.forEach(sec => sec.style.display = 'none');

            // Show the selected section
            const el = document.getElementById(target);
            if (el) {
                el.style.display = 'block';
            }

            // Scroll to top
            window.scrollTo(0, 0);

            // Update scroll thumb after section change
            updateScrollThumb();

            // ✅ Remove 'active' from all links
            navLinks.forEach(nav => nav.classList.remove('active'));

            // ✅ Add 'active' to the clicked link
            this.classList.add('active');
        });
    });

    // === Scroll Indicator Logic ===
    const scrollThumb = document.querySelector('.scroll-thumb');
    const indicator = document.querySelector('.scroll-indicator');

    function updateScrollThumb() {
        if (!scrollThumb || !indicator) return;

        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        const indicatorHeight = indicator.offsetHeight;
        const thumbHeight = scrollThumb.offsetHeight;
        const thumbTravel = indicatorHeight - thumbHeight;

        scrollThumb.style.top = `${scrollPercent * thumbTravel}px`;
    }

    // Bind scroll and resize events
    document.addEventListener('scroll', updateScrollThumb);
    window.addEventListener('resize', updateScrollThumb);

    // Run it once initially
    updateScrollThumb();

    // make loading screen fade after few seconds
    setTimeout(() => {
        document.querySelector('.loading-spinner').classList.add('fade-out');
        document.querySelector('.profile-header').classList.remove('loading-header');
    }, 3000);
});