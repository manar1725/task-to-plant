// Plant Productivity Garden - Main JavaScript

class PlantProductivityGame {
    constructor() {
        this.selectedPlant = null;
        this.tasks = [];
        this.taskIdCounter = 0;
        
        this.plantData = {
            sunflower: {
                id: 'sunflower',
                name: 'Sunny Sunflower',
                type: 'Flower',
                image: 'src/assets/sunflower.jpg',
                growthStage: 0
            },
            rose: {
                id: 'rose',
                name: 'Royal Rose',
                type: 'Flower',
                image: 'src/assets/rose.jpg',
                growthStage: 0
            },
            basil: {
                id: 'basil',
                name: 'Aromatic Basil',
                type: 'Herb',
                image: 'src/assets/basil.jpg',
                growthStage: 0
            },
            tomato: {
                id: 'tomato',
                name: 'Cherry Tomato',
                type: 'Vegetable',
                image: 'src/assets/tomato.jpg',
                growthStage: 0
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showPlantSelection();
    }
    
    bindEvents() {
        // Plant selection
        document.querySelectorAll('.plant-card').forEach(card => {
            card.addEventListener('click', () => {
                const plantId = card.dataset.plant;
                this.selectPlant(plantId);
            });
        });
        
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Add task
        document.getElementById('add-task-btn').addEventListener('click', () => {
            this.addTask();
        });
        
        // Enter key for adding tasks
        document.getElementById('task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        
        // Info section toggles
        document.querySelectorAll('.info-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                this.toggleInfoSection(e.currentTarget);
            });
        });
        
        // Quick add chore buttons
        document.querySelectorAll('.chore-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.addQuickChore(e.currentTarget.dataset.chore);
            });
        });
    }
    
    showPlantSelection() {
        document.getElementById('plant-selection').classList.remove('hidden');
        document.getElementById('main-game').classList.add('hidden');
    }
    
    showMainGame() {
        document.getElementById('plant-selection').classList.add('hidden');
        document.getElementById('main-game').classList.remove('hidden');
    }
    
    selectPlant(plantId) {
        this.selectedPlant = { ...this.plantData[plantId] };
        this.tasks = [];
        this.taskIdCounter = 0;
        
        this.showMainGame();
        this.updatePlantDisplay();
        this.updateTaskDisplay();
        this.updateCareStatus();
    }
    
    resetGame() {
        this.selectedPlant = null;
        this.tasks = [];
        this.taskIdCounter = 0;
        this.showPlantSelection();
    }
    
    toggleInfoSection(toggle) {
        const section = toggle.dataset.section;
        const content = document.getElementById(`${section}-content`);
        const arrow = toggle.querySelector('.toggle-arrow');
        
        content.classList.toggle('hidden');
        toggle.classList.toggle('active');
    }
    
    addQuickChore(choreText) {
        const input = document.getElementById('task-input');
        input.value = choreText;
        this.addTask();
    }
    
    addTask() {
        const input = document.getElementById('task-input');
        const taskText = input.value.trim();
        
        if (!taskText) return;
        
        const task = {
            id: this.taskIdCounter++,
            text: taskText,
            completed: false
        };
        
        this.tasks.push(task);
        input.value = '';
        
        this.updateTaskDisplay();
        this.updatePlantGrowth();
        this.updateCareStatus();
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.updateTaskDisplay();
            this.updatePlantGrowth();
            this.updateCareStatus();
            
            if (task.completed) {
                this.animatePlantGrowth();
            }
        }
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.updateTaskDisplay();
        this.updatePlantGrowth();
        this.updateCareStatus();
    }
    
    updatePlantDisplay() {
        if (!this.selectedPlant) return;
        
        document.getElementById('plant-name').textContent = this.selectedPlant.name;
        document.getElementById('plant-type').textContent = this.selectedPlant.type;
        
        this.renderPlantGrowth();
    }
    
    updatePlantGrowth() {
        if (!this.selectedPlant || this.tasks.length === 0) return;
        
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const totalTasks = this.tasks.length;
        
        this.selectedPlant.growthStage = (completedTasks / totalTasks) * 100;
        this.renderPlantGrowth();
        
        // Check if fully grown
        if (completedTasks === totalTasks && totalTasks > 0) {
            this.showFullBloom();
        } else {
            this.hideFullBloom();
        }
    }
    
    renderPlantGrowth() {
        const stagesContainer = document.getElementById('plant-stages');
        const growthStage = this.selectedPlant.growthStage;
        
        stagesContainer.innerHTML = '';
        
        // Seed stage (0-10%)
        if (growthStage >= 0) {
            const seed = document.createElement('div');
            seed.className = 'seed';
            stagesContainer.appendChild(seed);
        }
        
        // Sprout stage (10-30%)
        if (growthStage >= 10) {
            const sprout = document.createElement('div');
            sprout.className = 'sprout';
            const height = Math.min((growthStage - 10) / 20 * 20, 20);
            sprout.style.height = `${height}px`;
            stagesContainer.appendChild(sprout);
        }
        
        // Small plant with leaves (30-60%)
        if (growthStage >= 30) {
            const smallPlant = document.createElement('div');
            smallPlant.className = 'small-plant';
            
            const stem = document.createElement('div');
            stem.className = 'small-stem';
            const height = Math.min((growthStage - 30) / 30 * 40, 40);
            stem.style.height = `${height}px`;
            
            const leaves = document.createElement('div');
            leaves.className = 'small-leaves';
            
            const leaf1 = document.createElement('div');
            leaf1.className = 'small-leaf';
            const leaf2 = document.createElement('div');
            leaf2.className = 'small-leaf';
            
            leaves.appendChild(leaf1);
            leaves.appendChild(leaf2);
            
            smallPlant.appendChild(stem);
            smallPlant.appendChild(leaves);
            stagesContainer.appendChild(smallPlant);
        }
        
        // Mature plant (60-90%)
        if (growthStage >= 60) {
            const maturePlant = document.createElement('div');
            maturePlant.className = 'mature-plant';
            
            const stem = document.createElement('div');
            stem.className = 'mature-stem';
            const height = Math.min((growthStage - 60) / 30 * 60, 60);
            stem.style.height = `${height}px`;
            
            const topLeaves = document.createElement('div');
            topLeaves.className = 'mature-leaves-top';
            
            const topLeaf1 = document.createElement('div');
            topLeaf1.className = 'mature-leaf-large';
            topLeaf1.style.transform = 'rotate(-45deg) translateX(-4px)';
            
            const topLeaf2 = document.createElement('div');
            topLeaf2.className = 'mature-leaf-large';
            topLeaf2.style.transform = 'rotate(45deg) translateX(4px)';
            
            topLeaves.appendChild(topLeaf1);
            topLeaves.appendChild(topLeaf2);
            
            const midLeaves = document.createElement('div');
            midLeaves.className = 'mature-leaves-mid';
            
            const midLeaf1 = document.createElement('div');
            midLeaf1.className = 'mature-leaf-small';
            midLeaf1.style.transform = 'rotate(-30deg)';
            
            const midLeaf2 = document.createElement('div');
            midLeaf2.className = 'mature-leaf-small';
            midLeaf2.style.transform = 'rotate(30deg)';
            
            midLeaves.appendChild(midLeaf1);
            midLeaves.appendChild(midLeaf2);
            
            maturePlant.appendChild(stem);
            maturePlant.appendChild(topLeaves);
            maturePlant.appendChild(midLeaves);
            stagesContainer.appendChild(maturePlant);
        }
        
        // Full bloom with plant image (90-100%)
        if (growthStage >= 90) {
            const bloomContainer = document.createElement('div');
            bloomContainer.className = 'bloom-image';
            bloomContainer.style.opacity = (growthStage - 90) / 10;
            
            const img = document.createElement('img');
            img.src = this.selectedPlant.image;
            img.alt = this.selectedPlant.name;
            
            bloomContainer.appendChild(img);
            stagesContainer.appendChild(bloomContainer);
        }
    }
    
    showFullBloom() {
        document.getElementById('bloom-badge').classList.remove('hidden');
        document.getElementById('completion-message').classList.remove('hidden');
        
        // Add sparkles
        const sparklesContainer = document.getElementById('sparkles');
        sparklesContainer.classList.remove('hidden');
        sparklesContainer.innerHTML = '';
        
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${20 + Math.random() * 60}%`;
            sparkle.style.top = `${20 + Math.random() * 60}%`;
            sparkle.style.animationDelay = `${i * 0.3}s`;
            sparklesContainer.appendChild(sparkle);
        }
    }
    
    hideFullBloom() {
        document.getElementById('bloom-badge').classList.add('hidden');
        document.getElementById('completion-message').classList.add('hidden');
        document.getElementById('sparkles').classList.add('hidden');
    }
    
    animatePlantGrowth() {
        const pot = document.getElementById('plant-pot');
        pot.classList.add('animate-plant-grow');
        
        setTimeout(() => {
            pot.classList.remove('animate-plant-grow');
        }, 800);
    }
    
    updateTaskDisplay() {
        const taskList = document.getElementById('task-list');
        const taskCounter = document.getElementById('task-counter');
        const taskProgress = document.getElementById('task-progress');
        
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const totalTasks = this.tasks.length;
        
        // Update counter
        taskCounter.textContent = `${completedTasks} / ${totalTasks} tasks completed`;
        
        // Update progress bar
        const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        taskProgress.style.width = `${progressPercent}%`;
        
        // Render task list
        taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onchange="game.toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="game.deleteTask(${task.id})">×</button>
            `;
            
            taskList.appendChild(taskItem);
        });
    }
    
    updateCareStatus() {
        if (!this.selectedPlant || this.tasks.length === 0) {
            this.setCareLevel('water', 0);
            this.setCareLevel('sunlight', 0);
            this.setCareLevel('nutrients', 0);
            return;
        }
        
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const totalTasks = this.tasks.length;
        
        const waterLevel = Math.min((completedTasks / totalTasks) * 100, 100);
        const sunlightLevel = Math.min(((completedTasks * 1.2) / totalTasks) * 100, 100);
        const nutrientLevel = Math.min(((completedTasks * 0.8) / totalTasks) * 100, 100);
        
        this.setCareLevel('water', waterLevel);
        this.setCareLevel('sunlight', sunlightLevel);
        this.setCareLevel('nutrients', nutrientLevel);
    }
    
    setCareLevel(type, level) {
        const progressBar = document.getElementById(`${type}-progress`);
        const percentText = document.getElementById(`${type}-percent`);
        
        progressBar.style.width = `${level}%`;
        percentText.textContent = `${Math.round(level)}%`;
    }
}

// Initialize the game when the page loads
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new PlantProductivityGame();
});

// Make game accessible globally for event handlers
window.game = game;