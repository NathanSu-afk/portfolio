console.log('IT\'S ALIVE!');

export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// STEP 3: Navigation Data
let pages = [
  { url: 'index.html', title: 'Home' },
  { url: 'projects/index.html', title: 'Projects' },
  { url: 'contact/index.html', title: 'Contact' },
  { url: 'resume/index.html', title: 'Resume' },
  { url: 'https://github.com/NathanSu-afk', title: 'GitHub' },
];

// Create the nav element and add it to the top of the page
let nav = document.createElement('nav');
document.body.prepend(nav);

// STEP 3.1: Base Path Logic (Fixes links on GitHub Pages)
const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1") 
  ? "/" 
  : "/nathansu-afk.github.io/"; 

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Adjust relative URLs with the BASE_PATH
  url = !url.startsWith('http') ? BASE_PATH + url : url;

  // STEP 3.2: Create link elements
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  // Highlight current page
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.append(a);
}

// STEP 4: Dark Mode Switcher (Step 4.2)
document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select id="theme-switcher">
			<option value="light dark">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>`
);

const select = document.querySelector('#theme-switcher');

// Step 4.3 & 4.4: Function to update the theme
function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  select.value = colorScheme;
}

// Step 4.5: Respond to user changing the dropdown and save preference
select.addEventListener('input', function (event) {
  setColorScheme(event.target.value);
  localStorage.colorScheme = event.target.value; 
});

// Load saved preference on page load
if (localStorage.colorScheme) {
  setColorScheme(localStorage.colorScheme);
}