#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateTimeline() {
  const timelinePath = path.join(__dirname, '../src/data/timeline.json');
  const versionPath = path.join(__dirname, '../src/data/version.json');
  
  try {
    // Read current data
    const timelineData = JSON.parse(await fs.readFile(timelinePath, 'utf8'));
    const versionData = JSON.parse(await fs.readFile(versionPath, 'utf8'));
    
    // Update metadata
    const today = new Date().toISOString().split('T')[0];
    timelineData.metadata.lastUpdated = today;
    
    // Increment version
    const [major, minor, patch] = versionData.version.split('.').map(Number);
    versionData.version = `${major}.${minor}.${patch + 1}`;
    versionData.lastUpdated = today;
    
    // Write updated files
    await fs.writeFile(timelinePath, JSON.stringify(timelineData, null, 2));
    await fs.writeFile(versionPath, JSON.stringify(versionData, null, 2));
    
    console.log(`✅ Timeline updated to version ${versionData.version}`);
    console.log(`📅 Last updated: ${today}`);
    
    // Remind to commit and deploy
    console.log('\n📝 Next steps:');
    console.log('1. Review changes: git diff');
    console.log('2. Commit: git add -A && git commit -m "Update timeline"');
    console.log('3. Push: git push');
    console.log('4. Deploy: npm run deploy');
    
  } catch (error) {
    console.error('❌ Error updating timeline:', error);
    process.exit(1);
  }
}

// Run if called directly
if (process.argv[1] === __filename) {
  updateTimeline();
}

export default updateTimeline;