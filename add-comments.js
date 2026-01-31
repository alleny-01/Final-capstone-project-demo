#!/usr/bin/env node

/**
 * Script to add comprehensive comments to the QuickServe E-commerce codebase
 * This script will add JSDoc comments and inline comments to improve code documentation
 */

const fs = require("fs");
const path = require("path");

// Files to add comments to with their comment templates
const filesToComment = [
  {
    path: "src/features/checkout/hooks/usePaystack.ts",
    comments: {
      imports:
        "// Import necessary dependencies for Paystack payment integration",
      interface: "// Define the structure of Paystack payment response",
      hook: "// Custom hook for handling Paystack payment integration",
      config: "// Payment configuration state for dynamic updates",
      success: "// Handle successful payment completion",
      process: "// Process payment with form data and trigger Paystack modal",
    },
  },
  {
    path: "src/features/cart/stores/useCartStore.ts",
    comments: {
      imports: "// Import Zustand for state management and cart types",
      interface:
        "// Define the cart store interface with all methods and state",
      store: "// Create Zustand store for cart management with persistence",
      calculations: "// Calculate cart totals including VAT (7.5%)",
    },
  },
  {
    path: "src/features/products/api/products.api.ts",
    comments: {
      imports: "// Import axios instance and product types",
      data: "// Dummy product data for development and testing",
      api: "// API functions for fetching products with filtering",
    },
  },
  {
    path: "src/features/cart/components/CartDrawer.tsx",
    comments: {
      imports: "// Import UI components and cart functionality",
      component: "// Cart drawer component with slide-out panel",
      render: "// Render cart items and checkout button",
    },
  },
  {
    path: "src/features/checkout/components/CheckoutForm.tsx",
    comments: {
      imports: "// Import form handling and validation dependencies",
      component: "// Checkout form with validation and Paystack integration",
      form: "// Form setup with Zod validation schema",
      submit: "// Handle form submission and trigger payment",
    },
  },
];

/**
 * Add comments to a TypeScript/JavaScript file
 * @param {string} filePath - Path to the file
 * @param {Object} commentMap - Map of comment locations to comment text
 */
function addCommentsToFile(filePath, commentMap) {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, "utf8");
  let modified = false;

  // Add import comments
  if (commentMap.imports && !content.includes(commentMap.imports)) {
    content = commentMap.imports + "\n" + content;
    modified = true;
  }

  // Add interface comments
  if (
    commentMap.interface &&
    content.includes("interface ") &&
    !content.includes(commentMap.interface)
  ) {
    content = content.replace(
      /interface /g,
      `${commentMap.interface}\ninterface `,
    );
    modified = true;
  }

  // Add hook/component comments
  if (
    commentMap.hook &&
    content.includes("export function ") &&
    !content.includes(commentMap.hook)
  ) {
    content = content.replace(
      /export function /g,
      `${commentMap.hook}\nexport function `,
    );
    modified = true;
  }

  if (
    commentMap.component &&
    content.includes("export function ") &&
    !content.includes(commentMap.component)
  ) {
    content = content.replace(
      /export function /g,
      `${commentMap.component}\nexport function `,
    );
    modified = true;
  }

  // Add store comments
  if (
    commentMap.store &&
    content.includes("create(") &&
    !content.includes(commentMap.store)
  ) {
    content = content.replace(/create\(/g, `${commentMap.store}\ncreate(`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Added comments to: ${filePath}`);
  } else {
    console.log(`ℹ️  Comments already exist in: ${filePath}`);
  }
}

/**
 * Add comprehensive JSDoc comments to key functions
 */
function addJSDocComments() {
  const jsDocFiles = [
    {
      path: "src/features/cart/utils/cart-calculations.ts",
      content: `// Utility functions for cart calculations
/**
 * Calculate subtotal from cart items
 * @param items - Array of cart items
 * @returns Subtotal amount
 */

/**
 * Calculate VAT (7.5%) on subtotal
 * @param subtotal - Subtotal amount
 * @returns VAT amount
 */

/**
 * Calculate total including VAT
 * @param subtotal - Subtotal amount
 * @param vat - VAT amount
 * @returns Total amount
 */`,
    },
  ];

  jsDocFiles.forEach((file) => {
    const fullPath = path.join(__dirname, file.path);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf8");
      if (!content.includes("/**")) {
        content = file.content + "\n\n" + content;
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Added JSDoc comments to: ${file.path}`);
      }
    }
  });
}

/**
 * Add README files for each feature
 */
function addFeatureREADMEs() {
  const features = [
    {
      name: "cart",
      description:
        "Shopping cart functionality with persistent state management",
    },
    {
      name: "checkout",
      description: "Checkout process with Paystack payment integration",
    },
    {
      name: "products",
      description: "Product catalog with filtering and search capabilities",
    },
  ];

  features.forEach((feature) => {
    const readmePath = path.join(
      __dirname,
      `src/features/${feature.name}/README.md`,
    );

    if (!fs.existsSync(readmePath)) {
      const readmeContent = `# ${feature.name.charAt(0).toUpperCase() + feature.name.slice(1)} Feature

${feature.description}

## Structure

- \`components/\` - UI components for this feature
- \`hooks/\` - Custom hooks for data fetching and state management
- \`types/\` - TypeScript interfaces and types
- \`api/\` - API integration functions
- \`stores/\` - State management (Zustand)
- \`utils/\` - Utility functions

## Usage

Import components and hooks from the feature's index file:

\`\`\`typescript
import { Component, useHook } from '@/features/${feature.name}';
\`\`\`
`;

      fs.writeFileSync(readmePath, readmeContent);
      console.log(`✅ Created README for: ${feature.name} feature`);
    }
  });
}

/**
 * Main function to run the commenting script
 */
function main() {
  console.log(
    "🚀 Starting to add comments to QuickServe E-commerce codebase...\n",
  );

  // Add comments to specific files
  filesToComment.forEach((file) => {
    addCommentsToFile(file.path, file.comments);
  });

  console.log("\n📝 Adding JSDoc comments...");
  addJSDocComments();

  console.log("\n📚 Adding feature README files...");
  addFeatureREADMEs();

  console.log("\n✨ Comment addition complete!");
  console.log("\n📋 Summary:");
  console.log("- Added inline comments to key files");
  console.log("- Added JSDoc documentation");
  console.log("- Created feature README files");
  console.log("- Improved code documentation throughout the project");
}

// Run the script
main();
