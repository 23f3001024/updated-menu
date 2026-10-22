// Default menu used to seed storage the first time the API runs.
// Three-tier structure:  MENU (main)  →  SECTION / category (sub-menu)  →  item.
// diet: "v" veg, "nv" non-veg | price: number OR string (multi-option)

// ---------------------------------------------------------------------------
// Level 1 — Main menus.
// ---------------------------------------------------------------------------
export const MENUS = [
  { key: "north-indian", label: "North Indian", ico: "🍛" },
  { key: "asian", label: "Asian", ico: "🥢" },
  { key: "general", label: "General", ico: "🍽️" },
];

// ---------------------------------------------------------------------------
// Level 2 — Sub-menus (categories). Each belongs to a main menu.
// Order here is the order they appear on the menu.
// ---------------------------------------------------------------------------
export const SECTIONS = [
  // --- North Indian ---
  { key: "ni-veg-starters", label: "Veg Starters", ico: "🥦", menu: "north-indian" },
  { key: "ni-chicken-starters", label: "Chicken Starters", ico: "🍗", menu: "north-indian" },
  { key: "ni-seafood-starters", label: "Seafood Starters", ico: "🦐", menu: "north-indian" },
  { key: "ni-mutton-starters", label: "Mutton Starters", ico: "🍖", menu: "north-indian" },
  { key: "ni-veg-main", label: "Veg Main Course", ico: "🥘", menu: "north-indian" },
  { key: "ni-dal", label: "Dal", ico: "🫘", menu: "north-indian" },
  { key: "ni-chicken-main", label: "Chicken Main Course", ico: "🍗", menu: "north-indian" },
  { key: "ni-egg", label: "Egg", ico: "🥚", menu: "north-indian" },
  { key: "ni-fish-main", label: "Fish Main Course", ico: "🐟", menu: "north-indian" },
  { key: "ni-mutton-main", label: "Mutton Main Course", ico: "🍖", menu: "north-indian" },
  { key: "ni-rice-biryani", label: "Rice & Biryani", ico: "🍚", menu: "north-indian" },
  { key: "ni-breads", label: "Breads", ico: "🫓", menu: "north-indian" },
  { key: "ni-sides", label: "Sides", ico: "🥗", menu: "north-indian" },

  // --- Asian ---
  { key: "as-quick-bites", label: "Quick Bites", ico: "🍟", menu: "asian" },
  { key: "as-starters", label: "Starters", ico: "🌶️", menu: "asian" },
  { key: "as-main", label: "Main Course", ico: "🍜", menu: "asian" },
  { key: "as-rice-noodles", label: "Rice & Noodles", ico: "🍚", menu: "asian" },
  { key: "as-combos", label: "Combos", ico: "🍱", menu: "asian" },

  // --- General ---
  { key: "gn-beverages", label: "Beverages", ico: "🥤", menu: "general" },
  { key: "gn-desserts", label: "Desserts", ico: "🍰", menu: "general" },
];

