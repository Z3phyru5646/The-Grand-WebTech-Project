document.addEventListener('DOMContentLoaded', () => {
    const activityList = document.getElementById('activity-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityForm = document.getElementById('activity-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');

    // Load activities from localStorage or use initial data
    let currentActivities = JSON.parse(localStorage.getItem('activities')) || activities;

    // Function to save activities to localStorage
    function saveActivities() {
        localStorage.setItem('activities', JSON.stringify(currentActivities));
    }

    // Function to render activities
    function renderActivities(filter = 'all') {
        activityList.innerHTML = '';
        const filteredActivities = currentActivities.filter(activity => 
            filter === 'all' || activity.time === filter
        );

        if (filteredActivities.length === 0) {
            activityList.innerHTML = `<p class="text-gray-400">No activities logged for this period.</p>`;
            return;
        }

        filteredActivities.forEach(activity => {
            const activityElement = document.createElement('div');
            activityElement.className = 'glass-card p-4 flex justify-between items-center fade-in';
            activityElement.innerHTML = `
                <div>
                    <h3 class="text-lg font-bold">${activity.name}</h3>
                    <p class="text-sm text-gray-400">${activity.duration} min - ${activity.calories} kcal</p>
                </div>
                <span class="text-sm font-semibold capitalize">${activity.time}</span>
            `;
            activityList.appendChild(activityElement);
        });
    }

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('bg-cyan-500', 'text-black'));
            button.classList.add('bg-cyan-500', 'text-black');
            renderActivities(button.dataset.filter);
        });
    });

    // Handle form submission
    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('activity-name').value.trim();
        const duration = parseInt(document.getElementById('activity-duration').value);
        const calories = parseInt(document.getElementById('activity-calories').value);
        const time = document.getElementById('activity-time').value;

        // Inline validation
        let isValid = true;
        if (!name) {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }

        if (isNaN(duration) || duration <= 0) {
            document.getElementById('duration-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('duration-error').style.display = 'none';
        }

        if (isNaN(calories) || calories <= 0) {
            document.getElementById('calories-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('calories-error').style.display = 'none';
        }

        if (!isValid) return;

        const newActivity = { name, duration, calories, time };
        currentActivities.push(newActivity);
        saveActivities(); // Save to localStorage
        renderActivities(); // Re-render with the new activity
        activityForm.reset();
        successModal.classList.add('visible');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        successModal.classList.remove('visible');
    });

    // Initial render
    renderActivities();
});
