#!/usr/bin/env node

/**
 * Script to add comprehensive comments to the QuickServe E-commerce codebase
 * This script will add JSDoc comments and inline comments to improve code documentation
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Add comprehensive comments to key files
 */
async function addCommentsToFiles() {
  const filesToUpdate = [
    {
      path: "src/features/checkout/hooks/usePaystack.ts",
      updates: [
        {
          search: "import { usePaystackPayment }",
          replace:
            "// Import necessary dependencies for Paystack payment integration\nimport { usePaystackPayment }",
        },
        {
          search: "interface PaystackReference {",
          replace:
            "// Define the structure of Paystack payment response\ninterface PaystackReference {",
        },
        {
          search: "export function usePaystack() {",
          replace:
            "// Custom hook for handling Paystack payment integration\nexport function usePaystack() {",
        },
      ],
    },
    {
      path: "src/features/cart/stores/useCartStore.ts",
      updates: [
        {
          search: "import { create }",
          replace:
            "// Import Zustand for state management and cart types\nimport { create }",
        },
        {
          search: "interface CartStore {",
          replace:
            "// Define the cart store interface with all methods and state\ninterface CartStore {",
        },
      ],
    },
    {
      path: "src/features/products/api/products.api.ts",
      updates: [
        {
          search: "import axios",
          replace: "// Import axios instance and product types\nimport axios",
        },
        {
          search: "const DUMMY_PRODUCTS",
          replace:
            "// Dummy product data for development and testing\nconst DUMMY_PRODUCTS",
        },
      ],
    },
  ];

  for (const file of filesToUpdate) {
    const fullPath = path.join(__dirname, file.path);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${file.path}`);
      continue;
    }

    let content = fs.readFileSync(fullPath, "utf8");
    let modified = false;

    for (const update of file.updates) {
      if (
        content.includes(update.search) &&
        !content.includes(update.replace)
      ) {
        content = content.replace(update.search, update.replace);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Added comments to: ${file.path}`);
    } else {
      console.log(
        `ℹ️  Comments already exist or file not modified: ${file.path}`,
      );
    }
  }
}

/**
 * Add feature README files
 */
async function addFeatureREADMEs() {
  const features = [
    {
      name: "cart",
      description:
        "Shopping cart functionality with persistent state management",
      components: ["CartDrawer", "CartIcon", "CartItem", "CartSummary"],
      hooks: ["useCartStore"],
      features: [
        "Add/remove items",
        "Quantity management",
        "Price calculations",
        "Persistent storage",
      ],
    },
    {
      name: "checkout",
      description: "Checkout process with Paystack payment integration",
      components: [
        "CheckoutForm",
        "OrderSummary",
        "CheckoutPage",
        "ConfirmationPage",
      ],
      hooks: ["usePaystack"],
      features: [
        "Form validation",
        "Payment processing",
        "Order confirmation",
        "Error handling",
      ],
    },
    {
      name: "products",
      description: "Product catalog with filtering and search capabilities",
      components: [
        "ProductCard",
        "ProductGrid",
        "ProductFilters",
        "ProductSkeleton",
      ],
      hooks: ["useProducts", "useProductFilters"],
      features: [
        "Product listing",
        "Category filtering",
        "Search functionality",
        "Loading states",
      ],
    },
  ];

  for (const feature of features) {
    const readmePath = path.join(
      __dirname,
      `src/features/${feature.name}/README.md`,
    );

    if (!fs.existsSync(readmePath)) {
      const readmeContent = `# ${feature.name.charAt(0).toUpperCase() + feature.name.slice(1)} Feature

${feature.description}

## Components

${feature.components.map((comp) => `- **${comp}** - ${comp} component`).join("\n")}

## Hooks

${feature.hooks.map((hook) => `- **${hook}** - Custom hook for ${feature.name} functionality`).join("\n")}

## Key Features

${feature.features.map((feat) => `- ${feat}`).join("\n")}

## Structure

\`\`\`
${feature.name}/
├── components/     # UI components
├── hooks/         # Custom hooks
├── types/         # TypeScript types
├── api/          # API functions
├── stores/       # State management
└── utils/        # Utility functions
\`\`\`

## Usage

\`\`\`typescript
import { ${feature.components[0]} } from '@/features/${feature.name}/components';
import { ${feature.hooks[0]} } from '@/features/${feature.name}/hooks';
\`\`\`
`;

      fs.writeFileSync(readmePath, readmeContent);
      console.log(`✅ Created README for: ${feature.name} feature`);
    } else {
      console.log(`ℹ️  README already exists for: ${feature.name} feature`);
    }
  }
}

