document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Pesticide Debug Mode
    const debugBtn = document.getElementById('toggle-debug');
    
    debugBtn.addEventListener('click', () => {
        document.body.classList.toggle('debug');
        
        if (document.body.classList.contains('debug')) {
            debugBtn.textContent = 'Disable Pesticide';
            debugBtn.style.backgroundColor = '#ef4444';
            debugBtn.style.color = '#fff';
            console.log('Pesticide debug mode enabled.');
        } else {
            debugBtn.textContent = 'Toggle Pesticide';
            debugBtn.style.backgroundColor = '';
            debugBtn.style.color = '';
            console.log('Pesticide debug mode disabled.');
        }
    });

    // 2. Toggle Buggy vs. Corrected CSS
    const layoutBtn = document.getElementById('toggle-layout');
    const layoutBadge = document.getElementById('layout-badge');
    const themeStyleLink = document.getElementById('theme-style');

    layoutBtn.addEventListener('click', () => {
        if (themeStyleLink.getAttribute('href') === 'styles2.css') {
            // Switch to corrected stylesheet
            themeStyleLink.setAttribute('href', 'corrected-styles2.css');
            layoutBtn.textContent = 'Switch to Buggy CSS';
            layoutBtn.classList.add('corrected-mode');
            
            layoutBadge.textContent = 'Corrected CSS Active';
            layoutBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
            layoutBadge.style.color = '#10b981';
            layoutBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
            console.log('Switched to corrected stylesheet (corrected-styles2.css).');
        } else {
            // Switch to buggy stylesheet
            themeStyleLink.setAttribute('href', 'styles2.css');
            layoutBtn.textContent = 'Switch to Corrected CSS';
            layoutBtn.classList.remove('corrected-mode');
            
            layoutBadge.textContent = 'Buggy CSS Active';
            layoutBadge.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
            layoutBadge.style.color = '#ef4444';
            layoutBadge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
            console.log('Switched to buggy stylesheet (styles2.css).');
        }
    });

    // 3. User Profile Dropdown Interaction
    const profileTrigger = document.getElementById('user-profile-trigger');
    const profileDropdown = document.getElementById('profile-dropdown-menu');

    profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    // Close dropdown on click outside
    document.addEventListener('click', () => {
        if (profileDropdown.classList.contains('show')) {
            profileDropdown.classList.remove('show');
        }
    });
});
