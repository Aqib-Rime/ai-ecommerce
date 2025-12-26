import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  // Product management
  product: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  // Order management (future)
  order: ["read", "update", "cancel", "refund"],
  // Inventory
  inventory: ["read", "update"],
} as const;

export const ac = createAccessControl(statement);

// Admin: Full control over everything including user management
export const admin = ac.newRole({
  ...adminAc.statements,
  product: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  order: ["read", "update", "cancel", "refund"],
  inventory: ["read", "update"],
});

// Manager: Can manage products/orders but NOT users
export const manager = ac.newRole({
  product: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  order: ["read", "update", "cancel", "refund"],
  inventory: ["read", "update"],
});

// Staff: Can view orders and update stock only
export const staff = ac.newRole({
  product: ["read"],
  category: ["read"],
  order: ["read", "update"],
  inventory: ["read", "update"],
});

// User (customer): View products/categories, read own orders
export const user = ac.newRole({
  product: ["read"],
  category: ["read"],
  order: ["read"],
});
