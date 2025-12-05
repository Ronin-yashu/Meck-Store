import connectMongoDB from '../lib/mongodb.js';
import Product from '../models/Product.js';

const sampleProducts = [
  {
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display, A17 Pro chip, and an advanced camera system with 48MP main camera.",
    shortDescription: "Premium flagship smartphone with Pro camera system",
    price: 134900,
    comparePrice: 149900,
    images: [
      "https://images.unsplash.com/photo-1592286927505-2ff0462be819?w=800",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800"
    ],
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    stock: 50,
    sku: "IP15PM-256-TB",
    specifications: {
      color: "Titanium Blue",
      storage: "256GB",
      ram: "8GB",
      screen: "6.7 inch",
      battery: "4422 mAh"
    },
    rating: 4.8,
    reviewCount: 342,
    tags: ["featured", "bestseller", "new-arrival"],
    status: "active"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "Experience the ultimate in mobile technology with the Galaxy S24 Ultra. Features a 200MP camera, S Pen, and powerful AI capabilities.",
    shortDescription: "Flagship Android phone with S Pen",
    price: 124999,
    comparePrice: 139999,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
    ],
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    stock: 35,
    sku: "S24U-256-BK",
    specifications: {
      color: "Phantom Black",
      storage: "256GB",
      ram: "12GB",
      screen: "6.8 inch",
      battery: "5000 mAh"
    },
    rating: 4.7,
    reviewCount: 256,
    tags: ["featured", "bestseller"],
    status: "active"
  },
  {
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    description: "Industry-leading noise cancellation with exceptional sound quality. 30-hour battery life and multipoint connection.",
    shortDescription: "Premium noise-cancelling headphones",
    price: 29990,
    comparePrice: 34990,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800"
    ],
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    stock: 75,
    sku: "WH1000XM5-BK",
    specifications: {
      color: "Black",
      type: "Over-ear",
      connectivity: "Bluetooth 5.2",
      battery: "30 hours"
    },
    rating: 4.9,
    reviewCount: 489,
    tags: ["featured", "bestseller"],
    status: "active"
  },
  {
    name: "MacBook Air M3",
    slug: "macbook-air-m3",
    description: "The new MacBook Air with M3 chip delivers exceptional performance and up to 18 hours of battery life in an ultra-portable design.",
    shortDescription: "Lightweight laptop with M3 chip",
    price: 114900,
    comparePrice: 129900,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
    ],
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    stock: 25,
    sku: "MBA-M3-256-MN",
    specifications: {
      color: "Midnight",
      processor: "Apple M3",
      ram: "8GB",
      storage: "256GB SSD",
      screen: "13.6 inch"
    },
    rating: 4.8,
    reviewCount: 178,
    tags: ["featured", "new-arrival"],
    status: "active"
  },
  {
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    description: "The most advanced Apple Watch yet with S9 chip, always-on Retina display, and advanced health features.",
    shortDescription: "Smart watch with advanced health tracking",
    price: 41900,
    comparePrice: 45900,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800"
    ],
    category: "Electronics",
    subcategory: "Wearables",
    brand: "Apple",
    stock: 60,
    sku: "AW9-GPS-45-MN",
    specifications: {
      color: "Midnight",
      size: "45mm",
      connectivity: "GPS",
      battery: "18 hours"
    },
    rating: 4.7,
    reviewCount: 412,
    tags: ["featured", "bestseller"],
    status: "active"
  },
  {
    name: "Canon EOS R6 Mark II",
    slug: "canon-eos-r6-mark-ii",
    description: "Professional mirrorless camera with 24.2MP full-frame sensor, 40fps burst shooting, and advanced autofocus.",
    shortDescription: "Professional mirrorless camera",
    price: 249900,
    comparePrice: 274900,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"
    ],
    category: "Electronics",
    subcategory: "Cameras",
    brand: "Canon",
    stock: 15,
    sku: "EOSR6M2-BODY",
    specifications: {
      sensor: "24.2MP Full-Frame",
      video: "4K 60fps",
      iso: "100-102400",
      screen: "3.2 inch touchscreen"
    },
    rating: 4.9,
    reviewCount: 89,
    tags: ["featured"],
    status: "active"
  },
  {
    name: "iPad Pro 12.9-inch M2",
    slug: "ipad-pro-12-9-m2",
    description: "The ultimate iPad experience with M2 chip, stunning Liquid Retina XDR display, and all-day battery life.",
    shortDescription: "Professional tablet with M2 chip",
    price: 109900,
    comparePrice: 119900,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
      "https://images.unsplash.com/photo-1585789050917-8b8b1ab47a3f?w=800"
    ],
    category: "Electronics",
    subcategory: "Tablets",
    brand: "Apple",
    stock: 40,
    sku: "IPP12-M2-256-SG",
    specifications: {
      color: "Space Gray",
      storage: "256GB",
      screen: "12.9 inch",
      chip: "Apple M2"
    },
    rating: 4.8,
    reviewCount: 234,
    tags: ["featured", "new-arrival"],
    status: "active"
  },
  {
    name: "Dell XPS 15",
    slug: "dell-xps-15",
    description: "Powerful laptop with 13th Gen Intel Core i7, NVIDIA RTX 4050, and stunning 15.6-inch OLED display.",
    shortDescription: "High-performance creator laptop",
    price: 179900,
    comparePrice: 199900,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800"
    ],
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Dell",
    stock: 20,
    sku: "XPS15-9530-I7",
    specifications: {
      processor: "Intel Core i7-13700H",
      ram: "16GB",
      storage: "512GB SSD",
      gpu: "NVIDIA RTX 4050",
      screen: "15.6 inch OLED"
    },
    rating: 4.6,
    reviewCount: 145,
    tags: ["featured"],
    status: "active"
  }
];

async function seedProducts() {
  try {
    await connectMongoDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('✅ Successfully seeded 8 products');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
