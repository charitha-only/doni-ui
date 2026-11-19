#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];

const banner = `
   ⚡ Doni UI CLI (v0.7.0)
   Ultra-fast, spring-animated React UI library
`;

console.log(banner);

if (!command || command === '--help' || command === '-h') {
  console.log(`
Usage:
  npx doni-ui init               Initialize Doni UI theme & Tailwind config in current project
  npx doni-ui add <component>   Copy a specific component into your src/components/ui
  npx doni-ui list              List all available Doni UI components

Examples:
  npx doni-ui add tubelight-navbar
  npx doni-ui add spotlight-card
  npx doni-ui add flame-button
  npx doni-ui add button
  `);
  process.exit(0);
}

const COMPONENTS_DIR = path.resolve(__dirname, '../src/components/ui');

if (command === 'list') {
  if (fs.existsSync(COMPONENTS_DIR)) {
    const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.tsx'));
    console.log('Available Doni UI Components:');
    files.forEach(f => console.log(`  - ${f.replace('.tsx', '')}`));
  } else {
    console.log('No components directory found.');
  }
  process.exit(0);
}

if (command === 'add') {
  if (!target) {
    console.error('Error: Please specify a component name to add. (e.g. npx doni-ui add button)');
    process.exit(1);
  }

  const componentFileName = target.endsWith('.tsx') ? target : `${target}.tsx`;
  const srcFile = path.join(COMPONENTS_DIR, componentFileName);

  if (!fs.existsSync(srcFile)) {
    console.error(`Error: Component "${target}" not found.`);
    console.log('Run "npx doni-ui list" to see all available components.');
    process.exit(1);
  }

  // Target directory in user's project
  const destDir = path.resolve(process.cwd(), 'src/components/ui');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = path.join(destDir, componentFileName);
  fs.copyFileSync(srcFile, destFile);

  const DEPENDENCY_MAP = {
    'animated-icons': ['animated-icons-suite.tsx', 'animated-catalog-icon.tsx', 'icon-customizer-modal.tsx', 'animated-social-icons.tsx'],
    'animated-icons-suite': ['icon-customizer-modal.tsx'],
    'animated-catalog-icon': ['icon-customizer-modal.tsx'],
    'icon-customizer-modal': ['animated-icons-suite.tsx'],
    'data-table': ['button.tsx', 'input.tsx', 'badge.tsx'],
    'file-upload': ['button.tsx'],
    'drawer': ['button.tsx'],
    'carousel': ['button.tsx'],
    'color-picker': ['button.tsx', 'input.tsx'],
    'pagination': ['button.tsx'],
    'stat-card': ['badge.tsx'],
  };

  const deps = DEPENDENCY_MAP[target.replace('.tsx', '')] || [];
  for (const dep of deps) {
    const depSrc = path.join(COMPONENTS_DIR, dep);
    const depDest = path.join(destDir, dep);
    if (fs.existsSync(depSrc)) {
      fs.copyFileSync(depSrc, depDest);
      console.log(`   📦 Included required dependency: ${dep}`);
    }
  }

  console.log(`✅ Success! Component "${target}" has been added to:`);
  console.log(`   ${path.relative(process.cwd(), destFile)}`);
  console.log(`\nYou can now import it in your code:`);
  console.log(`   import { ... } from '@/components/ui/${target}';\n`);
  process.exit(0);
}

if (command === 'init') {
  console.log('Initializing Doni UI in your workspace...');
  const targetDir = path.resolve(process.cwd(), 'src/lib');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const utilsSrc = path.resolve(__dirname, '../src/lib/utils.ts');
  const utilsDest = path.join(targetDir, 'utils.ts');
  if (fs.existsSync(utilsSrc)) {
    fs.copyFileSync(utilsSrc, utilsDest);
    console.log('✅ Created src/lib/utils.ts with clsx, twMerge, and spring transitions.');
  }

  console.log('\n⚡ Doni UI initialized successfully! Run "npx doni-ui add <component>" to install components.');
  process.exit(0);
}

console.log(`Unknown command: "${command}". Run "npx doni-ui --help" for available commands.`);