// ---------------------------------------------------------------------------
// Level 3 — Items.
// ---------------------------------------------------------------------------
export const SEED_MENU = [
  // ======================= NORTH INDIAN =======================

  // --- Veg Starters ---
  { cat: "ni-veg-starters", diet: "v", name: "Babycorn Tikka", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Hara Bhara Kabab", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Mushroom Tikka", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Angara", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Banjara Kabab", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Cheese Chatpata", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Lasooni Tikka", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Malai Kabab", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Pahadi Kabab", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Paneer Seekh Kabab", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Tandoori Stuffed Mushroom", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Veg Seekh Kabab", price: 299 },
  { cat: "ni-veg-starters", diet: "v", name: "Veg Mini Platter", price: 899 },
  { cat: "ni-veg-starters", diet: "v", name: "Veg Platter", price: 1799 },

  // --- Chicken Starters ---
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Angara Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Banjara Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Cheese Chatpata Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Malai Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Matka Kabab", price: 449 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Pahadi Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Seekh Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Tangdi Kabab", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Tikka", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Tandoori Chicken - Half", price: 349 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Tandoori Chicken - Full", price: 549 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Tandoori Mini Platter", price: 999 },
  { cat: "ni-chicken-starters", diet: "nv", name: "Chicken Tandoori Full Platter", price: 1899 },

  // --- Seafood Starters ---
  { cat: "ni-seafood-starters", diet: "nv", name: "Fish Tawa Fry", price: 449 },
  { cat: "ni-seafood-starters", diet: "nv", name: "Fish Tikka", price: 449 },
  { cat: "ni-seafood-starters", diet: "nv", name: "Prawns Koliwada", price: 599 },
  { cat: "ni-seafood-starters", diet: "nv", name: "Prawns Tikka", price: 599 },
  { cat: "ni-seafood-starters", diet: "nv", name: "Tandoori Baby Surmai", price: 699 },
  { cat: "ni-seafood-starters", diet: "nv", name: "Tandoori Pomfret", price: 899 },

  // --- Mutton Starters ---
  { cat: "ni-mutton-starters", diet: "nv", name: "Mutton Chops", price: 699 },
  { cat: "ni-mutton-starters", diet: "nv", name: "Mutton Ghee Roast", price: 699 },
  { cat: "ni-mutton-starters", diet: "nv", name: "Mutton Seekh Kabab", price: 699 },

  // --- Veg Main Course ---
  { cat: "ni-veg-main", diet: "v", name: "Cashew Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Chatpata Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Diwani Handi", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Malai Kofta", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Mix Veg", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Bhuna", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Chili Milli", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Handi", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Kofta", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Maratha", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Veg Tawa Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Mushroom Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Lehsooni Palak Paneer", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Do Pyaza", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Kadhai Paneer", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Butter Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Kofta", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Lababdar", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Lasooni Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Laziz", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Patiala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Tikka Masala", price: 299 },
  { cat: "ni-veg-main", diet: "v", name: "Paneer Masala", price: 299 },

  // --- Dal ---
  { cat: "ni-dal", diet: "v", name: "Dal Fry", price: 249 },
  { cat: "ni-dal", diet: "v", name: "Dal Makhani", price: 299 },
  { cat: "ni-dal", diet: "v", name: "Dal Tadka", price: 249 },
  { cat: "ni-dal", diet: "v", name: "Dal Khichdi", price: 249 },

  // --- Chicken Main Course ---
  { cat: "ni-chicken-main", diet: "nv", name: "Butter Chicken", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Do Pyaza Chicken", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Angara Masala", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Bhuna", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Handi", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Hyderabadi", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Kadhai", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Kala Masala", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Matka Masala", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Mughlai", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Patiala", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Tikka Masala", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Kolhapuri Chicken", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Murgh Musallam", price: 599 },
  { cat: "ni-chicken-main", diet: "nv", name: "Lehsooni Palak Chicken", price: 349 },
  { cat: "ni-chicken-main", diet: "nv", name: "Chicken Curry", price: 349 },

  // --- Egg ---
  { cat: "ni-egg", diet: "nv", name: "Egg Curry", price: 299 },
  { cat: "ni-egg", diet: "nv", name: "Egg Masala", price: 299 },

  // --- Fish Main Course ---
  { cat: "ni-fish-main", diet: "nv", name: "Fish Masala", price: 449 },
  { cat: "ni-fish-main", diet: "nv", name: "Goan Fish Curry", price: 449 },
  { cat: "ni-fish-main", diet: "nv", name: "Fish Curry", price: 449 },

  // --- Mutton Main Course ---
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Kala Masala Handi", price: 599 },
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Masala", price: 599 },
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Sukha", price: 599 },
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Curry", price: 599 },
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Handi", price: 599 },
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Malwani", price: 599 },
  { cat: "ni-mutton-main", diet: "nv", name: "Mutton Roganjosh", price: 599 },

  // --- Rice & Biryani ---
  { cat: "ni-rice-biryani", diet: "v", name: "Veg Biryani", price: 299 },
  { cat: "ni-rice-biryani", diet: "v", name: "Veg Hyderabadi Biryani", price: 299 },
  { cat: "ni-rice-biryani", diet: "v", name: "Paneer Tikka Biryani", price: 299 },
  { cat: "ni-rice-biryani", diet: "v", name: "Jeera Rice", price: 299 },
  { cat: "ni-rice-biryani", diet: "v", name: "Steam Rice", price: 199 },
  { cat: "ni-rice-biryani", diet: "v", name: "Veg Pulao", price: 299 },
  { cat: "ni-rice-biryani", diet: "v", name: "Peas Pulao", price: 299 },
  { cat: "ni-rice-biryani", diet: "nv", name: "Chicken Dum Biryani", price: 349 },
  { cat: "ni-rice-biryani", diet: "nv", name: "Chicken Hyderabadi Biryani", price: 349 },
  { cat: "ni-rice-biryani", diet: "nv", name: "Chicken Tikka Biryani", price: 349 },
  { cat: "ni-rice-biryani", diet: "nv", name: "Mutton Dum Biryani", price: 599 },
  { cat: "ni-rice-biryani", diet: "nv", name: "Mutton Hyderabadi Biryani", price: 599 },

  // --- Breads ---
  { cat: "ni-breads", diet: "v", name: "Tandoori Roti", price: 50 },
  { cat: "ni-breads", diet: "v", name: "Butter Tandoori Roti", price: 50 },
  { cat: "ni-breads", diet: "v", name: "Plain Naan", price: 50 },
  { cat: "ni-breads", diet: "v", name: "Butter Naan", price: 60 },
  { cat: "ni-breads", diet: "v", name: "Plain Garlic Naan", price: 70 },
  { cat: "ni-breads", diet: "v", name: "Butter Garlic Naan", price: 80 },
  { cat: "ni-breads", diet: "v", name: "Cheese Garlic Naan", price: 90 },
  { cat: "ni-breads", diet: "v", name: "Plain Kulcha", price: 50 },
  { cat: "ni-breads", diet: "v", name: "Butter Kulcha", price: 60 },
  { cat: "ni-breads", diet: "v", name: "Masala Stuffed Kulcha", price: 80 },
  { cat: "ni-breads", diet: "v", name: "Laccha Paratha", price: 60 },

  // --- Sides ---
  { cat: "ni-sides", diet: "v", name: "Boondi Raita", price: 149 },
  { cat: "ni-sides", diet: "v", name: "Cucumber Raita with Mint", price: 149 },
  { cat: "ni-sides", diet: "v", name: "Fry Papad", price: 50 },
  { cat: "ni-sides", diet: "v", name: "Masala Papad", price: 100 },
  { cat: "ni-sides", diet: "v", name: "Roasted Papad", price: 50 },

  // ======================= ASIAN =======================

  // --- Quick Bites ---
  { cat: "as-quick-bites", diet: "v", name: "Fries", price: 149 },
  { cat: "as-quick-bites", diet: "v", name: "Piri Piri Fries", price: 149 },
  { cat: "as-quick-bites", diet: "v", name: "Veg Momos Steam", price: 80 },
  { cat: "as-quick-bites", diet: "v", name: "Veg Momos Fry", price: 100 },
  { cat: "as-quick-bites", diet: "v", name: "Veg Momos Kurkure", price: 120 },
  { cat: "as-quick-bites", diet: "v", name: "Jhol Momo (Veg)", price: 199 },
  { cat: "as-quick-bites", diet: "v", name: "Peri Peri Momos Veg", price: 199 },
  { cat: "as-quick-bites", diet: "v", name: "Spring Roll", price: 299 },
  { cat: "as-quick-bites", diet: "nv", name: "Momos Chicken Steam", price: 120 },
  { cat: "as-quick-bites", diet: "nv", name: "Momos Chicken Fry", price: 140 },
  { cat: "as-quick-bites", diet: "nv", name: "Momos Chicken Kurkure", price: 160 },
  { cat: "as-quick-bites", diet: "nv", name: "Jhol Momo (Chicken)", price: 249 },
  { cat: "as-quick-bites", diet: "nv", name: "Peri Peri Momos Chicken", price: 249 },
  { cat: "as-quick-bites", diet: "nv", name: "Chicken Nuggets", price: 199 },
  { cat: "as-quick-bites", diet: "nv", name: "Spring Roll Chicken", price: 349 },

  // --- Starters ---
  { cat: "as-starters", diet: "v", name: "Hot & Sour Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Sweet Corn Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Veg Manchow Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Cream Of Brocolli Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Cream Of Mushroom Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Cream Of Palak Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Cream Of Tomato Soup", price: 149 },
  { cat: "as-starters", diet: "v", name: "Cheese Stuffed Mushroom", price: 349 },
  { cat: "as-starters", diet: "v", name: "Cottage Cheese In Hot Basil Sauce", price: 349 },
  { cat: "as-starters", diet: "v", name: "Paneer Chili Semi Gravy", price: 299 },
  { cat: "as-starters", diet: "v", name: "Mushroom Chili Semi Gravy", price: 299 },
  { cat: "as-starters", diet: "v", name: "Veg Manchurian Semi Gravy", price: 249 },
  { cat: "as-starters", diet: "v", name: "Cotton Paneer", price: 349 },
  { cat: "as-starters", diet: "v", name: "Crispy Veg", price: 299 },
  { cat: "as-starters", diet: "v", name: "Honey Chili Potato", price: 299 },
  { cat: "as-starters", diet: "v", name: "Paneer 65", price: 299 },
  { cat: "as-starters", diet: "v", name: "Stir Fried Vegetables", price: 249 },
  { cat: "as-starters", diet: "nv", name: "Chili Fish", price: 449 },
  { cat: "as-starters", diet: "nv", name: "Prawns Tempura", price: 599 },
  { cat: "as-starters", diet: "nv", name: "Hot & Sour Soup (Chicken)", price: 199 },
  { cat: "as-starters", diet: "nv", name: "Cream Of Chicken Soup", price: 199 },
  { cat: "as-starters", diet: "nv", name: "Chicken Sweet Corn Soup", price: 199 },
  { cat: "as-starters", diet: "nv", name: "Chicken Manchow", price: 199 },
  { cat: "as-starters", diet: "nv", name: "Fried Egg Chili", price: 299 },
  { cat: "as-starters", diet: "nv", name: "Chicken Lollypop", price: 349 },
  { cat: "as-starters", diet: "nv", name: "Chicken Lollypop In Schezwan Sauce", price: 379 },
  { cat: "as-starters", diet: "nv", name: "Chicken Manchurian", price: 349 },
  { cat: "as-starters", diet: "nv", name: "Chili Chicken (Semi Gravy)", price: 349 },
  { cat: "as-starters", diet: "nv", name: "Crispy Chicken", price: 349 },
  { cat: "as-starters", diet: "nv", name: "Cotton Chicken", price: 349 },
  { cat: "as-starters", diet: "nv", name: "Fish Fingers", price: 449 },

  // --- Main Course ---
  { cat: "as-main", diet: "v", name: "Veg Manchurian Gravy", price: 279 },
  { cat: "as-main", diet: "v", name: "Black Pepper Mushroom", price: 299 },
  { cat: "as-main", diet: "v", name: "Black Pepper Paneer", price: 299 },
  { cat: "as-main", diet: "v", name: "Chili Paneer Gravy", price: 319 },
  { cat: "as-main", diet: "v", name: "Kung Pao Paneer", price: 299 },
  { cat: "as-main", diet: "v", name: "Veg Khao Suey", price: 549 },
  { cat: "as-main", diet: "v", name: "Paneer In Teriyaki Sauce", price: 299 },
  { cat: "as-main", diet: "v", name: "Paneer In Oyster Sauce", price: 299 },
  { cat: "as-main", diet: "nv", name: "Black Pepper Chicken", price: 349 },
  { cat: "as-main", diet: "nv", name: "Kung Pao (Chicken)", price: 349 },
  { cat: "as-main", diet: "nv", name: "Chicken In Teriyaki Sauce", price: 349 },
  { cat: "as-main", diet: "nv", name: "Chicken In Oyster Sauce", price: 349 },
  { cat: "as-main", diet: "nv", name: "Chicken Khao Suey", price: 599 },
  { cat: "as-main", diet: "nv", name: "Chicken Manchurian Gravy", price: 379 },
  { cat: "as-main", diet: "nv", name: "Chili Chicken Gravy", price: 379 },
  { cat: "as-main", diet: "nv", name: "Thai Basil Chicken", price: 349 },
  { cat: "as-main", diet: "nv", name: "Thai Basil Fish", price: 449 },
  { cat: "as-main", diet: "nv", name: "Fish In Mustard Sauce", price: 449 },
  { cat: "as-main", diet: "nv", name: "Fish In Oyster Sauce", price: 449 },
  { cat: "as-main", diet: "nv", name: "Fish Khao Soey", price: 649 },
  { cat: "as-main", diet: "nv", name: "Prawns Chili", price: 599 },
  { cat: "as-main", diet: "nv", name: "Prawns In Oyster Sauce", price: 599 },
  { cat: "as-main", diet: "nv", name: "Prawns Khao Soey", price: 699 },
  { cat: "as-main", diet: "nv", name: "Thai Basil Prawn", price: 599 },

  // --- Rice & Noodles ---
  { cat: "as-rice-noodles", diet: "v", name: "Burnt Garlic Veg Fried Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Veg Schezwan Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Schezwan Paneer Fried Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Veg Chef Special Bok Choy", price: 449 },
  { cat: "as-rice-noodles", diet: "v", name: "Chili Garlic Fried Rice - Veg", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Hakka Noodles - Veg", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Mixed Fried Rice - Veg", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Paneer Fried Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Veg Creamy Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Veg Fried Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Triple Schezwan Fried Rice (Veg)", price: 449 },
  { cat: "as-rice-noodles", diet: "v", name: "Triple Schezwan Fried Rice (Paneer)", price: 449 },
  { cat: "as-rice-noodles", diet: "v", name: "Chili Garlic Noodles - Veg", price: 299 },
  { cat: "as-rice-noodles", diet: "v", name: "Veg Schezwan Noodles", price: 299 },
  { cat: "as-rice-noodles", diet: "nv", name: "Egg Fried Rice", price: 299 },
  { cat: "as-rice-noodles", diet: "nv", name: "Chili Garlic Noodles (Chicken)", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Burnt Garlic Noodles (Chicken)", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Schezwan Noodles (Chicken)", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Hakka Noodles (Chicken)", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Schezwan Rice (Chicken)", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Creamy Chicken Rice", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Burnt Garlic Fried Rice Chicken", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Chicken Fried Rice", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Cilantro Rice (Chicken)", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Packing Rice Chicken", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Chef Spl Bok Choy - Chicken", price: 499 },
  { cat: "as-rice-noodles", diet: "nv", name: "Triple Schezwan Fried Rice - Chicken", price: 499 },
  { cat: "as-rice-noodles", diet: "nv", name: "Triple Schezwan Fried Rice - Fish", price: 549 },
  { cat: "as-rice-noodles", diet: "nv", name: "Fish Fried Rice", price: 349 },
  { cat: "as-rice-noodles", diet: "nv", name: "Packing Rice Fish", price: 499 },
  { cat: "as-rice-noodles", diet: "nv", name: "Chef Spl Bok Choy - Fish", price: 549 },
  { cat: "as-rice-noodles", diet: "nv", name: "Chef Spl Bok Choy - Prawns", price: 599 },
  { cat: "as-rice-noodles", diet: "nv", name: "Triple Schezwan Fried Rice - Prawns", price: 599 },
  { cat: "as-rice-noodles", diet: "nv", name: "Prawn Fried Rice", price: 499 },
  { cat: "as-rice-noodles", diet: "nv", name: "Packing Rice Prawn", price: 599 },
  { cat: "as-rice-noodles", diet: "nv", name: "Prawn Fried Noodles", price: 499 },

  // --- Combos ---
  { cat: "as-combos", diet: "v", name: "Veg Thai Green Curry With Rice", price: 349 },
  { cat: "as-combos", diet: "v", name: "Veg Thai Red Curry With Rice", price: 349 },
  { cat: "as-combos", diet: "v", name: "Paneer Chili With Garlic Noodles", price: 349 },
  { cat: "as-combos", diet: "v", name: "Paneer Chili With Garlic Fried Rice", price: 349 },
  { cat: "as-combos", diet: "v", name: "Mushroom Chili With Garlic Noodles", price: 349 },
  { cat: "as-combos", diet: "nv", name: "Chili Chicken With Garlic Fried Rice", price: 449 },
  { cat: "as-combos", diet: "nv", name: "Chili Fish With Garlic Fried Rice", price: 499 },
  { cat: "as-combos", diet: "nv", name: "Chili Prawn With Garlic Fried Rice", price: 549 },
  { cat: "as-combos", diet: "nv", name: "Chili Chicken With Garlic Noodles", price: 449 },
  { cat: "as-combos", diet: "nv", name: "Chili Fish With Garlic Noodles", price: 499 },
  { cat: "as-combos", diet: "nv", name: "Chili Prawn With Garlic Noodles", price: 549 },
  { cat: "as-combos", diet: "nv", name: "Thai Green Curry Rice (Chicken)", price: 449 },
  { cat: "as-combos", diet: "nv", name: "Thai Green Curry Rice (Fish)", price: 499 },
  { cat: "as-combos", diet: "nv", name: "Thai Green Curry Rice (Prawns)", price: 599 },
  { cat: "as-combos", diet: "nv", name: "Thai Red Curry Rice (Fish)", price: 449 },
  { cat: "as-combos", diet: "nv", name: "Thai Red Curry Rice (Prawns)", price: 499 },
  { cat: "as-combos", diet: "nv", name: "Thai Red Curry With Rice (Chicken)", price: 599 },

  // ======================= GENERAL =======================

  // --- Beverages ---
  { cat: "gn-beverages", diet: "v", name: "Coffee (Cappuccino)", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Coffee (Espresso)", price: 99 },
  { cat: "gn-beverages", diet: "v", name: "Coffee (Latte)", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Instant Coffee", price: 60 },
  { cat: "gn-beverages", diet: "v", name: "Tea", price: 30 },
  { cat: "gn-beverages", diet: "v", name: "Cold Coffee", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Oreo Milk Shake", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Choc Milk Shake", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Lemon Ice Tea", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Peach Ice Tea", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "THCC Spl Lassi", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Buttermilk", price: 99 },
  { cat: "gn-beverages", diet: "v", name: "Mocktail (Blueberry)", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Mocktail (Virgin Mojito)", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Fresh Lime Soda", price: 149 },
  { cat: "gn-beverages", diet: "v", name: "Packaged Water", price: 10 },

  // --- Desserts ---
  { cat: "gn-desserts", diet: "v", name: "Brownie With Vanilla Ice Cream", price: 149 },
  { cat: "gn-desserts", diet: "v", name: "Honey Noodles With Vanilla Ice Cream", price: 199 },
  { cat: "gn-desserts", diet: "v", name: "Hot Gulab Jamun With Ice Cream", price: 149 },
  { cat: "gn-desserts", diet: "v", name: "Pancake With Chocolate Syrup And Vanilla Ice Cream", price: 149 },
];
