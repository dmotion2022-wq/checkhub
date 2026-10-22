// Test di fumo: apre app/index.html, naviga le viste principali e controlla
// che non ci siano errori JavaScript né scorrimento orizzontale (desktop e telefono).
// Uso: npm test   (richiede: npm install)
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const url = 'file://' + path.resolve(__dirname, '..', 'app', 'index.html');
  const b = await chromium.launch();
  const errs = [];
  for (const [w, name] of [[1280, 'desktop'], [400, 'telefono']]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.goto(url);
    await p.waitForTimeout(300);
    await p.click('[data-open="CM-0001"]');
    for (const tab of ['prev', 'persone', 'materiale', 'file', 'overview']) {
      await p.click(`[data-stab="${tab}"]`);
      await p.waitForTimeout(80);
    }
    for (const nav of ['cal', 'magazzino', 'todo', 'progetti']) {
      await p.click(`[data-nav="${nav}"]`);
      await p.waitForTimeout(80);
    }
    // nuova commessa a passi: commessa → schede → documenti
    await p.click('[data-nav="nuova"]');
    await p.fill('#nc-titolo', 'Commessa di prova');
    await p.dispatchEvent('#nc-titolo', 'change');
    await p.selectOption('#nc-cliente', 'ORG-001');
    await p.click('#ncform button[type=submit]');
    await p.click('[data-ncsk="produzione"][data-v="1"]');
    await p.click('#ncform button[type=submit]');
    await p.setInputFiles('#nc-files', { name: 'brief.pdf', mimeType: 'application/pdf', buffer: Buffer.from('x') });
    await p.screenshot({ path: path.join(__dirname, `screenshot-${name}-nuova.png`) });
    await p.click('#ncform button[type=submit]');
    for (const tab of ['produzione', 'file', 'persone']) {
      if (!await p.$(`[data-stab="${tab}"]`)) errs.push(`${name}: manca la scheda ${tab} nella commessa creata`);
      else await p.click(`[data-stab="${tab}"]`);
    }
    await p.click('[data-nav="progetti"]');
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) errs.push(`${name}: scorrimento orizzontale (${sw}px su ${w}px)`);
    await p.screenshot({ path: path.join(__dirname, `screenshot-${name}.png`) });
  }
  await b.close();
  if (errs.length) { console.error('ERRORI\n' + errs.join('\n')); process.exit(1); }
  console.log('ok: nessun errore, nessuno scorrimento orizzontale');
})();
