document.addEventListener('DOMContentLoaded', () => {
    const mealSections = document.getElementById('meal-sections');
    const totalCaloriesEl = document.getElementById('total-calories');

    // Load meals from localStorage or use initial data
    let currentMeals = JSON.parse(localStorage.getItem('meals')) || JSON.parse(JSON.stringify(meals));

    // Function to save meals to localStorage
    function saveMeals() {
        localStorage.setItem('meals', JSON.stringify(currentMeals));
    }

    // Function to calculate total calories
    function calculateTotalCalories() {
        let total = 0;
        for (const mealType in currentMeals) {
            total += currentMeals[mealType].reduce((sum, item) => sum + item.cal, 0);
        }
        totalCaloriesEl.textContent = total;
    }

    // Function to render all meal sections
    function renderMealSections() {
        mealSections.innerHTML = '';
        for (const mealType in currentMeals) {
            const section = document.createElement('div');
            section.className = 'glass-card p-6';
            section.innerHTML = `
                <h2 class="text-2xl font-bold mb-4 capitalize">${mealType}</h2>
                <ul class="space-y-2" id="${mealType}-list">
                    ${currentMeals[mealType].map(meal => `
                        <li class="flex justify-between items-center">
                            <span>${meal.item}</span>
                            <span>${meal.cal} kcal</span>
                            <button class="text-red-500 remove-meal" data-meal-type="${mealType}" data-item="${meal.item}">X</button>
                        </li>
                    `).join('')}
                </ul>
                <form class="mt-4 flex space-x-2 add-meal-form" data-meal-type="${mealType}">
                    <input type="text" placeholder="Item" class="flex-grow bg-white/5 p-2 rounded-md border border-white/20">
                    <input type="number" placeholder="Cal" class="w-20 bg-white/5 p-2 rounded-md border border-white/20">
                    <button type="submit" class="bg-green-500 text-black px-3 rounded-md">+</button>
                </form>
            `;
            mealSections.appendChild(section);
        }
        calculateTotalCalories();
        addEventListeners();
    }

    // Function to add event listeners for forms and remove buttons
    function addEventListeners() {
        document.querySelectorAll('.add-meal-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const mealType = e.target.dataset.mealType;
                const itemInput = e.target.querySelector('input[type="text"]');
                const calInput = e.target.querySelector('input[type="number"]');
                
                const item = itemInput.value.trim();
                const cal = parseInt(calInput.value);

                if (item && cal > 0) {
                    currentMeals[mealType].push({ item, cal });
                    itemInput.value = '';
                    calInput.value = '';
                    saveMeals(); // Save to localStorage
                    renderMealSections();
                }
            });
        });

        document.querySelectorAll('.remove-meal').forEach(button => {
            button.addEventListener('click', (e) => {
                const mealType = e.target.dataset.mealType;
                const item = e.target.dataset.item;
                currentMeals[mealType] = currentMeals[mealType].filter(meal => meal.item !== item);
                saveMeals(); // Save to localStorage
                renderMealSections();
            });
        });
    }

    // Initial render
    renderMealSections();
});
