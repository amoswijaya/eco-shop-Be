// prisma/seed.ts
import { PrismaClient, Category } from "@prisma/client";
import { hashPassword } from "../src/lib/hash";

const prisma = new PrismaClient();

function getProductNames(categoryName: string): string[] {
  const productsByCategory: { [key: string]: string[] } = {
    Electronics: [
      "Samsung Galaxy S24",
      "iPhone 15 Pro",
      "MacBook Air M2",
      "Dell XPS 13",
      "Sony WH-1000XM5",
      'iPad Pro 11"',
      "AirPods Pro",
      "Nintendo Switch OLED",
      "PlayStation 5",
      "Xbox Series X",
      'LG OLED TV 55"',
      "Canon EOS R6",
      "Nikon D750",
      "Apple Watch Series 9",
      "Garmin Forerunner 955",
      "Bose QuietComfort 45",
      "JBL Flip 6",
      "Logitech MX Master 3S",
      "Mechanical Gaming Keyboard",
      "Wireless Charging Pad",
    ],
    Clothing: [
      "Cotton T-Shirt Basic",
      "Slim Fit Jeans",
      "Hoodie Pullover",
      "Blazer Formal",
      "Sneakers Canvas",
      "Dress Shirt White",
      "Chino Pants",
      "Leather Jacket",
      "Midi Dress Floral",
      "Cardigan Knitted",
      "Polo Shirt",
      "Trench Coat",
      "Denim Jacket",
      "Maxi Dress",
      "Sweater Wool",
      "Cargo Pants",
      "Button-up Shirt",
      "Pencil Skirt",
      "Track Suit",
      "Winter Coat",
    ],
    "Home & Kitchen": [
      "Stainless Steel Cookware Set",
      "Non-stick Frying Pan",
      "Rice Cooker Digital",
      "Blender High Speed",
      "Coffee Maker Automatic",
      "Microwave Oven",
      "Air Fryer 5L",
      "Electric Kettle",
      "Toaster 4-Slice",
      "Stand Mixer",
      "Slow Cooker 6Qt",
      "Food Processor",
      "Dinnerware Set Ceramic",
      "Knife Set German Steel",
      "Cutting Board Bamboo",
      "Storage Containers Glass",
      "Dish Towel Set",
      "Silicone Baking Mat",
      "Measuring Cups Set",
      "Can Opener Electric",
    ],
    Beauty: [
      "Moisturizing Face Cream",
      "Vitamin C Serum",
      "Matte Lipstick",
      "Foundation Liquid",
      "Eyeshadow Palette",
      "Mascara Waterproof",
      "Cleansing Foam",
      "Sunscreen SPF50",
      "Night Repair Serum",
      "Lip Balm Tinted",
      "Concealer Full Coverage",
      "Blush Powder",
      "Eyeliner Gel",
      "Makeup Brush Set",
      "Toner Hydrating",
      "Exfoliating Scrub",
      "Hair Mask Repair",
      "Nail Polish Set",
      "Perfume EDT",
      "Makeup Remover Micellar",
    ],
    Sports: [
      "Yoga Mat Premium",
      "Dumbbells Adjustable",
      "Resistance Bands Set",
      "Treadmill Folding",
      "Basketball Official Size",
      "Soccer Ball FIFA",
      "Tennis Racket Carbon",
      "Golf Club Set",
      "Badminton Racket",
      "Swimming Goggles",
      "Cycling Helmet",
      "Running Shoes",
      "Gym Gloves",
      "Protein Shaker",
      "Foam Roller",
      "Jump Rope Speed",
      "Kettlebell Cast Iron",
      "Exercise Ball",
      "Pull-up Bar",
      "Ankle Weights",
    ],
    Books: [
      "Harry Potter Complete Series",
      "The Great Gatsby",
      "To Kill a Mockingbird",
      "Pride and Prejudice",
      "1984 George Orwell",
      "The Catcher in the Rye",
      "Lord of the Rings Trilogy",
      "Game of Thrones Set",
      "The Da Vinci Code",
      "Atomic Habits",
      "Think and Grow Rich",
      "The 7 Habits",
      "Rich Dad Poor Dad",
      "Psychology of Money",
      "Sapiens Yuval Noah",
      "Educated Tara Westover",
      "Becoming Michelle Obama",
      "The Subtle Art",
      "Clean Code",
      "JavaScript Guide",
    ],
    Toys: [
      "LEGO Creator Set",
      "Barbie Dreamhouse",
      "Hot Wheels Track Set",
      "Monopoly Board Game",
      "Scrabble Classic",
      "Puzzle 1000 Pieces",
      "Action Figure Superhero",
      "Stuffed Animal Teddy Bear",
      "Remote Control Car",
      "Nerf Blaster",
      "Play-Doh Creative Kit",
      "Rubik's Cube",
      "Chess Set Wooden",
      "Dollhouse Miniature",
      "Building Blocks",
      "Art Supply Kit",
      "Musical Keyboard Toy",
      "Science Experiment Kit",
      "Magic 8 Ball",
      "Slinky Spring Toy",
    ],
    Automotive: [
      "Motor Oil Synthetic",
      "Car Wax Premium",
      "Tire Pressure Gauge",
      "Jump Starter Portable",
      "Car Phone Mount",
      "Dash Cam HD",
      "Floor Mats Rubber",
      "Air Freshener",
      "Seat Covers Leather",
      "Steering Wheel Cover",
      "Car Vacuum Cleaner",
      "Emergency Kit",
      "Microfiber Towels",
      "Brake Fluid",
      "Coolant Antifreeze",
      "Spark Plugs Set",
      "Car Battery",
      "Windshield Wipers",
      "LED Headlight Bulbs",
      "Tire Repair Kit",
    ],
    Health: [
      "Multivitamin Tablets",
      "Omega-3 Fish Oil",
      "Vitamin D3 Supplement",
      "Protein Powder Whey",
      "Thermometer Digital",
      "Blood Pressure Monitor",
      "First Aid Kit",
      "Hand Sanitizer",
      "Face Masks N95",
      "Probiotic Capsules",
      "Calcium Magnesium",
      "Vitamin B Complex",
      "Immune Support",
      "Glucosamine",
      "Melatonin Sleep Aid",
      "Bandages Adhesive",
      "Antiseptic Wipes",
      "Pain Relief Gel",
      "Zinc Lozenges",
      "Pulse Oximeter",
    ],
    Furniture: [
      "Ergonomic Office Chair",
      "Wooden Coffee Table",
      "Bookshelf 5-Tier",
      "Sofa 3-Seater",
      "Dining Table Set",
      "Bed Frame Queen Size",
      "Wardrobe 3-Door",
      "TV Stand Modern",
      "Desk Computer",
      "Nightstand Drawer",
      "Recliner Chair",
      "Ottoman Storage",
      "Bar Stools Set",
      "Shoe Rack",
      "Coat Hanger Stand",
      "Mirror Full Length",
      "Lamp Floor Standing",
      "Cushions Decorative",
      "Carpet Area Rug",
      "Plant Stand",
    ],
  };

  return productsByCategory[categoryName] || [];
}

