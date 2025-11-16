document.addEventListener('DOMContentLoaded', () => {
    const activityList = document.getElementById('activity-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityForm = document.getElementById('activity-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');

    let currentActivities = [...activities]; // Start with the initial data

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

        if (!name || !duration || !calories) {
            alert('All fields are required.');
            return;
        }

        if (duration <= 0 || calories <= 0) {
            alert('Duration and calories must be positive numbers.');
            return;
        }

        const newActivity = { name, duration, calories, time };
        currentActivities.push(newActivity);
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
