#!/usr/bin/env node

/**
 * Nexo.AI Vercel Container Setup Script
 * 
 * This script helps you:
 * 1. Deploy the container project to Vercel
 * 2. Configure it for public access
 * 3. Get the Project ID for your backend
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Nexo.AI Vercel Container Setup\n');

// Check if vercel CLI is installed
try {
    execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
    console.error('❌ Vercel CLI not found!');
    console.log('\n📦 Install it with: npm install -g vercel\n');
    process.exit(1);
}

console.log('✅ Vercel CLI is installed\n');

// Step 1: Login check
console.log('📝 Step 1: Checking Vercel authentication...');
try {
    execSync('vercel whoami', { stdio: 'ignore' });
    console.log('✅ Already logged in to Vercel\n');
} catch (error) {
    console.log('⚠️  Not logged in. Please run: vercel login\n');
    process.exit(1);
}

// Step 2: Deploy
console.log('📝 Step 2: Deploying container project to Vercel...');
console.log('   This will create the project and give you a Project ID\n');

try {
    console.log('Running: vercel --prod\n');
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('\n✅ Deployment successful!\n');
} catch (error) {
    console.error('❌ Deployment failed!');
    console.log('\nTry running manually: vercel --prod\n');
    process.exit(1);
}

// Step 3: Get project info
console.log('📝 Step 3: Retrieving project information...\n');

console.log('═══════════════════════════════════════════════════════');
console.log('📋 NEXT STEPS:');
console.log('═══════════════════════════════════════════════════════\n');

console.log('1️⃣  Get your Project ID:');
console.log('   Run: vercel ls');
console.log('   Or visit: https://vercel.com/dashboard\n');

console.log('2️⃣  Add to your backend .env file:');
console.log('   VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxx');
console.log('   VERCEL_TOKEN=your_token_here\n');

console.log('3️⃣  Configure public access in Vercel Dashboard:');
console.log('   → Go to project settings');
console.log('   → Deployment Protection');
console.log('   → Disable all protections (Password, Vercel Auth, Trusted IPs)\n');

console.log('4️⃣  Update backend/index.js to use VERCEL_PROJECT_ID\n');

console.log('═══════════════════════════════════════════════════════');
console.log('📚 Full documentation in README.md');
console.log('═══════════════════════════════════════════════════════\n');

console.log('✨ Setup complete! Follow the steps above to finish configuration.\n');