/**
 * Add comprehensive JSDoc comments to utility functions
 */
async function addJSDocComments() {
  const utilsPath = path.join(
    __dirname,
    "src/features/cart/utils/cart-calculations.ts",
  );

  if (fs.existsSync(utilsPath)) {
    let content = fs.readFileSync(utilsPath, "utf8");

    if (!content.includes("/**")) {
      const jsDocHeader = `/**
 * Cart calculation utilities
 * Handles all cart-related mathematical operations including VAT calculations
 */

`;
      content = jsDocHeader + content;

      // Add JSDoc to individual functions
      content = content.replace(
        /export const calculateSubtotal/g,
        `/**
 * Calculate subtotal from cart items
 * @param items - Array of cart items with product and quantity
 * @returns Subtotal amount before VAT
 */
export const calculateSubtotal`,
      );

      content = content.replace(
        /export const calculateVAT/g,
        `/**
 * Calculate VAT (7.5%) on subtotal
 * @param subtotal - Subtotal amount
 * @returns VAT amount (7.5% of subtotal)
 */
export const calculateVAT`,
      );

      content = content.replace(
        /export const calculateTotal/g,
        `/**
 * Calculate total including VAT
 * @param subtotal - Subtotal amount
 * @param vat - VAT amount
 * @returns Total amount (subtotal + VAT)
 */
export const calculateTotal`,
      );

      fs.writeFileSync(utilsPath, content);
      console.log(`✅ Added JSDoc comments to cart calculations`);
    }
  }
}

/**
 * Add component documentation headers
 */
async function addComponentHeaders() {
  const components = [
    {
      path: "src/features/cart/components/CartDrawer.tsx",
      header: `/**
 * CartDrawer Component
 *
 * A slide-out drawer that displays cart items and checkout functionality.
 * Features:
 * - Displays all cart items with quantities
 * - Shows cart totals (subtotal, VAT, total)
 * - Provides checkout button
 * - Handles empty cart state
 */`,
    },
    {
      path: "src/features/checkout/components/CheckoutForm.tsx",
      header: `/**
 * CheckoutForm Component
 *
 * Form component for collecting customer information and processing payment.
 * Features:
 * - Form validation using Zod schema
 * - Integration with Paystack payment gateway
 * - Error handling and loading states
 * - Responsive design
 */`,
    },
    {
      path: "src/features/products/components/ProductCard.tsx",
      header: `/**
 * ProductCard Component
 *
 * Displays individual product information in a card format.
 * Features:
 * - Product image, name, price display
 * - Add to cart functionality
 * - Stock status indication
 * - Responsive card layout
 */`,
    },
  ];

  for (const component of components) {
    const fullPath = path.join(__dirname, component.path);

    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf8");

      if (!content.includes("/**")) {
        // Add header after imports but before component
        const lines = content.split("\n");
        const importEndIndex = lines.findIndex(
          (line) =>
            line.startsWith("export") ||
            line.startsWith("interface") ||
            line.startsWith("type"),
        );

        if (importEndIndex > 0) {
          lines.splice(importEndIndex, 0, "", component.header, "");
          content = lines.join("\n");
          fs.writeFileSync(fullPath, content);
          console.log(`✅ Added header to: ${component.path}`);
        }
      }
    }
  }
}

/**
 * Main function to run the commenting script
 */
async function main() {
  console.log(
    "🚀 Starting to add comments to QuickServe E-commerce codebase...\n",
  );

  try {
    console.log("📝 Adding inline comments to key files...");
    await addCommentsToFiles();

    console.log("\n📚 Adding feature README files...");
    await addFeatureREADMEs();

    console.log("\n📖 Adding JSDoc comments...");
    await addJSDocComments();

    console.log("\n📋 Adding component headers...");
    await addComponentHeaders();

    console.log("\n✨ Comment addition complete!");
    console.log("\n📋 Summary:");
    console.log("- ✅ Added inline comments to key files");
    console.log("- ✅ Created feature README files");
    console.log("- ✅ Added JSDoc documentation");
    console.log("- ✅ Added component headers");
    console.log("- ✅ Improved code documentation throughout the project");
  } catch (error) {
    console.error("❌ Error running comment script:", error);
  }
}

// Run the script
main();
