const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const quoteElement = document.getElementById("motivationalQuote");
const profileImage = document.getElementById("profileImage");

// Random Color Theme
const colors = [
    { primary: "#6b48ff", secondary: "#ff6f61" },
    { primary: "#00c4cc", secondary: "#ffca28" },
    { primary: "#ff5252", secondary: "#4caf50" },
    { primary: "#9c27b0", secondary: "#ffeb3b" },
    { primary: "#2196f3", secondary: "#f06292" }
];
const randomTheme = colors[Math.floor(Math.random() * colors.length)];
document.documentElement.style.setProperty('--primary', randomTheme.primary);
document.documentElement.style.setProperty('--secondary', randomTheme.secondary);
document.documentElement.style.setProperty('--primary-rgb', hexToRgb(randomTheme.primary));
document.documentElement.style.setProperty('--secondary-rgb', hexToRgb(randomTheme.secondary));
document.body.style.background = `linear-gradient(135deg, ${randomTheme.primary}20, ${randomTheme.secondary}20)`;

// Hex to RGB
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

// Random Profile Image Generator
function setRandomProfileImage() {
    const randomId = Math.floor(Math.random() * 1000);
    profileImage.src = `https://api.dicebear.com/8.x/avataaars/svg?seed=${randomId}`;
    gsap.from(profileImage, { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" });
}

// Motivational Quotes
const quotes = [
    "You’ve got this—conquer those tasks!",
    "One step at a time, you’re unstoppable!",
    "Turn your to-dos into ta-das!",
    "Small wins today, big victories tomorrow!",
    "Keep going—you’re a task-crushing superstar!"
];
function updateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    gsap.to(quoteElement, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            quoteElement.textContent = randomQuote;
            gsap.to(quoteElement, { opacity: 1, duration: 0.3 });
        }
    });
}

// Sound Effects
const addSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3"); // Soft, upbeat beep for adding tasks
const completeSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3"); // Gentle bell for task completion
const deleteSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-quick-positive-video-game-notification-269.mp3"); // Quick, smooth tone for deletion

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    gsap.from(li, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
    addSound.play();
    updateQuote();
    taskInput.value = "";
}

function createTaskElement(text) {
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.onclick = () => {
        li.classList.toggle("completed");
        gsap.to(li, { scale: 0.98, duration: 0.2, ease: "power1.inOut", yoyo: true, repeat: 1 });
        if (checkbox.checked) {
            completeSound.play();
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: [randomTheme.primary, randomTheme.secondary, "#ffffff"]
            });
            updateQuote();
        }
    };

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
        gsap.to(li, { 
            opacity: 0, 
            x: -50, 
            duration: 0.4, 
            ease: "power2.in", 
            onComplete: () => {
                li.remove();
                deleteSound.play();
                updateQuote();
            }
        });
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return li;
}

function editTask(span) {
    const newText = prompt("Edit task:", span.textContent);
    if (newText && newText.trim()) {
        span.textContent = newText.trim();
        gsap.from(span, { opacity: 0, duration: 0.3, ease: "power2.out" });
        addSound.play();
    }
}

// Event Listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Initial Setup
setRandomProfileImage();
gsap.from(".container", { opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.7)" });
gsap.from("header", { opacity: 0, y: -30, duration: 0.6, delay: 0.3, ease: "power3.out" });
gsap.from(".input-container", { opacity: 0, y: 20, duration: 0.6, delay: 0.5, ease: "power3.out" });
updateQuote();
