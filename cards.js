// =========================
// Post Data
// =========================
const allPosts = [
    { img: './assets/test_img.webp', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', newPost: true, url: 'broken_concrete' },
    { img: './assets/test_img2.jpg', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img3.webp', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img3.webp', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img.webp', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img2.jpg', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img2.jpg', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img3.webp', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },
    { img: './assets/test_img.webp', title: "BROKEN CONCRETE - I'm falling apart.", date: '01/26/26', url: 'broken_concrete' },

];

// =========================
// Globals
// =========================
let loadedCount = 0;
const loadStep = 9;
const columns = document.querySelectorAll('.post-container .column');

// =========================
// Function to create a card
// =========================
function createCard(post) {
    const cardEl = document.createElement('a');
    cardEl.href = `./posts/${post.url}/index.html`;
    cardEl.className = 'card';
    cardEl.innerHTML = `<img src="${post.img}">
        <span>
            <h1>${post.title}</h1>
            <span>${post.date}</span>
        </span>
        ${post.newPost ? '<div class="new-post">NEW</div>' : ''}`;
    return cardEl;
}

// =========================
// Function to load posts incrementally
// =========================
function loadPosts() {
    for (let i = loadedCount; i < loadedCount + loadStep && i < allPosts.length; i++) {
        const post = allPosts[i];
        const colIndex = i % columns.length;
        const cardEl = createCard(post);
        columns[colIndex].appendChild(cardEl);


        // Animate fade-in by adding the "visible" class on next frame
        requestAnimationFrame(() => {
            cardEl.classList.add('visible');
        });
    }
    loadedCount += loadStep;
}

// =========================
// Scroll-based lazy loading
// =========================
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        loadPosts();
    }
});

// =========================
// Optional: Theme swap
// =========================
function swapTheme() {
    const root = document.documentElement;
    const bg = getComputedStyle(root).getPropertyValue('--bg')?.trim();
    if (bg === 'white') {
        root.style.setProperty('--bg', '#0f0f12');
        root.style.setProperty('--fg', '#f2f2f7');
    } else {
        root.style.setProperty('--bg', 'white');
        root.style.setProperty('--fg', 'black');
    }
}

// =========================
// Initial load
// =========================
loadPosts();