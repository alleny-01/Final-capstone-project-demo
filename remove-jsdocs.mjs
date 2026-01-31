#!/usr/bin/env node

/*
 * Script to remove JSDoc comments from the QuickServe E-commerce codebase
 * This script will remove multi-line comments while preserving single-line comments
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Remove JSDoc comments from file content
 */
function removeJSDocComments(content) {
  // Remove multi-line JSDoc comments (/** ... */)
  content = content.replace(/\/\*\*[\s\S]*?\*\//g, "");

  // Remove empty lines that were left after removing JSDoc comments
  content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

  // Remove leading empty lines
  content = content.replace(/^\s*\n+/, "");

  return content;
}

/*
 * Process a single file to remove JSDoc comments
 */
function processFile(filePath) {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(fullPath, "utf8");
  const originalContent = content;

  // Check if file has JSDoc comments
  if (!content.includes("/**")) {
    console.log(`ℹ️  No JSDoc comments found in: ${filePath}`);
    return false;
  }

  const cleanedContent = removeJSDocComments(content);

  if (cleanedContent !== originalContent) {
    fs.writeFileSync(fullPath, cleanedContent);
    console.log(`✅ Removed JSDoc comments from: ${filePath}`);
    return true;
  }

  return false;
}

/*
 * Get all TypeScript/JavaScript files recursively
 */
function getAllFiles(dir, fileList = []) {
  const fullDir = path.join(__dirname, dir);

  if (!fs.existsSync(fullDir)) {
    return fileList;
  }

  const files = fs.readdirSync(fullDir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fullPath = path.join(__dirname, filePath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and dist directories
      if (
        !file.includes("node_modules") &&
        !file.includes("dist") &&
        !file.includes(".git")
      ) {
        getAllFiles(filePath, fileList);
      }
    } else if (
      file.endsWith(".ts") ||
      file.endsWith(".tsx") ||
      file.endsWith(".js") ||
      file.endsWith(".jsx")
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/*
 * Remove component header comments specifically
 */
function removeComponentHeaders() {
  const componentFiles = [
    "src/features/cart/components/CartDrawer.tsx",
    "src/features/checkout/components/CheckoutForm.tsx",
    "src/features/products/components/ProductCard.tsx",
  ];

  componentFiles.forEach((filePath) => {
    const fullPath = path.join(__dirname, filePath);

    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf8");

      // Remove the specific component header comments
      const headerPatterns = [
        /\/\*\*\s*\*\s*CartDrawer Component[\s\S]*?\*\//,
        /\/\*\*\s*\*\s*CheckoutForm Component[\s\S]*?\*\//,
        /\/\*\*\s*\*\s*ProductCard Component[\s\S]*?\*\//,
      ];

      let modified = false;
      headerPatterns.forEach((pattern) => {
        if (pattern.test(content)) {
          content = content.replace(pattern, "");
          modified = true;
        }
      });

      if (modified) {
        // Clean up extra newlines
        content = content.replace(/\n\s*\n\s*\n/g, "\n\n");
        content = content.replace(/^\s*\n+/, "");

        fs.writeFileSync(fullPath, content);
        console.log(`✅ Removed component header from: ${filePath}`);
      }
    }
  });
}

/*
 * Main function to run the JSDoc removal script
 */
async function main() {
  console.log(
    "🧹 Starting to remove JSDoc comments from QuickServe E-commerce codebase...\n",
  );

  try {
    // Get all TypeScript/JavaScript files
    const allFiles = getAllFiles("src");

    console.log(`📁 Found ${allFiles.length} TypeScript/JavaScript files`);
    console.log("🔍 Processing files...\n");

    let processedCount = 0;

    // Process each file
    allFiles.forEach((filePath) => {
      if (processFile(filePath)) {
        processedCount++;
      }
    });

    console.log("\n🎯 Removing specific component headers...");
    removeComponentHeaders();

    console.log("\n✨ JSDoc removal complete!");
    console.log("\n📋 Summary:");
    console.log(`- 📁 Scanned ${allFiles.length} files`);
    console.log(`- 🧹 Cleaned ${processedCount} files`);
    console.log("- ✅ Removed all /** */ style comments");
    console.log("- ✅ Preserved single-line // comments");
    console.log("- ✅ Cleaned up extra whitespace");
  } catch (error) {
    console.error("❌ Error running JSDoc removal script:", error);
  }
}

// Run the script
main();
