const caList = document.getElementById('ca-list');

if (caList) {
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
        caList.appendChild(li);
      }
    } catch (e) {
      console.error(e);
    }
  })();
}
