const list = document.getElementById('ca-list');

if (list) {
  (async () => {
    try {
      const links = await fetchJson('/catalunya/links.json');
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
