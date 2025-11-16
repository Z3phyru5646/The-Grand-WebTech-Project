document.addEventListener('DOMContentLoaded', () => {
    const dashboardGrid = document.getElementById('dashboard-grid');
    const clockElement = document.getElementById('clock');
    const goalModal = document.getElementById('goal-modal');
    const closeGoalModalBtn = document.getElementById('close-goal-modal');
    const goalForm = document.getElementById('goal-form');

    // Load custom goals from localStorage or use defaults
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
    function createStatCard(title, value, unit, icon, goal, key) {
        const card = document.createElement('div');
        card.className = 'glass-card p-6 flex flex-col items-center justify-center fade-in';
        
        const percentage = goal ? (value / goal) * 100 : 0;

        card.innerHTML = `
            <div class="absolute top-2 right-2 cursor-pointer settings-btn" data-goal-key="${key}">⚙️</div>
            <div class="relative progress-circle mb-4" style="--p:${percentage}">
                <div class="relative text-3xl">${icon}</div>
            </div>
            <h2 class="text-xl font-bold">${title}</h2>
            <p class="text-3xl font-semibold text-cyan-400">${value} <span class="text-lg text-gray-400">${goal ? `/ ${goal}` : ''} ${unit}</span></p>
        `;
        return card;
    }

    // Load daily stats and create cards
    function loadDashboard() {
        dashboardGrid.innerHTML = ''; // Clear existing cards
        const stats = [
            { key: 'steps', title: 'Steps Taken', value: dailyStats.steps, unit: '', icon: '👟', goal: currentGoals.steps },
            { key: 'calories', title: 'Calories Burned', value: dailyStats.calories, unit: 'kcal', icon: '🔥', goal: currentGoals.calories },
            { key: 'water', title: 'Water Intake', value: dailyStats.water, unit: 'liters', icon: '💧', goal: currentGoals.water }
        ];

        stats.forEach(stat => {
            const card = createStatCard(stat.title, stat.value, stat.unit, stat.icon, stat.goal, stat.key);
            dashboardGrid.appendChild(card);
        });

        // Add event listeners to the new settings buttons
        document.querySelectorAll('.settings-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('steps-goal').value = currentGoals.steps;
                document.getElementById('calories-goal').value = currentGoals.calories;
                document.getElementById('water-goal').value = currentGoals.water;
                goalModal.classList.add('visible');
            });
        });
    }

    // Modal and Form Logic
    closeGoalModalBtn.addEventListener('click', () => {
        goalModal.classList.remove('visible');
    });

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newSteps = parseInt(document.getElementById('steps-goal').value);
        const newCalories = parseInt(document.getElementById('calories-goal').value);
        const newWater = parseFloat(document.getElementById('water-goal').value);

        if (newSteps > 0) currentGoals.steps = newSteps;
        if (newCalories > 0) currentGoals.calories = newCalories;
        if (newWater > 0) currentGoals.water = newWater;

        saveGoals();
        loadDashboard();
        goalModal.classList.remove('visible');
    });

    // Initial setup
    updateClock();
    setInterval(updateClock, 1000);
    loadDashboard();
});