function getProductDescription(
  productName: string,
  categoryName: string
): string {
  const descriptions: { [key: string]: string } = {
    Electronics: `High-quality ${productName} with advanced features and excellent performance. Perfect for tech enthusiasts and professionals.`,
    Clothing: `Comfortable and stylish ${productName} made from premium materials. Perfect for everyday wear and special occasions.`,
    "Home & Kitchen": `Essential ${productName} for your kitchen and home needs. Durable, practical, and designed for daily use.`,
    Beauty: `Premium ${productName} for your beauty routine. Formulated with quality ingredients for optimal results.`,
    Sports: `Professional-grade ${productName} for sports and fitness activities. Built for performance and durability.`,
    Books: `Engaging ${productName} that will captivate readers. A must-have addition to any book collection.`,
    Toys: `Fun and educational ${productName} that provides hours of entertainment. Safe and suitable for all ages.`,
    Automotive: `Reliable ${productName} for your vehicle maintenance and enhancement needs. Quality guaranteed.`,
    Health: `Trusted ${productName} for your health and wellness journey. Formulated with care and precision.`,
    Furniture: `Beautiful and functional ${productName} that enhances your living space. Crafted with attention to detail.`,
  };

  return (
    descriptions[categoryName] ||
    `Quality ${productName} with excellent features and value.`
  );
}

async function main() {
  const categoryNames = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Beauty",
    "Sports",
    "Books",
    "Toys",
    "Automotive",
    "Health",
    "Furniture",
  ];

  const categories: Category[] = [];
  for (const name of categoryNames) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories.push(cat);
  }

  for (const cat of categories) {
    const productNames = getProductNames(cat.name);

    const products = Array.from({ length: 20 }).map((_, i) => {
      const productName = productNames[i] || `${cat.name} Product ${i + 1}`;

      return {
        name: productName,
        description: getProductDescription(productName, cat.name),
        price: Math.floor(Math.random() * 200000) + 50000, // 50k–250k IDR
        stock: Math.floor(Math.random() * 100) + 10,
        images: [`https://picsum.photos/seed/${cat.name}${i}/400/300`],
        categoryId: cat.id,
      };
    });

    await prisma.product.createMany({ data: products });
  }

  console.log("✅ Seeding selesai:");
  console.log("- 10 kategori");
  console.log("- 200 produk dengan nama realistis");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
