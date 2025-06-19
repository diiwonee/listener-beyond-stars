const chapters = [
  {
    id: 1,
    image: 'assets/images/IMG-03.png',
    text: `You awaken to silence.  
The cold light of distant stars filters into the capsule through the viewport.  
There is no memory of how you got here—only the hum of dormant machinery, and a blinking panel awaiting your touch.  
  
Your body feels weightless, your breath calm.  
A single question echoes in your mind: *Where am I?*`,
    choices: [
      { text: 'Check ship systems', next: 2 },
      { text: 'Gaze outside into space', next: 2 }
    ]
  },
  {
    id: 2,
    image: 'assets/images/Chapter02.png',
    text: `As you activate the console, screens flicker to life.  
  
Coordinates. Trajectory. Silence.  
One signal pulses on the outer edge of the system — a weak beacon, rhythmic and deliberate.  
  
Through the frosted window, you see a swirl of light — perhaps a planet or an artificial structure — surrounded by faint anomalies.  
  
You're not alone in this void. Something is calling.`,
    choices: [
      { text: 'Set course for the signal', next: 3 },
      { text: 'Ignore the signal and drift', next: 4 }
    ]
  },
  {
    id: 3,
    image: 'assets/images/Chapter03.png',
    text: `You input the coordinates. The capsule trembles as thrusters engage.  
  
The signal intensifies. Every few seconds, your receiver captures fragments:  
A voice, distorted. A melody. Then static.  
  
The vessel approaches what seems to be a station — ancient, rotating slowly, surrounded by debris and quiet energy surges.  
  
The outer hull glows faintly. A docking port opens as if expecting you.`,
    choices: [
      { text: 'Send an encrypted signal', next: 4 },
      { text: 'Dock without contact', next: 4 }
    ]
  },
  {
    id: 4,
    image: 'assets/images/Chapter04.png',
    text: `Inside, the corridors are dim and pulsing with soft cyan light.  
You walk past panels covered in unknown glyphs, flickering screens, and preserved remnants of what looks like alien writing.  
  
Then — a chamber. In its center hovers a sphere, vibrating like a heartbeat.  
  
As you approach, your mind floods with memories not your own:  
Worlds consumed by silence. A last message hidden in time. A story that must be heard.`,
    choices: [
      { text: 'Touch the sphere', next: 5 },
      { text: 'Turn back', next: 5 }
    ]
  },
  {
    id: 5,
    image: 'assets/images/Chapter5.jpeg',
    text: `The sphere dissolves into starlight as you touch it.  
  
Visions fill your consciousness: generations of beings reaching out, across time and distance, hoping for a Listener.  
  
You are that Listener.  
  
And now, their story lives on — through you.  
  
As the station fades, and your ship drifts once more into the stars, you realize:  
You were never alone.`,
    choices: [
      { text: 'Restart the story', next: 1 }
    ],
    isFinal: true
  }
];

let currentChapterIndex = 0;
const mainTheme = new Audio('assets/audio/main-theme.mp3');
mainTheme.loop = true;
mainTheme.volume = 0.5;

let epilogueAudio;

function showChapter(index) {
  const chapter = chapters.find(ch => ch.id === index);
  if (!chapter) return;

  currentChapterIndex = index;
  document.getElementById('chapter-image').src = chapter.image;
  document.getElementById('chapter-text').innerText = chapter.text;

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  // Показывать форму комментария только на финальной главе
  if (chapter.isFinal) {
    mainTheme.pause();
    epilogueAudio = new Audio('assets/audio/epilogue.mp3');
    epilogueAudio.play();
    document.getElementById('comment-form').style.display = 'block';
  } else {
    document.getElementById('comment-form').style.display = 'none';
  }

  chapter.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-button';
    btn.textContent = choice.text;
    btn.onclick = () => {
      if (chapter.isFinal && epilogueAudio) {
        epilogueAudio.pause();
        mainTheme.currentTime = 0;
        mainTheme.play();
      }
      showChapter(choice.next);
    };
    choicesDiv.appendChild(btn);
  });
}

window.onload = () => {
  showChapter(1);
  mainTheme.play();
};

// Comment form logic
const form = document.getElementById('feedbackForm');
const status = document.getElementById('form-status');
const commentForm = document.getElementById('comment-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(form);
  fetch('https://script.google.com/macros/s/AKfycbzITFWjCxhOcMlUm9OKGlTSnCU-RAWlzoVNIJCYCL1WSpfJ8GVgry7ZfO84EcgjZXWpUg/exec', {
    method: 'POST',
    body: data
  })
    .then(res => res.text())
    .then(msg => {
      form.reset();
      status.innerText = "✨ Thank you for your comment!";
    })
    .catch(() => {
      status.innerText = "❌ Failed to send. Please try again.";
    });
});
