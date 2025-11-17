document.addEventListener('DOMContentLoaded', () => {
    const dashboardGrid = document.getElementById('dashboard-grid');
    const clockElement = document.getElementById('clock');
    const goalModal = document.getElementById('goal-modal');
    const closeGoalModalBtn = document.getElementById('close-goal-modal');
    const goalForm = document.getElementById('goal-form');

    // Load goals from localStorage or use initial data
    let currentGoals = JSON.parse(localStorage.getItem('customGoals')) || dailyGoals;

    function saveGoals() {
        localStorage.setItem('customGoals', JSON.stringify(currentGoals));
    }

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
        card.className = 'glass-card p-6 flex flex-col items-center justify-center fade-in relative';
        
        const percentage = goal ? (value / goal) * 100 : 0;

        card.innerHTML = `
            <div class="settings-icon">⚙️</div>
            <div class="relative progress-circle mb-4" style="--p:${percentage}">
                <div class="relative text-3xl">${icon}</div>
            </div>
            <h2 class="text-xl font-bold">${title}</h2>
            <p class="text-3xl font-semibold text-green-400">${value} <span class="text-lg text-gray-400">${goal ? `/ ${goal}` : ''} ${unit}</span></p>
        `;

        card.querySelector('.settings-icon').addEventListener('click', () => {
            document.getElementById('steps-goal').value = currentGoals.steps;
            document.getElementById('calories-goal').value = currentGoals.calories;
            document.getElementById('water-goal').value = currentGoals.water;
            goalModal.classList.add('visible');
        });

        return card;
    }

    // Load daily stats and create cards
    function loadDashboard() {
        dashboardGrid.innerHTML = ''; // Clear existing cards
        const stats = [
            { title: 'Steps Taken', value: dailyStats.steps, unit: '', icon: '👟', goal: currentGoals.steps },
            { title: 'Calories Burned', value: dailyStats.calories, unit: 'kcal', icon: '🔥', goal: currentGoals.calories },
            { title: 'Water Intake', value: dailyStats.water, unit: 'liters', icon: '💧', goal: currentGoals.water }
        ];

        stats.forEach(stat => {
            const card = createStatCard(stat.title, stat.value, stat.unit, stat.icon, stat.goal);
            dashboardGrid.appendChild(card);
        });
    }

    // Modal and Form listeners
    closeGoalModalBtn.addEventListener('click', () => {
        goalModal.classList.remove('visible');
    });

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentGoals.steps = parseInt(document.getElementById('steps-goal').value) || currentGoals.steps;
        currentGoals.calories = parseInt(document.getElementById('calories-goal').value) || currentGoals.calories;
        currentGoals.water = parseFloat(document.getElementById('water-goal').value) || currentGoals.water;
        
        saveGoals();
        loadDashboard();
        goalModal.classList.remove('visible');
    });


    // Initial setup
    updateClock();
    setInterval(updateClock, 1000);
    loadDashboard();
});
