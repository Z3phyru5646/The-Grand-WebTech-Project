document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the saved theme
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light');
            themeToggle.textContent = '🌙';
        } else {
            body.classList.remove('light');
            themeToggle.textContent = '☀️';
        }
    }

    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('light') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
});
