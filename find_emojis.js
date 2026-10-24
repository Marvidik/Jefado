const fs = require('fs');
const path = require('path');

const emojiRegex = /([\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}])/u;

const byFile = {};

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        if (f === 'node_modules' || f === '.next' || f === '.git' || f === 'scratch' || f === '.system_generated' || f === 'find_emojis.js') continue;
        const full = path.join(dir, f);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            walk(full);
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            const content = fs.readFileSync(full, 'utf8');
            const lines = content.split('\n');
            lines.forEach((line, i) => {
                const match = line.match(emojiRegex);
                if (match) {
                    if (!byFile[full]) byFile[full] = [];
                    byFile[full].push({ line: i + 1, emoji: match[0], content: line.trim() });
                }
            });
        }
    }
}

walk('./app');
for (const [file, items] of Object.entries(byFile)) {
    console.log(`=== ${file} (${items.length}) ===`);
    items.forEach(it => console.log(`  L${it.line} [${it.emoji}]: ${it.content.slice(0, 100)}`));
}
