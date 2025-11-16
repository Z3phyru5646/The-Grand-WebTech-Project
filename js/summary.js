document.addEventListener('DOMContentLoaded', () => {
    const activityChart = document.getElementById('activity-chart');
    const calorieChart = document.getElementById('calorie-chart');
    const downloadBtn = document.getElementById('download-summary');
    const resetBtn = document.getElementById('reset-dashboard');
    const downloadModal = document.getElementById('download-modal');
    const closeDownloadModal = document.getElementById('close-download-modal');

    // Function to create a bar chart
    function createBarChart(container, data, unit, labels) {
        container.innerHTML = '';
        const maxVal = Math.max(...data);
        const chart = document.createElement('div');
        chart.className = 'flex justify-around items-end h-64';

        data.forEach(value => {
            const bar = document.createElement('div');
            const height = (value / maxVal) * 100;
            bar.className = 'w-10 bg-cyan-500 rounded-t-md hover:bg-cyan-400 transition-all duration-300';
            bar.style.height = '0%';
            bar.dataset.value = `${value} ${unit}`;
            
            // Animate bar height on load
            setTimeout(() => {
                bar.style.height = `${height}%`;
            }, 100);

            // Show value on hover
            bar.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm';
                tooltip.textContent = bar.dataset.value;
                bar.style.position = 'relative';
                bar.appendChild(tooltip);
            });
            bar.addEventListener('mouseleave', () => {
                bar.innerHTML = '';
            });

            chart.appendChild(bar);
        });
        container.appendChild(chart);

        // Add labels
        const labelContainer = document.createElement('div');
        labelContainer.className = 'chart-labels';
        labels.forEach(label => {
            const labelEl = document.createElement('span');
            labelEl.textContent = label;
            labelContainer.appendChild(labelEl);
        });
        container.appendChild(labelContainer);
    }

    // Populate charts
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    createBarChart(activityChart, weeklySummary.activity, 'min', dayLabels);
    createBarChart(calorieChart, weeklySummary.calories, 'kcal', dayLabels);

    // Handle button clicks
    downloadBtn.addEventListener('click', () => {
        downloadModal.classList.add('visible');
    });

    closeDownloadModal.addEventListener('click', () => {
        downloadModal.classList.remove('visible');
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data? This will clear any added activities and meals.')) {
            localStorage.removeItem('activities');
            localStorage.removeItem('meals');
            location.reload();
        }
    });
});
