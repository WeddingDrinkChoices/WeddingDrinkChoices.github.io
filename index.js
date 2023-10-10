const names = ["Alice", "Bob", "Charlie", "Dave"];

const categories = {
    beer: ["Ale", "Amber", "Bock", "Cider", "IPA", "Lager", "Light", "Nitro", "Porter", "Sour", "Stout"],
    wine: ["Cabernet", "Champagne", "Chardonnay", "Dessert Wine", "Malbec", "Merlot", "Muscadine", "Pinot Grigio", "Pinot Noir", "Red Blend", "Rose", "Sauvignon Blanco", "White Blend"],
    spirits: ["Bourbon", "Brandy", "Cognac", "Gin", "Rum", "Sake", "Scotch", "Tequila", "Vodka", "Whiskey"]
};

// Store the counts of each selected item
const counts = {
    beer: new Array(11).fill(0),
    wine: new Array(13).fill(0),
    spirits: new Array(10).fill(0)
};

document.getElementById('name').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';
    
    names.forEach(name => {
        if (name.toLowerCase().includes(searchTerm)) {
            const div = document.createElement('div');
            div.textContent = name;
            div.onclick = function() {
                document.getElementById('name').value = name;
                suggestionsBox.innerHTML = '';
            }
            suggestionsBox.appendChild(div);
        }
    });
});

function toPage2() {
    // Add checkboxes dynamically here if you want
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
}

function submitForm() {
    // Handle submission, update counts, and email sending here

    categories.beer.forEach((item, index) => {
        if (document.getElementById(item).checked) {
            counts.beer[index]++;
        }
    });

    categories.wine.forEach((item, index) => {
        if (document.getElementById(item).checked) {
            counts.wine[index]++;
        }
    });

    categories.spirits.forEach((item, index) => {
        if (document.getElementById(item).checked) {
            counts.spirits[index]++;
        }
    });

    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'block';

    updateCharts();
}

function updateCharts() {
    // Update the pie charts with the new counts

    const beerCtx = document.getElementById('beerChart').getContext('2d');
    new Chart(beerCtx, {
        type: 'pie',
        data: {
            labels: categories.beer,
            datasets: [{
                data: counts.beer,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta', 'brown', 'grey']
            }]
        }
    });

    const wineCtx = document.getElementById('wineChart').getContext('2d');
    new Chart(wineCtx, {
        type: 'pie',
        data: {
            labels: categories.wine,
            datasets: [{
                data: counts.wine,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ADFF2F', '#FF69B4', '#DAA520', '#8B4513', '#DC143C', '#20B2AA', '#B22222', '#4B0082', '#FF4500', '#2E8B57']
            }]
        }
    });

    const spiritsCtx = document.getElementById('spiritChart').getContext('2d');
    new Chart(spiritsCtx, {
        type: 'pie',
        data: {
            labels: categories.spirits,
            datasets: [{
                data: counts.spirits,
                backgroundColor: ['#A52A2A', '#D2691E', '#DB7093', '#FFD700', '#8A2BE2', '#7FFF00', '#00FF7F', '#32CD32', '#FF00FF', '#1E90FF']
            }]
        }
    });
}

// Initialization code to populate the checkboxes
window.onload = function() {
    for (let category in categories) {
        let container = document.getElementById(category);
        categories[category].forEach(item => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item;
            let label = document.createElement('label');
            label.htmlFor = item;
            label.appendChild(document.createTextNode(item));
            container.appendChild(checkbox);
            container.appendChild(label);
            container.appendChild(document.createElement('br'));
        });
    }
}