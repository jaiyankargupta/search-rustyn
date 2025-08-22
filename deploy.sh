#!/bin/bash

echo "🚀 Building Next.js application for export..."
npm run build:export

echo "📦 Static files generated automatically during build..."

echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed!"
echo "🌍 Your app should be available at: https://jaiyankargupta.github.io/searchRustyn/"
