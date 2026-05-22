document.addEventListener('DOMContentLoaded', () => {
    const debugBtn = document.getElementById('toggle-debug');
    
    debugBtn.addEventListener('click', () => {
        document.body.classList.toggle('debug');
        
        if (document.body.classList.contains('debug')) {
            debugBtn.textContent = 'Disable Pesticide';
            console.log('Debug mode enabled. Layout boundaries revealed.');
        } else {
            debugBtn.textContent = 'Toggle Pesticide';
            console.log('Debug mode disabled.');
        }
    });
});