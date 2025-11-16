document.addEventListener('DOMContentLoaded', () => {
    const dashboardGrid = document.getElementById('dashboard-grid');
    const clockElement = document.getElementById('clock');

    // Function to update the clock every second
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Function to create a stat card
    function createStatCard(title, value, unit, icon) {
        const card = document.createElement('div');
        card.className = 'glass-card p-6 flex flex-col items-center justify-center fade-in';
        card.innerHTML = `
            <div class="text-4xl mb-2">${icon}</div>
            <h2 class="text-xl font-bold">${title}</h2>
            <p class="text-3xl font-semibold text-cyan-400">${value} <span class="text-lg text-gray-400">${unit}</span></p>
        `;
        return card;
    }

    // Load daily stats and create cards
    function loadDashboard() {
        const stats = [
            { title: 'Steps Taken', value: dailyStats.steps, unit: '', icon: '👟' },
            { title: 'Calories Burned', value: dailyStats.calories, unit: 'kcal', icon: '🔥' },
            { title: 'Water Intake', value: dailyStats.water, unit: 'liters', icon: '💧' }
        ];

        stats.forEach(stat => {
            const card = createStatCard(stat.title, stat.value, stat.unit, stat.icon);
            dashboardGrid.appendChild(card);
        });
    }

    // Initial setup
    updateClock();
    setInterval(updateClock, 1000);
    loadDashboard();
});
