let joshGoal = 0;
let nateGoal = 0;
let joshProgress = 0;
let nateProgress = 0;

const goalSetting = document.getElementById('goal-setting');
const progressTracking = document.getElementById('progress-tracking');
const workoutLogging = document.getElementById('workout-logging');
const messages = document.getElementById('messages');

// Check if goals are set
if (!localStorage.getItem('goalsSet')) {
    goalSetting.classList.remove('hidden');
    progressTracking.classList.add('hidden');
} else {
    loadProgress();
    updateUI();
}

document.getElementById('set-goals').addEventListener('click', () => {
    joshGoal = parseInt(document.getElementById('josh-goal').value);
    nateGoal = parseInt(document.getElementById('nate-goal').value);
    
    if (joshGoal && nateGoal) {
        localStorage.setItem('joshGoal', joshGoal);
        localStorage.setItem('nateGoal', nateGoal);
        localStorage.setItem('goalsSet', 'true');
        goalSetting.classList.add('hidden');
        progressTracking.classList.remove('hidden');
        updateUI();
    } else {
        alert('Please set goals for both users');
    }
});

document.getElementById('log-workout').addEventListener('click', () => {
    workoutLogging.classList.toggle('hidden');
});

document.getElementById('log-josh').addEventListener('click', () => logWorkout('josh'));
document.getElementById('log-nate').addEventListener('click', () => logWorkout('nate'));

function logWorkout(user) {
    if (user === 'josh' && joshProgress < 7) {
        joshProgress++;
    } else if (user === 'nate' && nateProgress < 7) {
        nateProgress++;
    }
    workoutLogging.classList.add('hidden');
    saveProgress();
    updateUI();
    checkMilestones(user);
}

function loadProgress() {
    joshGoal = parseInt(localStorage.getItem('joshGoal')) || 0;
    nateGoal = parseInt(localStorage.getItem('nateGoal')) || 0;
    joshProgress = parseInt(localStorage.getItem('joshProgress')) || 0;
    nateProgress = parseInt(localStorage.getItem('nateProgress')) || 0;
}

function saveProgress() {
    localStorage.setItem('joshProgress', joshProgress);
    localStorage.setItem('nateProgress', nateProgress);
}

function updateUI() {
    document.getElementById('josh-goal-display').textContent = joshGoal;
    document.getElementById('nate-goal-display').textContent = nateGoal;
    document.getElementById('josh-progress').style.width = `${(joshProgress / 7) * 100}%`;
    document.getElementById('nate-progress').style.width = `${(nateProgress / 7) * 100}%`;
}

function checkMilestones(user) {
    const progress = user === 'josh' ? joshProgress : nateProgress;
    const goal = user === 'josh' ? joshGoal : nateGoal;
    
    if (progress === 3) {
        showMessage(`Great job, ${user}! You're on a streak!`);
    }
    
    if (progress === goal) {
        showMessage(`Boom! ${user} reached their goal first!`);
    }
    
    if (progress === 7) {
        showMessage(`Amazing! ${user} worked out every day this week!`);
    }
}

function showMessage(msg) {
    messages.textContent = msg;
    setTimeout(() => {
        messages.textContent = '';
    }, 3000);
}

// Check for end of week (you might want to implement a more sophisticated method)
setInterval(() => {
    const now = new Date();
    if (now.getDay() === 0 && now.getHours() === 0 && now.getMinutes() === 0) {
        endOfWeekSummary();
    }
}, 60000); // Check every minute

function endOfWeekSummary() {
    let message = '';
    if (joshProgress >= joshGoal && nateProgress >= nateGoal) {
        message = 'Congratulations! Both of you met your goals this week!';
    } else if (joshProgress >= joshGoal) {
        message = 'Josh met his goal this week! Great job!';
    } else if (nateProgress >= nateGoal) {
        message = 'Nate met his goal this week! Awesome work!';
    } else {
        message = 'Keep pushing! You can do better next week!';
    }
    showMessage(message);
    
    // Reset progress for the new week
    joshProgress = 0;
    nateProgress = 0;
    saveProgress();
    updateUI();
}