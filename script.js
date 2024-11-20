function meowLog(...input) {
  console.log('=^..^= < Meow!\n' + input.map(item => typeof item === 'object' ? JSON.stringify(item, null, 2) : item).join('\n'));
}

const now = new Date();
meowLog('Now loading...');
meowLog('Please wait...')

const body = document.body;

async function fetchJson(path) {
  meowLog(`Try to fetch ${path}.`);
  const response = await fetch(path);
  if (!response.ok) return console.error(`Failed to fetch ${path}.`);
  const rawData = await response.text();
  const data = JSON.parse(rawData);
  meowLog(`Successfully fetched ${path}.`, data);
  return data;
};

async function fetchText(path) {
  meowLog(`Try to fetch ${path}.`);
  const response = await fetch(path);
  if (!response.ok) return console.error(`Failed to fetch ${path}.`);
  const rawData = await response.text();
  let data = rawData;
  if (data.endsWith('\n')) data = data.slice(0, -1);
  data = data.replace(/\n/g, '<br>');
  meowLog(`Successfully fetched ${path}.`, data);
  return data;
};

const bio = document.getElementById('bio');

if (bio) {
  (async () => {
    const text = await fetchText('/bio.txt');
    if (text) {
      bio.textContent = null;
      bio.innerHTML = text;
    }
  })();
}

(async () => {
  const author = document.createElement('div');
  author.className = 'author';

  const home = document.createElement('a');
  home.className = 'home';
  home.href = '/';

  const logo = document.createElement('img');
  logo.src = '/img/logo.png';
  logo.alt = 'Home';
  logo.title = 'Home';

  home.appendChild(logo);
  author.appendChild(home);

  const list = document.createElement('div');
  list.className = 'list';
  list.textContent = 'Extra Links:';

  author.appendChild(list);

  try {
    const links = await fetchJson('/author-links.json');
    for (const link of links) {
      const a = document.createElement('a');
      if (link.class) a.className = link.class;
      a.href = link.url;
      a.textContent = link.title;
      a.target = '_blank';

      list.appendChild(a);
    }

    body.appendChild(author);
  } catch (e) {
    console.error(e);
  }
})();

const list = document.getElementById('links-list');

if (list) {
  (async () => {
    try {
      const links = await fetchJson('/links.json');
      for (const link of links) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.title;
        a.target = '_blank';

        li.appendChild(a);
        list.appendChild(li);
      }
    } catch (e) {
      console.error(e);
    }
  })();
}

const footer = document.createElement('footer');
footer.innerHTML = '<p>&copy; 2024 otoneko. All rights reserved.</p>';

body.appendChild(footer);

document.addEventListener("DOMContentLoaded", async function () {
  const typedOutputs = document.querySelectorAll('.typing');

  for (const typedOutput of typedOutputs) {
    const textToType = typedOutput.getAttribute('content');
    const cooldown = Math.min(300, 5 * 1000 / textToType.length);
    meowLog(`Cooldown for typing "${textToType}":\n${cooldown} ms`);
    let index = 0;
    let cursorInterval;

    async function typeText() {
      if (index < textToType.length) {
        if (textToType.charAt(index) === ';') {
          typedOutput.innerHTML += '<br>';
        } else {
          typedOutput.innerHTML += textToType.charAt(index);
        }

        index++;
        setTimeout(typeText, cooldown);
      } else {
        clearInterval(cursorInterval);
        typedOutput.classList.add('no-cursor');
      }
    }
    await typeText();
  }
});

meowLog(`Successfully loaded! Total time: ${new Date() - now}`);
