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
    function createStatCard(title, value, unit, icon, goal) {
        const card = document.createElement('div');
        card.className = 'glass-card p-6 flex flex-col items-center justify-center fade-in';
        
        const percentage = goal ? (value / goal) * 100 : 0;

        card.innerHTML = `
            <div class="relative progress-circle mb-4" style="--p:${percentage}">
                <div class="relative text-3xl">${icon}</div>
            </div>
            <h2 class="text-xl font-bold">${title}</h2>
            <p class="text-3xl font-semibold text-green-400">${value} <span class="text-lg text-gray-400">${goal ? `/ ${goal}` : ''} ${unit}</span></p>
        `;
        return card;
    }

    // Load daily stats and create cards
    function loadDashboard() {
        const stats = [
            { title: 'Steps Taken', value: dailyStats.steps, unit: '', icon: '👟', goal: dailyGoals.steps },
            { title: 'Calories Burned', value: dailyStats.calories, unit: 'kcal', icon: '🔥', goal: dailyGoals.calories },
            { title: 'Water Intake', value: dailyStats.water, unit: 'liters', icon: '💧', goal: dailyGoals.water }
        ];

        stats.forEach(stat => {
            const card = createStatCard(stat.title, stat.value, stat.unit, stat.icon, stat.goal);
            dashboardGrid.appendChild(card);
        });
    }

    // Initial setup
    updateClock();
    setInterval(updateClock, 1000);
    loadDashboard();
});
