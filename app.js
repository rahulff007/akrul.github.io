// Carousel Data
const carouselSlides = [
  { id: 1, title: "NEW COLLECTION", subtitle: "Discover This Season's Hottest Trends", buttonText: "Shop Now" },
  { id: 2, title: "PREMIUM QUALITY", subtitle: "Crafted With Excellence For You", buttonText: "Explore" },
  { id: 3, title: "TRENDING FASHION", subtitle: "Stay Ahead With Style", buttonText: "Shop Now" },
  { id: 4, title: "EXCLUSIVE DESIGNS", subtitle: "Limited Edition Pieces", buttonText: "Discover" },
  { id: 5, title: "SUMMER VIBES", subtitle: "Fresh Looks For Every Occasion", buttonText: "Shop Now" }
];

let currentSlide = 0;
let carouselInterval = null;
let carouselTouchStartX = 0;
let carouselTouchEndX = 0;
let isCarouselPaused = false;

// Data Storage (In-memory - no localStorage)
let products = [
  {
    id: 100,
    name: "White Logo Premium Shirt",
    category: "Shirts",
    price: 1899,
    comparePrice: 2799,
    stock: 30,
    sku: "AKRUL-SH-100",
    rating: 4.8,
    reviews: 56,
    description: "Slim‑fit premium white shirt with subtle chest logo, perfect for both formal and smart‑casual looks.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    image: "white_logo_shirt.jpg",
    images: ["white_logo_shirt.jpg"],
    soldBy: "AKRUL",
    manufacturedBy: "AKRUL",
    material: "Premium Cotton Blend",
    fit: "Slim",
    careInstructions: "Machine wash cold, line dry, warm iron.",
    countryOfOrigin: "India"
},
{
    id: 101,
    name: "Midnight Black 3‑Piece Suit",
    category: "Jackets",
    price: 7499,
    comparePrice: 10499,
    stock: 15,
    sku: "AKRUL-SU-101",
    rating: 4.9,
    reviews: 33,
    description: "Tailored 3‑piece black suit with sharp shoulders and clean lines for premium occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    image: "black_suit.jpg",
    images: ["black_suit.jpg"],
    soldBy: "AKRUL",
    manufacturedBy: "AKRUL",
    material: "Poly‑viscose blend",
    fit: "Tailored",
    careInstructions: "Dry clean only.",
    countryOfOrigin: "India"
},
{
    id: 102,
    name: "Beige Graphic Oversized Hoodie",
    category: "Hoodies",
    price: 2699,
    comparePrice: 3999,
    stock: 40,
    sku: "AKRUL-HD-102",
    rating: 4.7,
    reviews: 71,
    description: "Soft beige hoodie with Japanese‑style graphic print, cosy oversized fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    image: "beige_hoodie.jpg",
    images: ["beige_hoodie.jpg"],
    soldBy: "AKRUL",
    manufacturedBy: "AKRUL",
    material: "Cotton Fleece",
    fit: "Oversized",
    careInstructions: "Machine wash inside‑out, do not iron on print.",
    countryOfOrigin: "India"
},
{
    id: 103,
    name: "Sage Co‑ord Zip Set",
    category: "Hoodies",
    price: 2999,
    comparePrice: 4499,
    stock: 35,
    sku: "AKRUL-CS-103",
    rating: 4.6,
    reviews: 52,
    description: "Minimal sage zip‑up with matching shorts, perfect for athleisure and travel.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage Green"],
    image: "sage_co_ord.jpg",
    images: ["sage_co_ord.jpg"],
    soldBy: "AKRUL",
    manufacturedBy: "AKRUL",
    material: "Cotton‑poly blend",
    fit: "Regular",
    careInstructions: "Machine wash cold, tumble dry low.",
    countryOfOrigin: "India"
},
{
    id: 104,
    name: "Ivory Textured Blazer",
    category: "Jackets",
    price: 5599,
    comparePrice: 7999,
    stock: 20,
    sku: "AKRUL-BL-104",
    rating: 4.8,
    reviews: 48,
    description: "Ivory textured blazer paired best with black shirt for luxury evening looks.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    image: "white_blazer.jpg",
    images: ["white_blazer.jpg"],
    soldBy: "AKRUL",
    manufacturedBy: "AKRUL",
    material: "Textured Poly‑viscose",
    fit: "Slim",
    careInstructions: "Dry clean only.",
    countryOfOrigin: "India"
},
  { id: 1, name: "Classic Black Shirt", category: "Shirts", price: 1499, comparePrice: 2499, stock: 50, sku: "AKRUL-SH-001", rating: 4.5, reviews: 124, description: "Premium quality black shirt perfect for casual and formal wear. Made with finest cotton fabric for maximum comfort and durability.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Navy"], image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80", "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "Premium Cotton", fit: "Slim", careInstructions: "Machine wash cold, Dry clean safe", countryOfOrigin: "India" },
  { id: 2, name: "White Oxford Shirt", category: "Shirts", price: 1299, comparePrice: 1999, stock: 35, sku: "AKRUL-SH-002", rating: 4.3, reviews: 89, description: "Classic white oxford shirt featuring traditional button-down collar and premium cotton construction.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["White", "Light Blue"], image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80", images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80", "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "100% Cotton", fit: "Regular", careInstructions: "Machine wash, Iron as needed", countryOfOrigin: "India" },
  { id: 3, name: "Denim Blue Shirt", category: "Shirts", price: 1799, comparePrice: 2799, stock: 28, sku: "AKRUL-SH-003", rating: 4.7, reviews: 156, description: "Trendy denim blue shirt with modern oversized fit. Perfect for creating stylish, casual looks.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Blue", "Dark Blue"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80", "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "Denim Cotton Blend", fit: "Oversized", careInstructions: "Cold water wash recommended", countryOfOrigin: "India" },
  { id: 4, name: "Graphic Print Tee", category: "T-Shirts", price: 599, comparePrice: 999, stock: 120, sku: "AKRUL-TS-001", rating: 4.4, reviews: 234, description: "Stylish graphic print t-shirt with premium quality print. Comfortable and versatile for everyday wear.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Grey"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "100% Cotton", fit: "Regular", careInstructions: "Machine wash cold, Tumble dry low", countryOfOrigin: "India" },
  { id: 5, name: "Plain White Tee", category: "T-Shirts", price: 499, comparePrice: 799, stock: 200, sku: "AKRUL-TS-002", rating: 4.6, reviews: 445, description: "Classic plain white t-shirt in premium cotton. Essential wardrobe staple for any occasion.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["White", "Black", "Grey", "Navy"], image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80", images: ["https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "100% Cotton", fit: "Regular", careInstructions: "Machine wash, warm water", countryOfOrigin: "India" },
  { id: 6, name: "Black Hoodie", category: "Hoodies", price: 2499, comparePrice: 3999, stock: 45, sku: "AKRUL-HD-001", rating: 4.8, reviews: 178, description: "Premium black hoodie with drawstring hood and front pouch pocket. Perfect for comfort and style.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "Grey"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80", "https://images.unsplash.com/photo-1509942774463-acf339c37c2b?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "Cotton Polyester Blend", fit: "Regular", careInstructions: "Machine wash cold, Gentle cycle", countryOfOrigin: "India" },
  { id: 7, name: "Grey Zip Hoodie", category: "Hoodies", price: 2799, comparePrice: 4299, stock: 32, sku: "AKRUL-HD-002", rating: 4.5, reviews: 92, description: "Stylish grey zip hoodie with premium quality construction. Comfortable and versatile for layering.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Grey", "Black"], image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80", images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80", "https://images.unsplash.com/photo-1509942774463-acf339c37c2b?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "Cotton Polyester Blend", fit: "Regular", careInstructions: "Machine wash, Cold water", countryOfOrigin: "India" },
  { id: 8, name: "Leather Jacket", category: "Jackets", price: 5999, comparePrice: 8999, stock: 15, sku: "AKRUL-JK-001", rating: 4.9, reviews: 67, description: "Luxurious premium leather jacket perfect for making a bold fashion statement. Durable and timeless.", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Black", "Brown"], image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80", "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "Premium Leather", fit: "Slim", careInstructions: "Professional dry clean only", countryOfOrigin: "India" },
  { id: 9, name: "Denim Jacket", category: "Jackets", price: 3499, comparePrice: 5499, stock: 22, sku: "AKRUL-JK-002", rating: 4.6, reviews: 134, description: "Classic denim jacket with timeless appeal. Perfect layering piece for any wardrobe.", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Blue", "Black"], image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80", images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80", "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "Denim Cotton", fit: "Regular", careInstructions: "Cold water wash, Turn inside out", countryOfOrigin: "India" },
  { id: 10, name: "Slim Fit Jeans", category: "Jeans", price: 2299, comparePrice: 3499, stock: 68, sku: "AKRUL-JN-001", rating: 4.4, reviews: 289, description: "Premium slim fit jeans with perfect stretch. Comfortable and flattering fit for all-day wear.", sizes: ["28", "30", "32", "34", "36", "38"], colors: ["Dark Blue", "Light Blue", "Black"], image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80", "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80", "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "98% Cotton, 2% Elastane", fit: "Slim", careInstructions: "Cold water wash, Turn inside out", countryOfOrigin: "India" },
  { id: 11, name: "Black Ripped Jeans", category: "Jeans", price: 2599, comparePrice: 3999, stock: 54, sku: "AKRUL-JN-002", rating: 4.7, reviews: 201, description: "Trendy black ripped jeans with distressed design. Perfect for creating edgy, modern looks.", sizes: ["28", "30", "32", "34", "36", "38"], colors: ["Black"], image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80", "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "98% Cotton, 2% Elastane", fit: "Slim", careInstructions: "Gentle wash, Cold water recommended", countryOfOrigin: "India" },
  { id: 12, name: "Blue Straight Jeans", category: "Jeans", price: 1999, comparePrice: 2999, stock: 89, sku: "AKRUL-JN-003", rating: 4.3, reviews: 167, description: "Classic blue straight fit jeans. Versatile and comfortable for everyday casual wear.", sizes: ["28", "30", "32", "34", "36", "38"], colors: ["Medium Blue", "Dark Blue"], image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80", "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80", "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "98% Cotton, 2% Elastane", fit: "Straight", careInstructions: "Cold water wash, Line dry", countryOfOrigin: "India" },
  { id: 13, name: "Black Cargo Pants", category: "Cargo", price: 1999, comparePrice: 2999, stock: 42, sku: "AKRUL-CG-001", rating: 4.5, reviews: 156, description: "Stylish cargo pants with multiple pockets for functional fashion. Premium quality fabric with comfortable fit.", sizes: ["28", "30", "32", "34", "36", "38"], colors: ["Black", "Olive", "Khaki"], image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"], soldBy: "AKRUL", manufacturedBy: "AKRUL", material: "98% Cotton, 2% Elastane", fit: "Regular", careInstructions: "Cold water wash, Turn inside out", countryOfOrigin: "India" }
];

let orders = [
  { id: "AKR001", orderNumber: "AKR-202511141458-7234", customerName: "Test User", email: "testuser@akrul.com", phone: "9999999999", date: "2025-11-14", total: 2998, paymentStatus: "Paid", orderStatus: "Delivered", paymentMethod: "card", items: [{productId: 1, productName: "Classic Black Shirt", quantity: 2, size: "M", color: "Black", price: 1499}], emailSent: true, emailSentTime: "2025-11-14 14:58:30" },
  { id: "AKR002", orderNumber: "AKR-202511151203-8945", customerName: "Test User", email: "testuser@akrul.com", phone: "9999999999", date: "2025-11-15", total: 7498, paymentStatus: "Paid", orderStatus: "Shipped", paymentMethod: "upi", items: [{productId: 8, productName: "Leather Jacket", quantity: 1, size: "L", color: "Black", price: 5999}, {productId: 4, productName: "Graphic Print Tee", quantity: 1, size: "M", color: "Black", price: 599}], emailSent: true, emailSentTime: "2025-11-15 12:03:45" },
  { id: "AKR003", orderNumber: "AKR-202511151447-5612", customerName: "Test User", email: "testuser@akrul.com", phone: "9999999999", date: "2025-11-15", total: 2499, paymentStatus: "Paid", orderStatus: "Processing", paymentMethod: "debit", items: [{productId: 6, productName: "Black Hoodie", quantity: 1, size: "M", color: "Black", price: 2499}], emailSent: true, emailSentTime: "2025-11-15 14:47:12" },
  { id: "AKR004", orderNumber: "AKR-202511131925-3847", customerName: "Neha Singh", email: "neha@example.com", phone: "9876512345", date: "2025-11-13", total: 8999, paymentStatus: "Paid", orderStatus: "Delivered", paymentMethod: "card", items: [{productId: 8, productName: "Leather Jacket", quantity: 1, size: "M", color: "Black", price: 5999}], emailSent: true, emailSentTime: "2025-11-13 19:25:56" },
  { id: "AKR005", orderNumber: "AKR-202511121634-9128", customerName: "Vikram Malhotra", email: "vikram@example.com", phone: "9123498765", date: "2025-11-12", total: 1499, paymentStatus: "Paid", orderStatus: "Delivered", paymentMethod: "wallet", items: [{productId: 1, productName: "Classic Black Shirt", quantity: 1, size: "L", color: "Black", price: 1499}], emailSent: true, emailSentTime: "2025-11-12 16:34:22" }
];

let customers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", totalOrders: 5, totalSpent: 15750, joinDate: "2025-09-15" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "9123456789", totalOrders: 3, totalSpent: 8900, joinDate: "2025-10-01" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", phone: "9988776655", totalOrders: 7, totalSpent: 22340, joinDate: "2025-08-20" }
];

let cart = [];
let wishlist = [];
let currentUser = null;
let userAddresses = [];
let editingAddressId = null;

let userProfilePictures = {}; // Store profile pictures in memory

let registeredUsers = [
  { id: 1, fullName: "Test User", email: "testuser@akrul.com", phone: "9999999999", password: "TestAkrul@123", registrationDate: "2025-11-16", lastLogin: null, accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-11-16" },
  { id: 2, fullName: "Admin User", email: "admin@akrul.com", phone: "9876543210", password: "admin123", registrationDate: "2025-09-15", lastLogin: "2025-11-15 14:30:00", accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-10-01" },
  { id: 3, fullName: "Test Demo", email: "test@akrul.com", phone: "9876543210", password: "Test123!@#", registrationDate: "2025-10-01", lastLogin: "2025-11-15 15:45:00", accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-10-15" },
  { id: 4, fullName: "Demo User", email: "demo@akrul.com", phone: "9123456789", password: "Demo123!@#", registrationDate: "2025-10-01", lastLogin: "2025-11-15 15:45:00", accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-10-15" },
  { id: 5, fullName: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", password: "Password@123", registrationDate: "2025-09-15", lastLogin: "2025-11-15 14:30:00", accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-10-01" },
  { id: 6, fullName: "Priya Patel", email: "priya@example.com", phone: "9123456789", password: "Secure@456", registrationDate: "2025-10-01", lastLogin: "2025-11-15 15:45:00", accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-10-15" },
  { id: 7, fullName: "Amit Kumar", email: "amit@example.com", phone: "9988776655", password: "Strong@789", registrationDate: "2025-08-20", lastLogin: "2025-11-14 10:20:00", accountStatus: "Active", emailVerified: true, passwordLastChanged: "2025-09-01" }
];
let loginAttempts = {};
let passwordResetTokens = {};
let isAdminLoggedIn = false;
let currentProduct = null;
let editingProductId = null;
let currentCheckoutStep = 1;
let shippingFormValid = false;
let paymentFormValid = false;
let currentPaymentMethod = 'card';
let paymentGatewaySettings = {
  gateway: 'demo',
  mode: 'test',
  apiKey: '',
  secretKey: '',
  merchantId: ''
};
let paymentTransactions = [];
let isProcessingPayment = false;
let emailsSent = [];
let emailRetryAttempts = {};
let filteredProducts = [...products];
let selectedSize = null;
let selectedColor = null;
let productQuantity = 1;

const categories = ["Shirts", "T-Shirts", "Hoodies", "Jackets", "Jeans", "Cargo"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Navy", "Grey", "Blue", "Red", "Green"];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousel();
  initializeCustomerSite();
  updateCartBadge();
  updateWishlistBadge();
  updateUserIcon();
});

// User Authentication Functions
function updateUserIcon() {
  const userIcon = document.getElementById('userIcon');
  const ordersNavLink = document.getElementById('ordersNavLink');
  
  if (currentUser) {
    userIcon.classList.add('logged-in');
    userIcon.title = `Logged in as ${currentUser.fullName}`;
    if (ordersNavLink) {
      ordersNavLink.style.display = 'block';
    }
    updateUserDropdown();
  } else {
    userIcon.classList.remove('logged-in');
    userIcon.title = 'Login / Register';
    if (ordersNavLink) {
      ordersNavLink.style.display = 'none';
    }
    updateUserDropdown();
  }
}

function updateUserDropdown() {
  const dropdownName = document.getElementById('userDropdownName');
  const dropdownEmail = document.getElementById('userDropdownEmail');
  const dropdownAvatar = document.getElementById('userDropdownAvatar');
  const logoutItem = document.getElementById('logoutMenuItem');
  
  if (currentUser) {
    dropdownName.textContent = currentUser.fullName;
    dropdownEmail.textContent = currentUser.email;
    
    // Update avatar with profile picture or initials
    const profilePicUrl = userProfilePictures[currentUser.id];
    if (profilePicUrl) {
      dropdownAvatar.style.backgroundImage = `url(${profilePicUrl})`;
      dropdownAvatar.style.backgroundSize = 'cover';
      dropdownAvatar.style.backgroundPosition = 'center';
      dropdownAvatar.textContent = '';
    } else {
      dropdownAvatar.style.backgroundImage = 'none';
      dropdownAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
    }
    
    logoutItem.style.display = 'flex';
  } else {
    dropdownName.textContent = 'Guest';
    dropdownEmail.textContent = 'Login to continue';
    dropdownAvatar.textContent = 'G';
    logoutItem.style.display = 'none';
  }
}

function toggleUserMenu() {
  if (!currentUser) {
    toggleAuthModal();
    return;
  }
  
  const menu = document.getElementById('userDropdownMenu');
  menu.classList.toggle('active');
  
  // Close menu when clicking outside
  if (menu.classList.contains('active')) {
    setTimeout(() => {
      document.addEventListener('click', closeUserMenuOnClickOutside);
    }, 0);
  }
}

function closeUserMenu() {
  const menu = document.getElementById('userDropdownMenu');
  menu.classList.remove('active');
  document.removeEventListener('click', closeUserMenuOnClickOutside);
}

function closeUserMenuOnClickOutside(e) {
  const menu = document.getElementById('userDropdownMenu');
  const wrapper = document.querySelector('.user-account-wrapper');
  
  if (!wrapper.contains(e.target)) {
    closeUserMenu();
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    customerLogout();
  }
}

function toggleAuthModal() {
  const modal = document.getElementById('authModal');
  modal.classList.toggle('active');
  if (!modal.classList.contains('active')) {
    // Clear forms when closing
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    clearAllAuthErrors();
  }
}

function showAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  
  if (tab === 'login') {
    document.querySelectorAll('.auth-tab')[0].classList.add('active');
    document.getElementById('loginForm').classList.add('active');
  } else if (tab === 'register') {
    document.querySelectorAll('.auth-tab')[1].classList.add('active');
    document.getElementById('registerForm').classList.add('active');
  }
}

function clearAllAuthErrors() {
  document.querySelectorAll('#authModal .error-message').forEach(span => {
    span.textContent = '';
  });
  document.querySelectorAll('#authModal input').forEach(input => {
    input.classList.remove('error', 'success');
  });
}

// Carousel Functions
function initializeCarousel() {
  renderCarouselSlides();
  renderCarouselPagination();
  startCarouselAutoPlay();
  setupCarouselTouchEvents();
  setupCarouselHoverPause();
}

function renderCarouselSlides() {
  const slidesContainer = document.getElementById('carouselSlides');
  slidesContainer.innerHTML = carouselSlides.map((slide, index) => `
    <div class="carousel-slide" data-slide="${index}">
      <div class="carousel-content">
        <h2>${slide.title}</h2>
        <p>${slide.subtitle}</p>
        <button class="btn btn-primary" onclick="showPage('shop')">${slide.buttonText}</button>
      </div>
    </div>
  `).join('');
}

function renderCarouselPagination() {
  const pagination = document.getElementById('carouselPagination');
  pagination.innerHTML = carouselSlides.map((_, index) => `
    <div class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})" data-dot="${index}"></div>
  `).join('');
}

function startCarouselAutoPlay() {
  stopCarouselAutoPlay();
  carouselInterval = setInterval(() => {
    if (!isCarouselPaused) {
      carouselNavigate(1);
    }
  }, 4000);
}

function stopCarouselAutoPlay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function carouselNavigate(direction) {
  currentSlide = (currentSlide + direction + carouselSlides.length) % carouselSlides.length;
  updateCarouselPosition();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarouselPosition();
  startCarouselAutoPlay();
}

function updateCarouselPosition() {
  const slidesContainer = document.getElementById('carouselSlides');
  const offset = -currentSlide * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;
  
  // Update pagination dots
  document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
  
  // Trigger content animation
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((slide, index) => {
    const content = slide.querySelector('.carousel-content');
    if (content) {
      if (index === currentSlide) {
        content.style.animation = 'none';
        setTimeout(() => {
          content.style.animation = 'slideContentIn 1s ease-out forwards';
        }, 10);
      }
    }
  });
}

function setupCarouselTouchEvents() {
  const container = document.getElementById('carouselContainer');
  
  container.addEventListener('touchstart', (e) => {
    carouselTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  container.addEventListener('touchend', (e) => {
    carouselTouchEndX = e.changedTouches[0].screenX;
    handleCarouselSwipe();
  }, { passive: true });
}

function handleCarouselSwipe() {
  const swipeThreshold = 50;
  const diff = carouselTouchStartX - carouselTouchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      carouselNavigate(1);
    } else {
      carouselNavigate(-1);
    }
    startCarouselAutoPlay();
  }
}

function setupCarouselHoverPause() {
  const container = document.getElementById('carouselContainer');
  
  container.addEventListener('mouseenter', () => {
    isCarouselPaused = true;
  });
  
  container.addEventListener('mouseleave', () => {
    isCarouselPaused = false;
  });
}

// Customer Site Functions
function initializeCustomerSite() {
  renderCategoryGrid();
  renderTrendingProducts();
  renderShopProducts();
  initializeFilters();
}

function renderCategoryGrid() {
  const grid = document.getElementById('categoryGrid');
  // Real product images for each category
  const categoryImages = [
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80' },
    { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80' },
    { name: 'Cargo', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80' }
  ];
  grid.innerHTML = categories.map((cat, idx) => {
    const imageData = categoryImages[idx] || { name: cat, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' };
    const productCount = products.filter(p => p.category === cat).length;
    return `
    <div class="category-card" onclick="filterByCategory('${cat}')" title="Shop ${cat}">
      <div class="category-card-image" style="background-image: url('${imageData.image}');"></div>
      <div class="category-card-content">
        <h3>${cat}</h3>
        <p>${productCount} ${productCount === 1 ? 'item' : 'items'}</p>
      </div>
    </div>
    `;
  }).join('');
}

function renderTrendingProducts() {
  const grid = document.getElementById('trendingProducts');
  const trending = products.slice(0, 8);
  grid.innerHTML = trending.map(p => createProductCard(p)).join('');
}

function renderShopProducts() {
  const grid = document.getElementById('shopProducts');
  const count = document.getElementById('productsCount');
  grid.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
  count.textContent = filteredProducts.length;
}

function createProductCard(product) {
  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;
  const isWishlisted = wishlist.some(w => w.id === product.id);
  
  return `
    <div class="product-card">
      <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
        ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="sold-by-badge"><i class="fas fa-store"></i> Sold by ${product.soldBy || 'AKRUL'}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="reviews-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${product.price}</span>
          ${product.comparePrice ? `<span class="price-original">₹${product.comparePrice}</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn-quick-view" onclick="quickView(${product.id})"><i class="fas fa-eye"></i></button>
        </div>
      </div>
    </div>
  `;
}

function initializeFilters() {
  // Category filters
  const categoryFilters = document.getElementById('categoryFilters');
  categoryFilters.innerHTML = categories.map(cat => `
    <label><input type="checkbox" value="${cat}"> ${cat}</label>
  `).join('');
  
  // Size filters
  const sizeFilters = document.getElementById('sizeFilters');
  sizeFilters.innerHTML = sizes.map(size => `
    <label><input type="checkbox" value="${size}"> ${size}</label>
  `).join('');
  
  // Color filters
  const colorFilters = document.getElementById('colorFilters');
  const colorMap = { Black: '#000', White: '#fff', Navy: '#001f3f', Grey: '#888', Blue: '#0074D9', Red: '#FF4136', Green: '#2ECC40' };
  colorFilters.innerHTML = colors.map(color => `
    <div class="color-swatch" style="background: ${colorMap[color]}; border: 1px solid #555;" onclick="toggleColorFilter('${color}')"></div>
  `).join('');
}

function updatePriceLabel() {
  const value = document.getElementById('priceRange').value;
  document.getElementById('priceLabel').textContent = value;
}

function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('#categoryFilters input:checked')).map(cb => cb.value);
  const selectedSizes = Array.from(document.querySelectorAll('#sizeFilters input:checked')).map(cb => cb.value);
  const maxPrice = parseInt(document.getElementById('priceRange').value);
  
  filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const priceMatch = p.price <= maxPrice;
    const sizeMatch = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
    return categoryMatch && priceMatch && sizeMatch;
  });
  
  renderShopProducts();
}

function resetFilters() {
  document.querySelectorAll('#categoryFilters input, #sizeFilters input').forEach(cb => cb.checked = false);
  document.getElementById('priceRange').value = 10000;
  updatePriceLabel();
  filteredProducts = [...products];
  renderShopProducts();
}

function sortProducts() {
  const sortBy = document.getElementById('sortSelect').value;
  
  switch(sortBy) {
    case 'priceLow':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'priceHigh':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    default:
      filteredProducts = [...products];
  }
  
  renderShopProducts();
}

function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );
  renderShopProducts();
  showPage('shop');
}

function filterByCategory(category) {
  showPage('shop');
  document.querySelectorAll('#categoryFilters input').forEach(cb => {
    cb.checked = cb.value === category;
  });
  applyFilters();
}

function toggleColorFilter(color) {
  // Simple visual toggle
  event.target.classList.toggle('active');
}

// Cart Functions
function addToCart(productId, fromDetail = false) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Validation for size and color from product detail page
  if (fromDetail) {
    if (!selectedSize) {
      alert('⚠️ Please select a size before adding to cart');
      return;
    }
    if (!selectedColor) {
      alert('⚠️ Please select a color before adding to cart');
      return;
    }
  }
  
  const size = fromDetail ? selectedSize : product.sizes[0];
  const color = fromDetail ? selectedColor : product.colors[0];
  const quantity = fromDetail ? productQuantity : 1;
  
  const existingItem = cart.find(item => 
    item.id === productId && 
    item.selectedSize === size && 
    item.selectedColor === color
  );
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity: quantity, selectedSize: size, selectedColor: color });
  }
  
  updateCartBadge();
  
  // Success message with details
  const message = `✅ Added to cart!\n${product.name}\nSize: ${size} | Color: ${color} | Qty: ${quantity}`;
  alert(message);
  
  // Reset selections if from detail page
  if (fromDetail) {
    selectedSize = null;
    selectedColor = null;
    productQuantity = 1;
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <button class="btn btn-primary" onclick="showPage('shop')">Continue Shopping</button>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <div class="cart-item-meta"><i class="fas fa-store" style="color: var(--accent-gold); margin-right: 4px;"></i>Sold by ${item.soldBy || 'AKRUL'}</div>
          <div class="cart-item-meta">Size: ${item.selectedSize} | Color: ${item.selectedColor}</div>
          <div class="quantity-controls">
            <button onclick="updateCartQuantity(${idx}, -1)"><i class="fas fa-minus"></i></button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQuantity(${idx}, 1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <div class="cart-item-actions">
          <div class="cart-item-price">₹${item.price * item.quantity}</div>
          <button class="remove-btn" onclick="removeFromCart(${idx})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `).join('');
  }
  
  updateCartSummary();
}

function updateCartQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartBadge();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCart();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const discount = 0;
  const total = subtotal + shipping - discount;
  
  document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `₹${shipping}`;
  document.getElementById('cartDiscount').textContent = `₹${discount}`;
  document.getElementById('cartTotal').textContent = `₹${total}`;
}

function applyCoupon() {
  const code = document.getElementById('couponCode').value;
  if (code === 'AKRUL10') {
    alert('Coupon applied! 10% discount');
  } else {
    alert('Invalid coupon code');
  }
}

// Wishlist Functions
function toggleWishlist(productId) {
  // Check if user is logged in (optional - can work for guests too)
  if (!currentUser) {
    // Guest users can still use wishlist, but show a message
    const proceed = confirm('💡 Login to save your wishlist across devices!\n\nContinue as guest? (Items will be saved in this browser only)');
    if (!proceed) {
      toggleAuthModal();
      return;
    }
  }
  
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const index = wishlist.findIndex(w => w.id === productId);
  
  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    showNotification(`💔 Removed from wishlist\n${product.name}`, 'info');
  } else {
    // Add to wishlist
    wishlist.push(product);
    showNotification(`❤️ Added to wishlist!\n${product.name}`, 'success');
  }
  
  updateWishlistBadge();
  
  // Re-render current view
  if (document.getElementById('homePage').classList.contains('active')) {
    renderTrendingProducts();
  }
  if (document.getElementById('shopPage').classList.contains('active')) {
    renderShopProducts();
  }
  if (document.getElementById('wishlistPage').classList.contains('active')) {
    renderWishlistPage();
  }
  if (document.getElementById('productDetailPage').classList.contains('active')) {
    renderProductDetail();
  }
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistBadge');
  if (badge) {
    badge.textContent = wishlist.length;
  }
}

function renderWishlistPage() {
  const grid = document.getElementById('wishlistProductsGrid');
  const container = document.getElementById('wishlistContent');
  
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-heart-broken" style="font-size: 5rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
        <h3>Your Wishlist is Empty</h3>
        <p style="color: var(--text-gray); margin-bottom: 2rem;">Save items you love for later!</p>
        <button class="btn btn-primary" onclick="showPage('shop')">
          <i class="fas fa-shopping-bag"></i> Continue Shopping
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background: var(--card-bg); border-radius: 12px;">
        <div>
          <h3 style="margin: 0; color: var(--accent-gold);">${wishlist.length} ${wishlist.length === 1 ? 'Item' : 'Items'} in Wishlist</h3>
          <p style="color: var(--text-gray); margin: 0.5rem 0 0 0; font-size: 0.9rem;">Save your favorite products here</p>
        </div>
        <button class="btn btn-secondary" onclick="clearWishlist()" title="Clear all items">
          <i class="fas fa-trash"></i> Clear All
        </button>
      </div>
      <div class="products-grid" id="wishlistProductsGrid"></div>
    `;
    
    const newGrid = document.getElementById('wishlistProductsGrid');
    newGrid.innerHTML = wishlist.map(p => createWishlistProductCard(p)).join('');
  }
}

function createWishlistProductCard(product) {
  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;
  
  return `
    <div class="product-card">
      <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
        ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
        <button class="wishlist-btn active" onclick="toggleWishlist(${product.id})" title="Remove from wishlist">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="sold-by-badge"><i class="fas fa-store"></i> Sold by ${product.soldBy || 'AKRUL'}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="reviews-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${product.price}</span>
          ${product.comparePrice ? `<span class="price-original">₹${product.comparePrice}</span>` : ''}
        </div>
        <div class="product-actions" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <button class="btn-add-cart" onclick="addToCart(${product.id})" style="width: 100%;">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn-quick-view" onclick="viewProductDetail(${product.id})" style="flex: 1;">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="btn-quick-view" onclick="toggleWishlist(${product.id})" style="flex: 1; background: var(--accent-crimson); color: white;" title="Remove from wishlist">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function clearWishlist() {
  if (wishlist.length === 0) return;
  
  if (confirm(`🗑️ Clear all ${wishlist.length} items from your wishlist?\n\nThis action cannot be undone.`)) {
    const count = wishlist.length;
    wishlist = [];
    updateWishlistBadge();
    renderWishlistPage();
    showNotification(`✅ Cleared ${count} items from wishlist`, 'success');
  }
}

function showNotification(message, type = 'info') {
  // Simple alert for now - can be enhanced with toast notifications
  alert(message);
}

function renderWishlist() {
  const grid = document.getElementById('wishlistProducts');
  if (!grid) return;
  
  if (wishlist.length === 0) {
    grid.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No items in wishlist</p>';
  } else {
    grid.innerHTML = wishlist.map(p => createProductCard(p)).join('');
  }
}

// Quick View
function quickView(productId) {
  const product = products.find(p => p.id === productId);
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  
  content.innerHTML = `
    <h2>${product.name}</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem;">
      <div style="background: var(--secondary-dark); height: 300px; display: flex; align-items: center; justify-content: center; border-radius: 12px; background-image: url('${product.image}'); background-size: cover; background-position: center;">
      </div>
      <div>
        <div style="display: flex; gap: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <span class="seller-badge" style="font-size: 0.85rem; padding: 0.5rem 0.8rem;"><i class="fas fa-store"></i> Sold by ${product.soldBy || 'AKRUL'}</span>
          <span class="manufacturer-badge" style="font-size: 0.85rem; padding: 0.5rem 0.8rem;"><i class="fas fa-industry"></i> Manufactured by ${product.manufacturedBy || 'AKRUL'}</span>
        </div>
        <div class="product-price" style="margin-bottom: 1rem;">
          <span class="price-current">₹${product.price}</span>
          ${product.comparePrice ? `<span class="price-original">₹${product.comparePrice}</span>` : ''}
        </div>
        <p style="color: var(--text-gray); margin-bottom: 1rem;">${product.description}</p>
        <div style="margin: 0.8rem 0; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
          <strong style="color: var(--accent-gold);">Material:</strong> <span style="color: var(--text-gray);">${product.material || 'Premium Fabric'}</span>
        </div>
        <div style="margin: 0.8rem 0; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
          <strong style="color: var(--accent-gold);">Fit:</strong> <span style="color: var(--text-gray);">${product.fit || 'Regular'}</span>
        </div>
        <div style="margin: 1rem 0;">
          <strong>Available Sizes:</strong> ${product.sizes.join(', ')}
        </div>
        <div style="margin: 1rem 0;">
          <strong>Available Colors:</strong> ${product.colors.join(', ')}
        </div>
        <button class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeQuickView();">Add to Cart</button>
        <button class="btn btn-secondary btn-full" style="margin-top: 0.5rem;" onclick="viewProductDetail(${product.id}); closeQuickView();">View Full Details</button>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeQuickView() {
  document.getElementById('quickViewModal').classList.remove('active');
}

function viewProductDetail(productId) {
  currentProduct = products.find(p => p.id === productId);
  renderProductDetail();
  showPage('productDetail');
}

function renderProductDetail() {
  if (!currentProduct) return;
  
  // Reset selections when viewing product
  selectedSize = null;
  selectedColor = null;
  productQuantity = 1;
  
  const breadcrumb = document.getElementById('productBreadcrumb');
  breadcrumb.innerHTML = `<a href="#" onclick="showPage('home')">Home</a> / <a href="#" onclick="showPage('shop')">Shop</a> / ${currentProduct.name}`;
  
  const detail = document.getElementById('productDetail');
  detail.innerHTML = `
    <div class="product-gallery">
      <div class="main-image" style="background-image: url('${currentProduct.images[0]}'); background-size: cover; background-position: center;"></div>
      <div class="thumbnail-images">
        ${currentProduct.images.map((img, idx) => `<div class="thumbnail ${idx === 0 ? 'active' : ''}" style="background-image: url('${img}'); background-size: cover; background-position: center;"></div>`).join('')}
      </div>
    </div>
    <div class="product-detail-info">
      <div class="seller-manufacturer-badges">
        <span class="seller-badge"><i class="fas fa-store"></i> Sold by ${currentProduct.soldBy || 'AKRUL'}</span>
        <span class="manufacturer-badge"><i class="fas fa-industry"></i> Manufactured by ${currentProduct.manufacturedBy || 'AKRUL'}</span>
      </div>
      <h1>${currentProduct.name}</h1>
      <div class="product-rating">
        <span class="stars">${'★'.repeat(Math.floor(currentProduct.rating))}${'☆'.repeat(5 - Math.floor(currentProduct.rating))}</span>
        <span class="reviews-count">(${currentProduct.reviews} reviews)</span>
      </div>
      <div class="product-detail-price">
        <span class="price-current" style="font-size: 2rem;">₹${currentProduct.price}</span>
        ${currentProduct.comparePrice ? `<span class="price-original" style="font-size: 1.3rem;">₹${currentProduct.comparePrice}</span>` : ''}
      </div>
      <p style="color: var(--text-gray); line-height: 1.8; margin-bottom: 1.5rem;">${currentProduct.description}</p>
      
      <div class="product-specifications">
        <h3 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--accent-gold);">Product Specifications</h3>
        <div class="spec-grid">
          <div class="spec-item"><strong>SKU:</strong> ${currentProduct.sku}</div>
          <div class="spec-item"><strong>Brand:</strong> AKRUL</div>
          <div class="spec-item"><strong>Material:</strong> ${currentProduct.material || 'Premium Fabric'}</div>
          <div class="spec-item"><strong>Fit:</strong> ${currentProduct.fit || 'Regular'}</div>
          <div class="spec-item"><strong>Care:</strong> ${currentProduct.careInstructions || 'Machine wash'}</div>
          <div class="spec-item"><strong>Origin:</strong> ${currentProduct.countryOfOrigin || 'India'}</div>
        </div>
      </div>
      <div class="size-selector">
        <h4>Select Size <span style="color: var(--accent-gold);">*</span></h4>
        <div class="size-options" id="sizeOptionsDetail">
          ${currentProduct.sizes.map(s => `<div class="size-option" onclick="selectSize('${s}')">${s}</div>`).join('')}
        </div>
      </div>
      <div class="color-selector">
        <h4>Select Color <span style="color: var(--accent-gold);">*</span></h4>
        <div class="color-options" id="colorOptionsDetail">
          ${currentProduct.colors.map(c => `<div class="color-option" onclick="selectColor('${c}')">${c}</div>`).join('')}
        </div>
      </div>
      <div class="quantity-selector">
        <h4>Quantity:</h4>
        <div class="quantity-controls">
          <button onclick="updateProductQuantity(-1)"><i class="fas fa-minus"></i></button>
          <span id="productQuantityDisplay">1</span>
          <button onclick="updateProductQuantity(1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
        <button class="btn btn-primary" style="flex: 3;" onclick="addToCart(${currentProduct.id}, true)">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="btn-wishlist-detail ${wishlist.some(w => w.id === currentProduct.id) ? 'active' : ''}" style="flex: 2;" onclick="toggleWishlist(${currentProduct.id}); renderProductDetail();" title="${wishlist.some(w => w.id === currentProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}">
          <i class="fas fa-heart"></i> ${wishlist.some(w => w.id === currentProduct.id) ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
      <button class="btn btn-secondary btn-full" onclick="showPage('cart')">
        <i class="fas fa-bolt"></i> Buy Now
      </button>
    </div>
  `;
  
  // Render related products
  const related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
  document.getElementById('relatedProducts').innerHTML = related.map(p => createProductCard(p)).join('');
}

// Form Validation Functions
function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return false;
  
  const value = field.value.trim();
  const errorSpan = document.getElementById(`${fieldId}-error`);
  let isValid = true;
  let errorMessage = '';
  
  // Clear previous states
  field.classList.remove('error', 'success');
  
  // Field-specific validation
  switch(fieldId) {
    case 'shippingName':
    case 'cardholderName':
      if (value === '') {
        errorMessage = 'Name is required';
        isValid = false;
      } else if (value.length < 3) {
        errorMessage = 'Name must be at least 3 characters';
        isValid = false;
      } else if (/\d/.test(value)) {
        errorMessage = 'Name cannot contain numbers';
        isValid = false;
      }
      break;
      
    case 'shippingEmail':
      if (value === '') {
        errorMessage = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = 'Please enter a valid email address (e.g., user@example.com)';
        isValid = false;
      }
      break;
      
    case 'shippingPhone':
      if (value === '') {
        errorMessage = 'Phone number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
        errorMessage = 'Please enter a valid 10-digit phone number';
        isValid = false;
      }
      break;
      
    case 'shippingAddress':
      if (value === '') {
        errorMessage = 'Address is required';
        isValid = false;
      } else if (value.length < 10) {
        errorMessage = 'Address must be at least 10 characters';
        isValid = false;
      }
      break;
      
    case 'shippingCity':
      if (value === '') {
        errorMessage = 'City is required';
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = 'City name is too short';
        isValid = false;
      } else if (/\d/.test(value)) {
        errorMessage = 'City name cannot contain numbers';
        isValid = false;
      }
      break;
      
    case 'shippingState':
      if (value === '') {
        errorMessage = 'State/Province is required';
        isValid = false;
      } else if (value.length < 2) {
        errorMessage = 'State name is too short';
        isValid = false;
      }
      break;
      
    case 'shippingPincode':
      if (value === '') {
        errorMessage = 'Postal code is required';
        isValid = false;
      } else if (value.length < 4) {
        errorMessage = 'Postal code must be at least 4 characters';
        isValid = false;
      } else if (!/^\d{6}$/.test(value)) {
        errorMessage = 'Please enter a valid 6-digit postal code';
        isValid = false;
      }
      break;
      
    case 'shippingCountry':
      if (value === '') {
        errorMessage = 'Country is required';
        isValid = false;
      }
      break;
      
    case 'cardNumber':
      const cardNum = value.replace(/\s/g, '');
      if (cardNum === '') {
        errorMessage = 'Card number is required';
        isValid = false;
      } else if (!/^\d{16}$/.test(cardNum)) {
        errorMessage = 'Card number must be 16 digits';
        isValid = false;
      }
      break;
      
    case 'cardExpiry':
      if (value === '') {
        errorMessage = 'Expiry date is required';
        isValid = false;
      } else if (!/^\d{2}\/\d{2}$/.test(value)) {
        errorMessage = 'Format must be MM/YY';
        isValid = false;
      } else {
        const [month, year] = value.split('/');
        const monthNum = parseInt(month);
        if (monthNum < 1 || monthNum > 12) {
          errorMessage = 'Invalid month (01-12)';
          isValid = false;
        }
      }
      break;
      
    case 'cardCVV':
      if (value === '') {
        errorMessage = 'CVV is required';
        isValid = false;
      } else if (!/^\d{3,4}$/.test(value)) {
        errorMessage = 'CVV must be 3 or 4 digits';
        isValid = false;
      }
      break;
      
    case 'upiId':
      if (value === '') {
        errorMessage = 'UPI ID is required';
        isValid = false;
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(value)) {
        errorMessage = 'Please enter a valid UPI ID (e.g., yourname@bank)';
        isValid = false;
      }
      break;
      
    case 'walletType':
      if (value === '') {
        errorMessage = 'Please select a wallet';
        isValid = false;
      }
      break;
  }
  
  // Update UI
  if (errorSpan) {
    errorSpan.textContent = errorMessage;
  }
  
  if (isValid) {
    field.classList.add('success');
  } else {
    field.classList.add('error');
  }
  
  return isValid;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);
  
  if (field) {
    field.classList.remove('error', 'success');
  }
  if (errorSpan) {
    errorSpan.textContent = '';
  }
}

function validateShippingForm() {
  const fields = [
    'shippingName',
    'shippingEmail',
    'shippingPhone',
    'shippingAddress',
    'shippingCity',
    'shippingState',
    'shippingPincode',
    'shippingCountry'
  ];
  
  let allValid = true;
  let firstInvalidField = null;
  
  fields.forEach(fieldId => {
    const isValid = validateField(fieldId);
    if (!isValid) {
      allValid = false;
      if (!firstInvalidField) {
        firstInvalidField = document.getElementById(fieldId);
      }
    }
  });
  
  // Focus on first invalid field
  if (!allValid && firstInvalidField) {
    firstInvalidField.focus();
    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  return allValid;
}

function validatePaymentForm() {
  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  let fieldsToValidate = [];
  
  switch(method) {
    case 'card':
      fieldsToValidate = ['cardNumber', 'cardholderName', 'cardExpiry', 'cardCVV'];
      break;
    case 'upi':
      fieldsToValidate = ['upiId'];
      break;
    case 'wallet':
      fieldsToValidate = ['walletType'];
      break;
    case 'cod':
      const codConfirm = document.getElementById('codConfirm');
      if (!codConfirm || !codConfirm.checked) {
        const errorSpan = document.getElementById('codConfirm-error');
        if (errorSpan) {
          errorSpan.textContent = 'Please confirm Cash on Delivery';
        }
        return false;
      }
      return true;
  }
  
  let allValid = true;
  let firstInvalidField = null;
  
  fieldsToValidate.forEach(fieldId => {
    const isValid = validateField(fieldId);
    if (!isValid) {
      allValid = false;
      if (!firstInvalidField) {
        firstInvalidField = document.getElementById(fieldId);
      }
    }
  });
  
  if (!allValid && firstInvalidField) {
    firstInvalidField.focus();
    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  return allValid;
}

function validateAndProceedToPayment() {
  if (validateShippingForm()) {
    shippingFormValid = true;
    nextCheckoutStep();
  } else {
    alert('⚠️ Please fill all required fields correctly before proceeding.');
  }
}

function validateAndProceedToReview() {
  if (validatePaymentForm()) {
    paymentFormValid = true;
    nextCheckoutStep();
  } else {
    alert('⚠️ Please complete payment details correctly before proceeding.');
  }
}

function showPaymentForm(method) {
  currentPaymentMethod = method;
  
  // Hide all forms
  document.getElementById('cardForm').style.display = 'none';
  document.getElementById('upiForm').style.display = 'none';
  document.getElementById('walletForm').style.display = 'none';
  document.getElementById('codForm').style.display = 'none';
  
  // Show selected form
  switch(method) {
    case 'card':
      document.getElementById('cardForm').style.display = 'block';
      break;
    case 'upi':
      document.getElementById('upiForm').style.display = 'block';
      break;
    case 'wallet':
      document.getElementById('walletForm').style.display = 'block';
      break;
    case 'cod':
      document.getElementById('codForm').style.display = 'block';
      break;
  }
}

function formatCardNumber(input) {
  let value = input.value.replace(/\s/g, '');
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
  input.value = formattedValue;
}

function formatExpiry(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  input.value = value;
}

// Checkout
function renderCheckout() {
  // Check if cart is empty
  if (cart.length === 0) {
    alert('⚠️ Your cart is empty');
    showPage('shop');
    return;
  }
  
  // Load saved addresses if user is logged in
  if (currentUser && userAddresses.length > 0) {
    renderSavedAddressesInCheckout();
  }
  
  updateCheckoutSummary();
  currentCheckoutStep = 1;
  shippingFormValid = false;
  paymentFormValid = false;
  currentPaymentMethod = 'card';
  updateCheckoutProgress();
  
  // Clear all form fields and errors
  const shippingForm = document.getElementById('shippingForm');
  if (shippingForm) {
    shippingForm.reset();
  }
  
  // Clear all error messages
  document.querySelectorAll('.error-message').forEach(span => {
    span.textContent = '';
  });
  
  // Clear all error/success states
  document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.classList.remove('error', 'success');
  });
  
  // Set default country
  const countryField = document.getElementById('shippingCountry');
  if (countryField) {
    countryField.value = 'India';
  }
  
  // Pre-fill shipping form if user is logged in
  if (currentUser) {
    // Check if user has saved addresses
    if (userAddresses.length > 0) {
      const defaultAddress = userAddresses.find(a => a.default) || userAddresses[0];
      fillShippingFormWithAddress(defaultAddress);
    } else {
      document.getElementById('shippingName').value = currentUser.fullName;
      document.getElementById('shippingEmail').value = currentUser.email;
      document.getElementById('shippingPhone').value = currentUser.phone;
    }
  }
}

function renderSavedAddressesInCheckout() {
  const shippingStep = document.getElementById('shippingStep');
  
  // Add saved addresses section before the form
  const addressesSection = document.createElement('div');
  addressesSection.id = 'savedAddressesSection';
  addressesSection.style.marginBottom = '2rem';
  
  const defaultAddress = userAddresses.find(a => a.default) || userAddresses[0];
  
  addressesSection.innerHTML = `
    <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; border: 2px solid var(--accent-gold); margin-bottom: 1.5rem;">
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-map-marker-alt"></i> Select Delivery Address</h4>
      <div id="checkoutAddressList" style="display: grid; gap: 1rem;">
        ${userAddresses.map(addr => `
          <label class="checkout-address-option" style="display: flex; gap: 1rem; padding: 1rem; background: var(--secondary-dark); border-radius: 8px; cursor: pointer; border: 2px solid ${addr.default ? 'var(--accent-gold)' : 'var(--border-dark)'}; transition: all 0.3s;">
            <input type="radio" name="checkoutAddress" value="${addr.id}" ${addr.default ? 'checked' : ''} onchange="selectCheckoutAddress(${addr.id})" style="margin-top: 0.2rem;">
            <div style="flex: 1;">
              <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
                <span style="background: var(--accent-gold); color: var(--primary-dark); padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">
                  <i class="fas ${addr.type === 'Home' ? 'fa-home' : addr.type === 'Office' ? 'fa-building' : 'fa-map-pin'}"></i> ${addr.type}
                </span>
                ${addr.default ? '<span style="color: var(--accent-gold); font-size: 0.75rem; font-weight: 600;"><i class="fas fa-star"></i> Default</span>' : ''}
              </div>
              <div style="font-weight: 600; margin-bottom: 0.3rem;">${addr.name}</div>
              <div style="font-size: 0.9rem; color: var(--text-gray); line-height: 1.6;">
                ${addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode}<br>
                <i class="fas fa-phone"></i> ${addr.phone}
              </div>
            </div>
          </label>
        `).join('')}
      </div>
      <button class="btn btn-secondary" style="margin-top: 1rem; width: 100%;" onclick="showNewAddressForm()">
        <i class="fas fa-plus"></i> Use a Different Address
      </button>
    </div>
  `;
  
  // Insert before the form
  const form = shippingStep.querySelector('form');
  if (form && !document.getElementById('savedAddressesSection')) {
    shippingStep.insertBefore(addressesSection, form);
    
    // Initially hide the form since we have saved addresses
    form.style.display = 'none';
  }
}

function selectCheckoutAddress(addressId) {
  const address = userAddresses.find(a => a.id === addressId);
  if (address) {
    fillShippingFormWithAddress(address);
  }
}

function fillShippingFormWithAddress(address) {
  document.getElementById('shippingName').value = address.name;
  document.getElementById('shippingPhone').value = address.phone;
  document.getElementById('shippingEmail').value = currentUser ? currentUser.email : '';
  document.getElementById('shippingAddress').value = address.street;
  document.getElementById('shippingCity').value = address.city;
  document.getElementById('shippingState').value = address.state;
  document.getElementById('shippingPincode').value = address.postalCode;
  document.getElementById('shippingCountry').value = address.country;
}

function showNewAddressForm() {
  const form = document.querySelector('#shippingStep form');
  if (form) {
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateCheckoutSummary() {
  const summary = document.getElementById('checkoutSummary');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;
  
  summary.innerHTML = `
    ${cart.map(item => `
      <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-dark);">
        <div style="width: 60px; height: 60px; background: var(--secondary-dark); border-radius: 8px; background-image: url('${item.image}'); background-size: cover; background-position: center;">
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600;">${item.name}</div>
          <div style="color: var(--accent-gold); font-size: 0.85rem; margin: 0.2rem 0;"><i class="fas fa-store"></i> Sold by ${item.soldBy || 'AKRUL'}</div>
          <div style="color: var(--text-gray); font-size: 0.9rem;">Qty: ${item.quantity}</div>
        </div>
        <div style="font-weight: 600;">₹${item.price * item.quantity}</div>
      </div>
    `).join('')}
    <div class="summary-row"><span>Subtotal:</span><span>₹${subtotal}</span></div>
    <div class="summary-row"><span>Shipping:</span><span>${shipping === 0 ? 'Free' : '₹' + shipping}</span></div>
    <div class="summary-row total"><span>Total:</span><span>₹${total}</span></div>
  `;
}

function updateCheckoutProgress() {
  document.querySelectorAll('.progress-step').forEach((step, idx) => {
    if (idx < currentCheckoutStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  
  document.querySelectorAll('.checkout-step').forEach(step => step.style.display = 'none');
  
  if (currentCheckoutStep === 1) {
    document.getElementById('shippingStep').style.display = 'block';
  } else if (currentCheckoutStep === 2) {
    document.getElementById('paymentStep').style.display = 'block';
  } else if (currentCheckoutStep === 3) {
    document.getElementById('reviewStep').style.display = 'block';
    renderOrderReview();
  }
}

function nextCheckoutStep() {
  if (currentCheckoutStep < 3) {
    currentCheckoutStep++;
    updateCheckoutProgress();
  }
}

function prevCheckoutStep() {
  if (currentCheckoutStep > 1) {
    currentCheckoutStep--;
    updateCheckoutProgress();
  }
}

function renderOrderReview() {
  const review = document.getElementById('orderReview');
  const name = document.getElementById('shippingName').value;
  const email = document.getElementById('shippingEmail').value;
  const phone = document.getElementById('shippingPhone').value;
  const address = document.getElementById('shippingAddress').value;
  const city = document.getElementById('shippingCity').value;
  const state = document.getElementById('shippingState').value;
  const pincode = document.getElementById('shippingPincode').value;
  const country = document.getElementById('shippingCountry').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  
  let paymentDetails = '';
  switch(paymentMethod) {
    case 'card':
      const cardNum = document.getElementById('cardNumber').value;
      const maskedCard = '**** **** **** ' + cardNum.slice(-4);
      paymentDetails = `Credit/Debit Card<br><span style="font-family: monospace;">${maskedCard}</span>`;
      break;
    case 'upi':
      const upiId = document.getElementById('upiId').value;
      paymentDetails = `UPI<br>${upiId}`;
      break;
    case 'wallet':
      const wallet = document.getElementById('walletType').value;
      const walletNames = {paytm: 'Paytm', gpay: 'Google Pay', phonepe: 'PhonePe', amazonpay: 'Amazon Pay'};
      paymentDetails = `Digital Wallet<br>${walletNames[wallet] || wallet}`;
      break;
    case 'cod':
      paymentDetails = 'Cash on Delivery';
      break;
  }
  
  review.innerHTML = `
    <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-dark);">
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-shipping-fast"></i> Shipping Address</h4>
      <div style="line-height: 1.8; color: var(--text-light);">
        <strong>${name}</strong><br>
        ${address}<br>
        ${city}, ${state} - ${pincode}<br>
        ${country}<br><br>
        <i class="fas fa-phone" style="color: var(--accent-gold);"></i> ${phone}<br>
        <i class="fas fa-envelope" style="color: var(--accent-gold);"></i> ${email}
      </div>
      <button class="btn btn-text" onclick="currentCheckoutStep = 0; nextCheckoutStep();" style="margin-top: 1rem; padding: 0.5rem 1rem;">
        <i class="fas fa-edit"></i> Edit Address
      </button>
    </div>
    <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-dark);">
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-credit-card"></i> Payment Method</h4>
      <div style="line-height: 1.8; color: var(--text-light);">
        ${paymentDetails}
      </div>
      <button class="btn btn-text" onclick="currentCheckoutStep = 1; nextCheckoutStep();" style="margin-top: 1rem; padding: 0.5rem 1rem;">
        <i class="fas fa-edit"></i> Change Payment Method
      </button>
    </div>
  `;
}

// Generate unique order number with AKR prefix
function generateOrderNumber() {
  const timestamp = Date.now();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  return `AKR-${year}${month}${day}${hours}${minutes}-${random}`;
}

function processPaymentThroughGateway(paymentMethod) {
  return new Promise((resolve) => {
    // Simulate payment gateway processing
    const transactionId = 'TXN' + Date.now() + Math.floor(Math.random() * 10000);
    const processingTime = Math.random() * 2000 + 1500; // 1.5-3.5 seconds
    
    setTimeout(() => {
      // Simulate payment success/failure (95% success rate for demo)
      const isSuccess = Math.random() > 0.05;
      
      const result = {
        success: isSuccess,
        transactionId: transactionId,
        paymentMethod: paymentMethod,
        gateway: paymentGatewaySettings.gateway,
        timestamp: new Date().toISOString(),
        amount: calculateOrderTotal()
      };
      
      if (isSuccess) {
        result.message = 'Payment verified successfully';
        result.status = 'Completed';
        result.authCode = 'AUTH' + Math.floor(Math.random() * 1000000);
      } else {
        result.status = 'Failed';
        const errors = [
          'Insufficient funds',
          'Card declined by issuer',
          'Invalid card details',
          'Transaction timeout',
          'Gateway error - please try again'
        ];
        result.message = errors[Math.floor(Math.random() * errors.length)];
        result.errorCode = 'ERR' + Math.floor(Math.random() * 9000 + 1000);
      }
      
      // Log transaction
      paymentTransactions.unshift(result);
      
      resolve(result);
    }, processingTime);
  });
}

function calculateOrderTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  return subtotal + shipping;
}

function showPaymentProcessingModal(method) {
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  const methodNames = {
    card: 'Credit/Debit Card',
    upi: 'UPI',
    wallet: 'Digital Wallet',
    cod: 'Cash on Delivery'
  };
  
  content.innerHTML = `
    <div style="text-align: center; padding: 3rem 2rem;">
      <div class="payment-processing-spinner" style="font-size: 4rem; color: var(--accent-gold); margin-bottom: 1.5rem;">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <h2 style="color: var(--accent-gold); margin-bottom: 1rem;">Processing Payment</h2>
      <p style="color: var(--text-gray); font-size: 1.1rem; margin-bottom: 1rem;" id="paymentStatusText">
        Please wait while we verify your payment...
      </p>
      <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin-top: 2rem; border: 1px solid var(--border-dark);">
        <div style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">Payment Method</div>
        <div style="font-weight: 600; font-size: 1.2rem;">${methodNames[method] || method}</div>
        <div style="color: var(--text-gray); font-size: 0.9rem; margin-top: 1rem;">Gateway: ${paymentGatewaySettings.gateway.toUpperCase()}</div>
      </div>
      <p style="color: var(--text-gray); font-size: 0.85rem; margin-top: 2rem;">
        <i class="fas fa-lock" style="color: var(--accent-gold);"></i> Secure payment processing
      </p>
    </div>
  `;
  
  modal.classList.add('active');
}

function updatePaymentProcessingModal(status, result) {
  const content = document.getElementById('orderModalContent');
  
  if (status === 'success') {
    content.innerHTML = `
      <div style="text-align: center; padding: 3rem 2rem;">
        <div style="font-size: 4rem; color: var(--success); margin-bottom: 1.5rem;">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: var(--success); margin-bottom: 1rem;">Payment Successful!</h2>
        <p style="color: var(--text-gray); font-size: 1.1rem;">
          Your payment has been verified successfully
        </p>
        <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin-top: 2rem; border: 2px solid var(--success);">
          <div style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 0.5rem;">Transaction ID</div>
          <div style="font-weight: 700; font-size: 1.1rem; font-family: 'Courier New', monospace; color: var(--accent-gold);">${result.transactionId}</div>
          <div style="color: var(--text-gray); font-size: 0.9rem; margin-top: 1rem;">Amount: ₹${result.amount}</div>
        </div>
        <p style="color: var(--text-gray); font-size: 0.9rem; margin-top: 1.5rem;">
          <i class="fas fa-spinner fa-spin"></i> Creating your order...
        </p>
      </div>
    `;
  } else if (status === 'failed') {
    content.innerHTML = `
      <div style="text-align: center; padding: 3rem 2rem;">
        <div style="font-size: 4rem; color: var(--danger); margin-bottom: 1.5rem;">
          <i class="fas fa-times-circle"></i>
        </div>
        <h2 style="color: var(--danger); margin-bottom: 1rem;">Payment Failed</h2>
        <p style="color: var(--text-light); font-size: 1.1rem; margin-bottom: 1rem;">
          ${result.message}
        </p>
        ${result.errorCode ? `
          <div style="background: var(--primary-dark); padding: 1rem; border-radius: 8px; margin-top: 1.5rem; border: 1px solid var(--danger);">
            <div style="color: var(--text-gray); font-size: 0.85rem;">Error Code: <span style="font-family: 'Courier New', monospace; color: var(--danger);">${result.errorCode}</span></div>
          </div>
        ` : ''}
        <p style="color: var(--text-gray); font-size: 0.9rem; margin-top: 2rem;">
          Your order has not been placed. No charges were made.
        </p>
      </div>
    `;
  }
}

function closePaymentProcessingModal() {
  const modal = document.getElementById('orderModal');
  modal.classList.remove('active');
}

function showPaymentErrorModal(result) {
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  content.innerHTML = `
    <div style="padding: 2rem;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
        <h2 style="color: var(--danger); margin-bottom: 0.5rem;">Payment Failed</h2>
        <p style="color: var(--text-gray);">Your order could not be processed</p>
      </div>
      
      <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid var(--danger);">
        <h4 style="color: var(--danger); margin-bottom: 0.5rem;">Error Details</h4>
        <p style="color: var(--text-light); margin-bottom: 0.5rem;">${result.message}</p>
        ${result.errorCode ? `<p style="color: var(--text-gray); font-size: 0.85rem;">Error Code: ${result.errorCode}</p>` : ''}
      </div>
      
      <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">What to do next:</h4>
        <ul style="color: var(--text-gray); line-height: 1.8; padding-left: 1.5rem;">
          <li>Check your payment details and try again</li>
          <li>Try a different payment method</li>
          <li>Contact your bank if the issue persists</li>
          <li>Contact our support team for assistance</li>
        </ul>
      </div>
      
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-primary" onclick="closePaymentProcessingModal(); currentCheckoutStep = 1; nextCheckoutStep();" style="flex: 1;">
          <i class="fas fa-redo"></i> Try Again
        </button>
        <button class="btn btn-secondary" onclick="closePaymentProcessingModal();" style="flex: 1;">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
      
      <p style="text-align: center; color: var(--text-gray); font-size: 0.85rem; margin-top: 1.5rem;">
        <i class="fas fa-shield-alt" style="color: var(--accent-gold);"></i> No charges were made to your account
      </p>
    </div>
  `;
  
  modal.classList.add('active');
}

function placeOrder() {
  if (isProcessingPayment) {
    alert('⏳ Payment is already being processed. Please wait...');
    return;
  }
  
  // Show loading state
  const placeOrderBtn = event.target;
  const originalText = placeOrderBtn.innerHTML;
  placeOrderBtn.disabled = true;
  placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
  isProcessingPayment = true;
  
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  
  // Show payment processing modal
  showPaymentProcessingModal(paymentMethod);
  
  // Process payment through gateway
  processPaymentThroughGateway(paymentMethod).then((result) => {
    isProcessingPayment = false;
    
    if (result.success) {
      // Payment successful - create order
      updatePaymentProcessingModal('success', result);
      setTimeout(() => {
        completeOrder(result);
      }, 1500);
    } else {
      // Payment failed - show error
      updatePaymentProcessingModal('failed', result);
      placeOrderBtn.disabled = false;
      placeOrderBtn.innerHTML = originalText;
      
      setTimeout(() => {
        closePaymentProcessingModal();
        showPaymentErrorModal(result);
      }, 2000);
    }
  }).catch((error) => {
    isProcessingPayment = false;
    placeOrderBtn.disabled = false;
    placeOrderBtn.innerHTML = originalText;
    updatePaymentProcessingModal('failed', { message: error.message || 'Payment processing error' });
    
    setTimeout(() => {
      closePaymentProcessingModal();
      alert('❌ Payment processing error. Please try again.');
    }, 2000);
  });
}

function completeOrder(paymentResult) {
  const uniqueOrderNumber = generateOrderNumber();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  
  const newOrder = {
    id: `AKR${String(orders.length + 1).padStart(3, '0')}`,
    orderNumber: uniqueOrderNumber,
    customerName: document.getElementById('shippingName').value,
    email: document.getElementById('shippingEmail').value,
    phone: document.getElementById('shippingPhone').value,
    address: document.getElementById('shippingAddress').value,
    city: document.getElementById('shippingCity').value,
    state: document.getElementById('shippingState').value,
    pincode: document.getElementById('shippingPincode').value,
    country: document.getElementById('shippingCountry').value,
    date: new Date().toISOString().split('T')[0],
    total: subtotal + shipping,
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    paymentMethod: paymentMethod,
    transactionId: paymentResult.transactionId,
    paymentGateway: paymentResult.gateway,
    authCode: paymentResult.authCode,
    paymentTimestamp: paymentResult.timestamp,
    items: cart.map(item => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      size: item.selectedSize,
      color: item.selectedColor,
      price: item.price
    })),
    emailSent: false,
    emailSentTime: null
  };
  
  // CRITICAL: Only create order after payment verification
  orders.unshift(newOrder);
  
  // Send confirmation email automatically
  sendOrderConfirmationEmail(newOrder);
  
  // Clear cart only after successful order creation
  cart = [];
  updateCartBadge();
  
  // Show order confirmation with payment details
  showOrderConfirmation(newOrder, paymentResult);
}

// Email Sending Functions
function sendOrderConfirmationEmail(order) {
  // Simulate email sending with retry logic
  const emailKey = order.orderNumber;
  
  if (!emailRetryAttempts[emailKey]) {
    emailRetryAttempts[emailKey] = 0;
  }
  
  // Simulate email sending process
  setTimeout(() => {
    const success = Math.random() > 0.05; // 95% success rate
    
    if (success) {
      // Email sent successfully
      order.emailSent = true;
      order.emailSentTime = new Date().toLocaleString();
      
      // Log email
      emailsSent.unshift({
        orderId: order.orderNumber,
        customerEmail: order.email,
        adminEmail: 'admin@akrul.com',
        timestamp: new Date().toISOString(),
        status: 'Sent',
        attempts: emailRetryAttempts[emailKey] + 1,
        type: 'Order Confirmation'
      });
      
      console.log(`✅ Confirmation email sent to ${order.email}`);
    } else {
      // Email failed, retry if attempts < 3
      emailRetryAttempts[emailKey]++;
      
      if (emailRetryAttempts[emailKey] < 3) {
        console.log(`⚠️ Email failed, retrying... (Attempt ${emailRetryAttempts[emailKey]})`);
        setTimeout(() => sendOrderConfirmationEmail(order), 5000); // Retry after 5 seconds
      } else {
        console.log(`❌ Email failed after 3 attempts`);
        emailsSent.unshift({
          orderId: order.orderNumber,
          customerEmail: order.email,
          timestamp: new Date().toISOString(),
          status: 'Failed',
          attempts: 3,
          type: 'Order Confirmation'
        });
      }
    }
  }, 1000); // Simulate 1 second delay
}

function resendOrderEmail(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber);
  if (!order) {
    alert('❌ Order not found');
    return;
  }
  
  // Reset retry attempts
  emailRetryAttempts[orderNumber] = 0;
  
  // Show sending message
  alert('📧 Resending confirmation email...');
  
  // Resend email
  sendOrderConfirmationEmail(order);
  
  setTimeout(() => {
    if (order.emailSent) {
      alert(`✅ Confirmation email resent successfully to ${order.email}`);
    } else {
      alert('⚠️ Email is being sent. Please check again in a moment.');
    }
  }, 2000);
}

function showOrderConfirmation(order, paymentResult) {
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  content.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;"></i>
      <h2 style="color: var(--accent-gold); margin-bottom: 1rem;">Order Placed Successfully!</h2>
      
      <div style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border: 2px solid var(--success);">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--success); margin-bottom: 0.5rem;">
          <i class="fas fa-check-circle"></i>
          <span style="font-weight: 600;">Payment Verified Successfully</span>
        </div>
        <p style="color: var(--text-gray); font-size: 0.85rem;">Transaction ID: ${paymentResult?.transactionId || 'N/A'}</p>
      </div>
      
      <div style="background: var(--primary-dark); padding: 2rem; border-radius: 12px; margin: 2rem 0; border: 2px solid var(--accent-gold);">
        <h3 style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">Your Order Number</h3>
        <div style="font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-gold) 0%, #f4e5c3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: 2px; font-family: 'Courier New', monospace;">
          ${order.orderNumber}
        </div>
        <p style="color: var(--text-gray); font-size: 0.85rem; margin-top: 0.5rem;">Please save this number for tracking your order</p>
      </div>
      
      <div style="text-align: left; background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">Order Summary</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Order Date:</span>
          <span style="font-weight: 600;">${order.date}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Total Amount:</span>
          <span style="font-weight: 600; color: var(--accent-gold);">₹${order.total}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Payment Method:</span>
          <span style="font-weight: 600;">${order.paymentMethod.toUpperCase()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Status:</span>
          <span class="order-status processing" style="padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.85rem;">${order.orderStatus}</span>
        </div>
      </div>
      
      <div style="text-align: left; background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">Delivery Address</h4>
        <p style="line-height: 1.6; color: var(--text-gray);">
          ${order.customerName}<br>
          ${order.address}<br>
          ${order.city} - ${order.pincode}<br>
          Phone: ${order.phone}<br>
          Email: ${order.email}
        </p>
      </div>
      
      <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 2px solid var(--accent-gold);">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; margin-bottom: 0.8rem;">
          <i class="fas fa-envelope-circle-check" style="font-size: 2rem; color: var(--accent-gold);"></i>
          <h4 style="color: var(--accent-gold); margin: 0;">Confirmation Email Sent</h4>
        </div>
        <p style="color: var(--text-light); text-align: center; margin-bottom: 0.5rem;">
          We've sent a confirmation email to:
        </p>
        <p style="color: var(--accent-gold); text-align: center; font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem;">
          ${order.email}
        </p>
        <div style="text-align: center; color: var(--text-gray); font-size: 0.85rem;">
          <p style="margin-bottom: 0.5rem;">The email contains:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li>✓ Your order number: ${order.orderNumber}</li>
            <li>✓ Order details and items</li>
            <li>✓ Shipping address</li>
            <li>✓ Tracking information</li>
            <li>✓ Customer service contact</li>
          </ul>
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(212, 175, 55, 0.3); text-align: center;">
          <p style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 0.5rem;">Didn't receive the email?</p>
          <button class="btn btn-text" onclick="resendOrderEmail('${order.orderNumber}')" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
            <i class="fas fa-redo"></i> Resend Email
          </button>
          <p style="color: var(--text-gray); font-size: 0.75rem; margin-top: 0.5rem;"><i class="fas fa-info-circle"></i> Please check your spam folder</p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; margin-top: 2rem;">
        <button class="btn btn-primary" onclick="closeOrderModal(); showPage('account');" style="flex: 1;">
          <i class="fas fa-box"></i> Track Order
        </button>
        <button class="btn btn-secondary" onclick="closeOrderModal(); showPage('home');" style="flex: 1;">
          <i class="fas fa-home"></i> Continue Shopping
        </button>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

// User Account Pages
function showAccountSection(section) {
  if (!currentUser) {
    alert('⚠️ Please login to access your account');
    toggleAuthModal();
    return;
  }
  
  document.querySelectorAll('.account-menu a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.account-section').forEach(s => s.classList.remove('active'));
  
  event.target.classList.add('active');
  
  const sectionMap = {
    'profile': 'profileSection',
    'orders': 'ordersSection',
    'wishlist': 'wishlistSection',
    'addresses': 'addressesSection',
    'settings': 'settingsSection'
  };
  
  const sectionId = sectionMap[section];
  if (sectionId) {
    document.getElementById(sectionId).classList.add('active');
    
    if (section === 'orders') {
      renderUserOrders();
    } else if (section === 'wishlist') {
      renderWishlist();
    } else if (section === 'addresses') {
      renderAddressesList();
    }
  }
}

function renderUserOrders() {
  const container = document.getElementById('userOrdersList');
  const userOrders = orders.filter(o => o.email === currentUser.email || o.phone === currentUser.phone);
  
  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag" style="font-size: 5rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
        <h3>No Orders Yet</h3>
        <p style="color: var(--text-gray); margin-bottom: 2rem;">You haven't placed any orders yet. Start shopping now!</p>
        <button class="btn btn-primary" onclick="showPage('shop')">
          <i class="fas fa-shopping-bag"></i> Start Shopping
        </button>
      </div>
    `;
    return;
  }
  
  const ordersHTML = userOrders.map(order => createCustomerOrderCard(order)).join('');
  
  container.innerHTML = `
    <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 2px solid var(--accent-gold);">
      <h3 style="margin: 0; color: var(--accent-gold); font-size: 1.5rem; font-weight: 800;">📦 ${userOrders.length} ${userOrders.length === 1 ? 'Order' : 'Orders'} Found</h3>
      <p style="color: var(--text-light); margin: 0.5rem 0 0 0; font-size: 1rem;">All your orders are displayed below</p>
    </div>
    ${ordersHTML}
  `;
}

// Address Management Functions
function renderAddressesList() {
  const container = document.getElementById('addressesList');
  
  if (userAddresses.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; background: var(--card-bg); border-radius: 12px; border: 2px dashed var(--border-dark);">
        <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
        <h4 style="color: var(--text-light); margin-bottom: 0.5rem;">No Addresses Saved</h4>
        <p style="color: var(--text-gray); margin-bottom: 1.5rem;">Add your delivery addresses for quick checkout</p>
        <button class="btn btn-primary" onclick="showAddAddressModal()"><i class="fas fa-plus"></i> Add Your First Address</button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = userAddresses.map(addr => `
    <div class="address-card" style="background: var(--card-bg); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; border: 2px solid ${addr.default ? 'var(--accent-gold)' : 'var(--border-dark)'}; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <div style="display: flex; gap: 0.8rem; align-items: center;">
          <span class="address-type-badge" style="background: var(--secondary-dark); padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem; color: var(--accent-gold); border: 1px solid var(--accent-gold);">
            <i class="fas ${addr.type === 'Home' ? 'fa-home' : addr.type === 'Office' ? 'fa-building' : 'fa-map-pin'}"></i> ${addr.type}
          </span>
          ${addr.default ? '<span class="default-badge" style="background: linear-gradient(135deg, var(--accent-gold) 0%, #f4e5c3 100%); color: var(--primary-dark); padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem; font-weight: 700;"><i class="fas fa-star"></i> Default</span>' : ''}
        </div>
      </div>
      <div style="line-height: 1.8; color: var(--text-light); margin-bottom: 1rem;">
        <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">${addr.name}</div>
        <div>${addr.street}</div>
        <div>${addr.city}, ${addr.state} - ${addr.postalCode}</div>
        <div>${addr.country}</div>
        <div style="margin-top: 0.5rem; color: var(--text-gray);"><i class="fas fa-phone"></i> ${addr.phone}</div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn btn-secondary" style="padding: 0.6rem 1rem; font-size: 0.85rem;" onclick="editAddress(${addr.id})">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-text" style="padding: 0.6rem 1rem; font-size: 0.85rem; color: var(--danger);" onclick="deleteAddress(${addr.id})">
          <i class="fas fa-trash"></i> Delete
        </button>
        ${!addr.default ? `<button class="btn btn-text" style="padding: 0.6rem 1rem; font-size: 0.85rem;" onclick="setDefaultAddress(${addr.id})">
          <i class="fas fa-star"></i> Set as Default
        </button>` : ''}
      </div>
    </div>
  `).join('');
}

function showAddAddressModal() {
  editingAddressId = null;
  document.getElementById('addressModalTitle').textContent = 'Add New Address';
  document.getElementById('addressForm').reset();
  document.getElementById('addressCountry').value = 'India';
  document.getElementById('addressModal').classList.add('active');
}

function closeAddressModal() {
  document.getElementById('addressModal').classList.remove('active');
  editingAddressId = null;
}

function saveAddress(e) {
  e.preventDefault();
  
  const name = document.getElementById('addressName').value.trim();
  const phone = document.getElementById('addressPhone').value.trim();
  const type = document.getElementById('addressType').value;
  const street = document.getElementById('addressStreet').value.trim();
  const city = document.getElementById('addressCity').value.trim();
  const state = document.getElementById('addressState').value.trim();
  const postalCode = document.getElementById('addressPostalCode').value.trim();
  const country = document.getElementById('addressCountry').value;
  const isDefault = document.getElementById('addressDefault').checked;
  
  // Validation
  if (name.length < 3) {
    alert('⚠️ Name must be at least 3 characters');
    return;
  }
  
  if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    alert('⚠️ Please enter a valid 10-digit phone number');
    return;
  }
  
  if (street.length < 10) {
    alert('⚠️ Street address must be at least 10 characters');
    return;
  }
  
  if (postalCode.length < 4) {
    alert('⚠️ Postal code must be at least 4 characters');
    return;
  }
  
  if (editingAddressId) {
    // Edit existing address
    const address = userAddresses.find(a => a.id === editingAddressId);
    if (address) {
      address.name = name;
      address.phone = phone;
      address.type = type;
      address.street = street;
      address.city = city;
      address.state = state;
      address.postalCode = postalCode;
      address.country = country;
      
      if (isDefault && !address.default) {
        userAddresses.forEach(a => a.default = false);
        address.default = true;
      }
      
      alert('✅ Address updated successfully!');
    }
  } else {
    // Add new address
    const newAddress = {
      id: userAddresses.length > 0 ? Math.max(...userAddresses.map(a => a.id)) + 1 : 1,
      name,
      phone,
      type,
      street,
      city,
      state,
      postalCode,
      country,
      default: isDefault || userAddresses.length === 0
    };
    
    // If setting as default, unset all others
    if (newAddress.default) {
      userAddresses.forEach(a => a.default = false);
    }
    
    userAddresses.push(newAddress);
    alert('✅ Address added successfully!');
  }
  
  closeAddressModal();
  renderAddressesList();
}

function editAddress(addressId) {
  const address = userAddresses.find(a => a.id === addressId);
  if (!address) return;
  
  editingAddressId = addressId;
  document.getElementById('addressModalTitle').textContent = 'Edit Address';
  
  document.getElementById('addressName').value = address.name;
  document.getElementById('addressPhone').value = address.phone;
  document.getElementById('addressType').value = address.type;
  document.getElementById('addressStreet').value = address.street;
  document.getElementById('addressCity').value = address.city;
  document.getElementById('addressState').value = address.state;
  document.getElementById('addressPostalCode').value = address.postalCode;
  document.getElementById('addressCountry').value = address.country;
  document.getElementById('addressDefault').checked = address.default;
  
  document.getElementById('addressModal').classList.add('active');
}

function deleteAddress(addressId) {
  const address = userAddresses.find(a => a.id === addressId);
  if (!address) return;
  
  if (userAddresses.length === 1) {
    alert('⚠️ Cannot delete the only address. Please add another address first.');
    return;
  }
  
  if (confirm(`🗑️ Delete Address\n\nAre you sure you want to delete this address?\n\n${address.name}\n${address.street}\n${address.city}, ${address.state}`)) {
    const wasDefault = address.default;
    userAddresses = userAddresses.filter(a => a.id !== addressId);
    
    // If deleted address was default, set first address as default
    if (wasDefault && userAddresses.length > 0) {
      userAddresses[0].default = true;
    }
    
    alert('✅ Address deleted successfully!');
    renderAddressesList();
  }
}

function setDefaultAddress(addressId) {
  userAddresses.forEach(a => a.default = (a.id === addressId));
  alert('✅ Default address updated!');
  renderAddressesList();
}

function updateAccountInfo() {
  if (!currentUser) return;
  
  document.getElementById('accountUserName').textContent = currentUser.fullName;
  document.getElementById('accountUserEmail').textContent = currentUser.email;
  
  // Update avatar with profile picture or initials
  const userAvatar = document.getElementById('userAvatar');
  const profilePicUrl = userProfilePictures[currentUser.id];
  if (profilePicUrl) {
    userAvatar.style.backgroundImage = `url(${profilePicUrl})`;
    userAvatar.style.backgroundSize = 'cover';
    userAvatar.style.backgroundPosition = 'center';
    userAvatar.textContent = '';
  } else {
    userAvatar.style.backgroundImage = 'none';
    userAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
  }
  
  document.getElementById('profileName').value = currentUser.fullName;
  document.getElementById('profileEmail').value = currentUser.email;
  document.getElementById('profilePhone').value = currentUser.phone;
  document.getElementById('profileJoinDate').value = new Date(currentUser.registrationDate).toLocaleDateString();
  document.getElementById('profileLastLogin').value = currentUser.lastLogin ? new Date(currentUser.lastLogin).toLocaleString() : 'Never';
  document.getElementById('profileStatus').value = currentUser.accountStatus;
  
  // Render profile picture section
  renderProfilePictureSection();
  
  // Reset edit mode
  const editBtn = document.getElementById('editProfileBtn');
  const nameField = document.getElementById('profileName');
  const phoneField = document.getElementById('profilePhone');
  const editActions = document.getElementById('profileEditActions');
  
  if (editBtn) editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
  if (nameField) {
    nameField.readOnly = true;
    nameField.classList.remove('editable');
  }
  if (phoneField) {
    phoneField.readOnly = true;
    phoneField.classList.remove('editable');
  }
  if (editActions) editActions.style.display = 'none';
  
  document.getElementById('nameRequiredStar').style.display = 'none';
  document.getElementById('phoneRequiredStar').style.display = 'none';
}

let isEditingProfile = false;

function toggleEditProfile() {
  isEditingProfile = !isEditingProfile;
  
  const editBtn = document.getElementById('editProfileBtn');
  const nameField = document.getElementById('profileName');
  const phoneField = document.getElementById('profilePhone');
  const editActions = document.getElementById('profileEditActions');
  
  if (isEditingProfile) {
    // Enable editing
    editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    editBtn.classList.remove('btn-primary');
    editBtn.classList.add('btn-secondary');
    editBtn.onclick = cancelEditProfile;
    
    nameField.readOnly = false;
    nameField.classList.add('editable');
    nameField.focus();
    
    phoneField.readOnly = false;
    phoneField.classList.add('editable');
    
    editActions.style.display = 'flex';
    editActions.classList.add('active');
    
    document.getElementById('nameRequiredStar').style.display = 'inline';
    document.getElementById('phoneRequiredStar').style.display = 'inline';
  } else {
    cancelEditProfile();
  }
}

function cancelEditProfile() {
  isEditingProfile = false;
  
  const editBtn = document.getElementById('editProfileBtn');
  const nameField = document.getElementById('profileName');
  const phoneField = document.getElementById('profilePhone');
  const editActions = document.getElementById('profileEditActions');
  
  editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
  editBtn.classList.add('btn-primary');
  editBtn.classList.remove('btn-secondary');
  editBtn.onclick = toggleEditProfile;
  
  nameField.readOnly = true;
  nameField.classList.remove('editable');
  
  phoneField.readOnly = true;
  phoneField.classList.remove('editable');
  
  editActions.style.display = 'none';
  editActions.classList.remove('active');
  
  document.getElementById('nameRequiredStar').style.display = 'none';
  document.getElementById('phoneRequiredStar').style.display = 'none';
  
  // Restore original values
  if (currentUser) {
    nameField.value = currentUser.fullName;
    phoneField.value = currentUser.phone;
  }
}

function saveProfileChanges() {
  if (!currentUser) return;
  
  const newName = document.getElementById('profileName').value.trim();
  const newPhone = document.getElementById('profilePhone').value.trim();
  
  // Validation
  if (!newName || newName.length < 3) {
    alert('⚠️ Name must be at least 3 characters long');
    return;
  }
  
  if (!/^\d{10}$/.test(newPhone.replace(/\D/g, ''))) {
    alert('⚠️ Please enter a valid 10-digit phone number');
    return;
  }
  
  // Check if phone is already used by another user
  const phoneExists = registeredUsers.find(u => u.id !== currentUser.id && u.phone === newPhone);
  if (phoneExists) {
    alert('⚠️ This phone number is already registered to another account');
    return;
  }
  
  // Update user data
  currentUser.fullName = newName;
  currentUser.phone = newPhone;
  
  // Update in registered users array
  const userIndex = registeredUsers.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    registeredUsers[userIndex].fullName = newName;
    registeredUsers[userIndex].phone = newPhone;
  }
  
  // Update UI
  updateAccountInfo();
  updateUserIcon();
  
  // Show success message
  alert(`✅ Profile Updated Successfully!\n\nYour profile information has been updated.\n\nName: ${newName}\nPhone: ${newPhone}`);
  
  // Exit edit mode
  isEditingProfile = false;
  cancelEditProfile();
}

function renderProfilePictureSection() {
  const profileSection = document.getElementById('profileSection');
  const profilePicUrl = userProfilePictures[currentUser.id];
  
  // Check if profile picture container already exists
  let pictureContainer = document.getElementById('profilePictureContainer');
  if (!pictureContainer) {
    // Insert profile picture section at the top of profile section
    pictureContainer = document.createElement('div');
    pictureContainer.id = 'profilePictureContainer';
    pictureContainer.className = 'profile-picture-container';
    
    const firstCard = profileSection.querySelector('div[style*="background"]');
    if (firstCard) {
      profileSection.insertBefore(pictureContainer, firstCard);
    }
  }
  
  pictureContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;"><i class="fas fa-camera"></i> Profile Picture</h4>
      <p style="color: var(--text-gray); font-size: 0.9rem;">Upload a picture to personalize your account</p>
    </div>
    <div class="profile-picture-preview" id="profilePicturePreview" style="${profilePicUrl ? `background-image: url(${profilePicUrl});` : ''}">
      ${!profilePicUrl ? currentUser.fullName.charAt(0).toUpperCase() : ''}
    </div>
    <div class="profile-picture-actions">
      <label class="btn btn-primary profile-picture-upload-btn">
        <i class="fas fa-upload"></i> ${profilePicUrl ? 'Change Picture' : 'Upload Picture'}
        <input type="file" accept="image/*" onchange="handleProfilePictureUpload(event)" />
      </label>
      ${profilePicUrl ? '<button class="btn btn-secondary" onclick="removeProfilePicture()"><i class="fas fa-trash"></i> Remove</button>' : ''}
    </div>
    <p style="color: var(--text-gray); font-size: 0.85rem; text-align: center; margin-top: 1rem;">
      <i class="fas fa-info-circle"></i> Supported: JPG, PNG, GIF (max 5MB)
    </p>
  `;
}

function handleProfilePictureUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    alert('⚠️ Invalid file type. Please upload JPG, PNG, or GIF images only.');
    return;
  }
  
  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    alert('⚠️ File size too large. Maximum size is 5MB.');
    return;
  }
  
  // Read and display the image
  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;
    
    // Store in memory
    userProfilePictures[currentUser.id] = imageUrl;
    
    // Update UI
    updateAccountInfo();
    updateUserDropdown();
    
    alert('✅ Profile Picture Updated!\n\nYour profile picture has been uploaded successfully.');
  };
  
  reader.readAsDataURL(file);
}

function removeProfilePicture() {
  if (confirm('🗑️ Remove Profile Picture\n\nAre you sure you want to remove your profile picture?')) {
    delete userProfilePictures[currentUser.id];
    updateAccountInfo();
    updateUserDropdown();
    alert('✅ Profile picture removed successfully!');
  }
}

function customerLogout() {
  currentUser = null;
  updateUserIcon();
  closeUserMenu();
  showPage('home');
  alert('✅ Logged out successfully\n\nYou have been logged out of your account.\n\nLogin again to access your orders and account information.');
}

// Customer Orders Page Functions
function renderCustomerOrdersPage() {
  if (!currentUser) {
    alert('⚠️ Please login to view your orders');
    toggleAuthModal();
    return;
  }
  
  const container = document.getElementById('customerOrdersList');
  if (!container) {
    console.error('Orders container not found');
    return;
  }
  
  const userOrders = orders.filter(o => o.email === currentUser.email || o.phone === currentUser.phone);
  
  console.log('Rendering orders for user:', currentUser.email);
  console.log('Found orders:', userOrders.length);
  
  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag" style="font-size: 5rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
        <h3>No Orders Yet</h3>
        <p style="color: var(--text-gray); margin-bottom: 2rem;">You haven't placed any orders yet. Start shopping now!</p>
        <button class="btn btn-primary" onclick="showPage('shop')">
          <i class="fas fa-shopping-bag"></i> Start Shopping
        </button>
      </div>
    `;
    return;
  }
  
  const ordersHTML = userOrders.map(order => createCustomerOrderCard(order)).join('');
  
  container.innerHTML = `
    <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; display: block; visibility: visible; opacity: 1; border: 2px solid var(--accent-gold);">
      <div style="visibility: visible; opacity: 1;">
        <h3 style="margin: 0; color: var(--accent-gold); font-size: 1.5rem; font-weight: 800; visibility: visible;">📦 ${userOrders.length} ${userOrders.length === 1 ? 'Order' : 'Orders'} Found</h3>
        <p style="color: var(--text-light); margin: 0.5rem 0 0 0; font-size: 1rem; visibility: visible;">All your orders are displayed below</p>
      </div>
    </div>
    ${ordersHTML}
  `;
  
  console.log('Orders rendered successfully:', userOrders.length);
}

function createCustomerOrderCard(order) {
  const orderDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const itemCount = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 1;
  
  // Get first product thumbnail for Amazon-style compact view (80x80px)
  let thumbnailUrl = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';
  let productName = 'Product';
  let moreItemsBadge = '';
  
  if (order.items && order.items.length > 0) {
    const firstItem = order.items[0];
    const product = products.find(p => p.id === firstItem.productId);
    if (product) {
      thumbnailUrl = product.image;
      productName = firstItem.productName || product.name;
    }
    
    // Add badge if multiple items
    if (order.items.length > 1) {
      productName += ` + ${order.items.length - 1} more item${order.items.length - 1 === 1 ? '' : 's'}`;
    }
  }
  
  return `
    <div class="customer-order-card">
      <div class="order-compact-row">
        <!-- Small 80x80px thumbnail -->
        <div class="order-thumbnail" style="background-image: url('${thumbnailUrl}');" onclick="event.stopPropagation(); viewCustomerOrderDetails('${order.orderNumber || order.id}')"></div>
        
        <!-- Order details -->
        <div class="order-details">
          <div class="order-number">Order #${order.orderNumber || order.id}</div>
          <div class="order-date">${orderDate}</div>
          <div class="order-product-name" title="${productName}">${productName}</div>
          <div class="order-quantity">Qty: ${itemCount}</div>
        </div>
        
        <!-- Price -->
        <div class="order-price">₹${order.total}</div>
        
        <!-- Status and Actions -->
        <div class="order-actions">
          <span class="order-status order-status-compact ${order.orderStatus.toLowerCase()}">${order.orderStatus}</span>
          <div class="order-action-links">
            <a href="#" class="order-action-link" onclick="event.preventDefault(); event.stopPropagation(); viewCustomerOrderDetails('${order.orderNumber || order.id}')">View Details</a>
            <a href="#" class="order-action-link" onclick="event.preventDefault(); event.stopPropagation(); trackCustomerOrder('${order.orderNumber || order.id}')">Track</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function viewCustomerOrderDetails(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order) return;
  
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  const orderDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const orderDateTime = new Date(order.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const canCancel = order.orderStatus === 'Pending' || order.orderStatus === 'Processing';
  const canReturn = order.orderStatus === 'Delivered';
  const isDelivered = order.orderStatus === 'Delivered';
  
  content.innerHTML = `
    <div style="padding: 1rem;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 0.9rem; color: var(--text-gray); margin-bottom: 0.5rem;">Order Number</div>
        <div style="font-size: 1.8rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-gold) 0%, #f4e5c3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: 'Courier New', monospace; letter-spacing: 1px; margin-bottom: 1rem;">
          ${order.orderNumber || order.id}
        </div>
        <span class="order-status ${order.orderStatus.toLowerCase()}" style="font-size: 1rem; padding: 0.6rem 1.2rem;">${order.orderStatus}</span>
      </div>
      
      <!-- Order Timeline -->
      <div style="background: var(--card-bg); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border-top: 3px solid var(--accent-gold);">
        <h3 style="color: var(--accent-gold); margin-bottom: 1.5rem;"><i class="fas fa-route"></i> Order Tracking</h3>
        <div class="order-timeline">
          <div class="timeline-item ${order.orderStatus ? 'completed' : ''}">
            <div class="timeline-dot"><i class="fas fa-check"></i></div>
            <div class="timeline-content">
              <h4>Order Placed</h4>
              <p>${orderDate}</p>
            </div>
          </div>
          <div class="timeline-item ${order.orderStatus === 'Processing' || order.orderStatus === 'Shipped' || order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Processing' ? 'active' : ''}">
            <div class="timeline-dot"><i class="fas fa-cog"></i></div>
            <div class="timeline-content">
              <h4>Processing</h4>
              <p>${order.orderStatus === 'Processing' || order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered' ? 'Order is being prepared' : 'Waiting for processing'}</p>
            </div>
          </div>
          <div class="timeline-item ${order.orderStatus === 'Shipped' || order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Shipped' ? 'active' : ''}">
            <div class="timeline-dot"><i class="fas fa-shipping-fast"></i></div>
            <div class="timeline-content">
              <h4>Shipped</h4>
              <p>${order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered' ? 'Package on the way' : 'Not yet shipped'}</p>
            </div>
          </div>
          <div class="timeline-item ${order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Out for Delivery' ? 'active' : ''}">
            <div class="timeline-dot"><i class="fas fa-truck"></i></div>
            <div class="timeline-content">
              <h4>Out for Delivery</h4>
              <p>${order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered' ? 'Final mile delivery' : 'Not yet dispatched'}</p>
            </div>
          </div>
          <div class="timeline-item ${order.orderStatus === 'Delivered' ? 'completed' : order.orderStatus === 'Delivered' ? 'active' : ''}">
            <div class="timeline-dot"><i class="fas fa-home"></i></div>
            <div class="timeline-content">
              <h4>Delivered</h4>
              <p>${order.orderStatus === 'Delivered' ? 'Successfully delivered!' : 'Not yet delivered'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order Summary Section -->
      <div style="background: var(--card-bg); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border-top: 3px solid var(--accent-gold);">
        <h3 style="color: var(--accent-gold); margin-bottom: 1.5rem;"><i class="fas fa-file-invoice"></i> Order Summary</h3>
        <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Order Date & Time:</span>
            <span style="font-weight: 600;">${orderDateTime}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Order Number:</span>
            <span style="font-weight: 700; font-family: 'Courier New', monospace; color: var(--accent-gold);">${order.orderNumber || order.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Current Status:</span>
            <span class="order-status ${order.orderStatus.toLowerCase()}">${order.orderStatus}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Total Amount:</span>
            <span style="font-weight: 800; font-size: 1.3rem; color: var(--accent-gold);">₹${order.total}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Payment Method:</span>
            <span style="font-weight: 600;">${order.paymentMethod ? order.paymentMethod.toUpperCase() : 'N/A'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Payment Status:</span>
            <span class="order-status ${order.paymentStatus.toLowerCase()}">${order.paymentStatus}</span>
          </div>
        </div>
      </div>
      
      <!-- Products Ordered Section -->
      ${order.items && order.items.length > 0 ? `
        <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <h4 style="color: var(--accent-gold); margin-bottom: 1.5rem;"><i class="fas fa-box-open"></i> Products Ordered</h4>
          ${order.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            const imageUrl = product ? product.image : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80';
            const productSKU = item.sku || (product ? product.sku : 'N/A');
            return `
            <div style="display: flex; gap: 1.5rem; padding: 1.5rem; background: var(--primary-dark); border-radius: 12px; margin-bottom: 1rem; border: 1px solid var(--border-dark);">
              <div style="width: 120px; height: 120px; flex-shrink: 0; background-image: url('${imageUrl}'); background-size: cover; background-position: center; border-radius: 8px;"></div>
              <div style="flex: 1;">
                <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-light);">${item.productName || 'Product'}</div>
                <div style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>SKU:</strong> ${productSKU}</div>
                <div style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Size:</strong> ${item.size} | <strong>Color:</strong> ${item.color}</div>
                <div style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Quantity:</strong> ${item.quantity}</div>
                <div style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Price per unit:</strong> ₹${item.price}</div>
                <div style="font-weight: 700; font-size: 1.1rem; color: var(--accent-gold); margin-top: 0.5rem;">Total: ₹${item.price * item.quantity}</div>
                <div style="margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid var(--border-dark); display: flex; gap: 1rem; flex-wrap: wrap;">
                  <span style="display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.3rem 0.6rem; background: rgba(212, 175, 55, 0.15); border: 1px solid var(--accent-gold); border-radius: 4px; font-size: 0.8rem; color: var(--accent-gold);"><i class="fas fa-store"></i> Sold by: AKRUL</span>
                  <span style="display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.3rem 0.6rem; background: rgba(212, 175, 55, 0.15); border: 1px solid var(--accent-gold); border-radius: 4px; font-size: 0.8rem; color: var(--accent-gold);"><i class="fas fa-industry"></i> Manufactured by: AKRUL</span>
                </div>
              </div>
            </div>
          `}).join('')}
        </div>
      ` : ''}
      
      <!-- Pricing Breakdown Section -->
      <div style="background: var(--card-bg); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border-top: 3px solid var(--accent-gold);">
        <h3 style="color: var(--accent-gold); margin-bottom: 1.5rem;"><i class="fas fa-calculator"></i> Pricing Breakdown</h3>
        <div style="display: grid; gap: 0.8rem;">
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Subtotal:</span>
            <span style="font-weight: 600;">₹${order.total - (order.total > 999 ? 0 : 99)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Shipping Charges:</span>
            <span style="font-weight: 600;">${order.total > 999 ? 'Free' : '₹99'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Discount:</span>
            <span style="font-weight: 600;">₹0</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Tax:</span>
            <span style="font-weight: 600;">₹0</span>
          </div>
          <div style="height: 2px; background: var(--accent-gold); margin: 0.5rem 0;"></div>
          <div style="display: flex; justify-content: space-between; padding: 1rem; background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%); border-radius: 8px; border: 2px solid var(--accent-gold);">
            <span style="font-weight: 800; font-size: 1.3rem;">TOTAL AMOUNT:</span>
            <span style="font-weight: 900; font-size: 1.5rem; color: var(--accent-gold);">₹${order.total}</span>
          </div>
        </div>
      </div>
      
      <!-- Shipping Information Section -->
      <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-shipping-fast"></i> Shipping Information</h4>
        <div style="line-height: 1.8; color: var(--text-light);">
          <strong>${order.customerName}</strong><br>
          ${order.address || 'N/A'}<br>
          ${order.city ? `${order.city}, ` : ''}${order.state || ''} ${order.pincode ? `- ${order.pincode}` : ''}<br>
          ${order.country || ''}<br><br>
          <i class="fas fa-phone" style="color: var(--accent-gold);"></i> ${order.phone}<br>
          <i class="fas fa-envelope" style="color: var(--accent-gold);"></i> ${order.email}
        </div>
      </div>
      
      <!-- Payment Information Section -->
      <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-credit-card"></i> Payment Information</h4>
        <div style="display: grid; gap: 0.8rem;">
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Payment Method:</span>
            <span style="font-weight: 600;">${order.paymentMethod ? order.paymentMethod.toUpperCase() : 'N/A'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Payment Status:</span>
            <span class="order-status ${order.paymentStatus.toLowerCase()}">${order.paymentStatus}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Payment Date:</span>
            <span style="font-weight: 600;">${orderDate}</span>
          </div>
          ${order.transactionId ? `
          <div style="display: flex; justify-content: space-between; padding: 0.8rem; background: var(--primary-dark); border-radius: 8px;">
            <span style="color: var(--text-gray);">Transaction ID:</span>
            <span style="font-family: 'Courier New', monospace; color: var(--accent-gold); font-weight: 600;">${order.transactionId}</span>
          </div>
          ` : ''}
        </div>
      </div>
      
      <!-- Order Actions -->
      <!-- Track Order Button -->
      <div style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 2px solid var(--accent-gold); text-align: center;">
        <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;"><i class="fas fa-shipping-fast"></i> Real-Time Order Tracking</h4>
        <p style="color: var(--text-gray); margin-bottom: 1rem; font-size: 0.9rem;">Track your order journey with live updates</p>
        <button class="btn btn-primary" onclick="trackCustomerOrder('${order.orderNumber || order.id}'); closeOrderModal();" style="padding: 1rem 2rem; font-size: 1rem;">
          <i class="fas fa-map-marked-alt"></i> Track Your Order
        </button>
      </div>
      
      <div class="order-actions-grid">
        <button class="order-action-btn" onclick="downloadInvoice('${order.orderNumber || order.id}')">
          <i class="fas fa-download"></i>
          <span>Download Invoice</span>
        </button>
        <button class="order-action-btn" onclick="trackCustomerOrder('${order.orderNumber || order.id}'); closeOrderModal();">
          <i class="fas fa-map-marked-alt"></i>
          <span>Track Order</span>
        </button>
        <button class="order-action-btn ${!canCancel ? 'disabled' : ''}" onclick="${canCancel ? `cancelOrder('${order.orderNumber || order.id}')` : 'return false;'}" ${!canCancel ? 'title="Cannot cancel shipped orders"' : ''}>
          <i class="fas fa-ban"></i>
          <span>Cancel Order</span>
        </button>
        <button class="order-action-btn ${!canReturn ? 'disabled' : ''}" onclick="${canReturn ? `returnOrder('${order.orderNumber || order.id}')` : 'return false;'}" ${!canReturn ? 'title="Only delivered orders can be returned"' : ''}>
          <i class="fas fa-undo"></i>
          <span>Return Order</span>
        </button>
        <button class="order-action-btn" onclick="reorderItems('${order.orderNumber || order.id}')">
          <i class="fas fa-redo"></i>
          <span>Reorder Items</span>
        </button>
        <button class="order-action-btn" onclick="contactSupport('${order.orderNumber || order.id}')">
          <i class="fas fa-headset"></i>
          <span>Contact Support</span>
        </button>
      </div>
      
      <button class="btn btn-secondary btn-full" style="margin-top: 2rem;" onclick="closeOrderModal()">
        <i class="fas fa-times"></i> Close
      </button>
    </div>
  `;
  
  modal.classList.add('active');
}

// Order Tracking Functions
function showTrackOrderPage(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order) {
    alert('❌ Order not found');
    return;
  }
  
  const modal = document.getElementById('trackOrderModal');
  const content = document.getElementById('trackOrderContent');
  
  const orderDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const estimatedDelivery = new Date(order.date);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const estimatedDate = estimatedDelivery.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Determine tracking progress
  const statuses = ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statuses.indexOf(order.orderStatus);
  
  const trackingNumber = 'TRK' + Date.now().toString().slice(-10);
  const courierName = 'Blue Dart Express';
  
  content.innerHTML = `
    <div style="padding: 1.5rem;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h2 style="margin-bottom: 0.5rem;"><i class="fas fa-shipping-fast" style="color: var(--accent-gold);"></i> Track Your Order</h2>
        <div style="font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-gold) 0%, #f4e5c3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: 'Courier New', monospace; letter-spacing: 1px; margin-top: 1rem;">
          ${order.orderNumber || order.id}
        </div>
      </div>
      
      <!-- Order Status Card -->
      <div style="background: linear-gradient(135deg, var(--secondary-dark) 0%, var(--tertiary-dark) 100%); padding: 2rem; border-radius: 16px; margin-bottom: 2rem; border: 2px solid var(--accent-gold);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <div>
            <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem;">Current Status</h3>
            <span class="order-status ${order.orderStatus.toLowerCase()}" style="font-size: 1.1rem; padding: 0.6rem 1.2rem;">${order.orderStatus}</span>
          </div>
          <div style="text-align: right;">
            <div style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 0.3rem;">Estimated Delivery</div>
            <div style="font-weight: 700; font-size: 1.1rem; color: var(--accent-gold);">${estimatedDate}</div>
          </div>
        </div>
        
        ${order.orderStatus !== 'Pending' && order.orderStatus !== 'Cancelled' ? `
          <div style="background: var(--primary-dark); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: var(--text-gray);">Tracking Number:</span>
              <span style="font-family: 'Courier New', monospace; color: var(--accent-gold); font-weight: 600;">${trackingNumber}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-gray);">Courier:</span>
              <span style="font-weight: 600;">${courierName}</span>
            </div>
          </div>
        ` : ''}
      </div>
      
      <!-- Tracking Timeline -->
      <div style="background: var(--card-bg); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
        <h3 style="color: var(--accent-gold); margin-bottom: 2rem;"><i class="fas fa-route"></i> Order Journey</h3>
        <div class="tracking-timeline" style="position: relative; padding-left: 3rem;">
          ${[
            { step: 'Order Placed', icon: 'fa-check-circle', status: 'Pending', desc: orderDate },
            { step: 'Order Confirmed', icon: 'fa-clipboard-check', status: 'Processing', desc: 'Payment verified' },
            { step: 'Processing', icon: 'fa-box', status: 'Processing', desc: 'Preparing your items' },
            { step: 'Shipped', icon: 'fa-truck', status: 'Shipped', desc: 'Package dispatched' },
            { step: 'Out for Delivery', icon: 'fa-shipping-fast', status: 'Out for Delivery', desc: 'On the way to you' },
            { step: 'Delivered', icon: 'fa-home', status: 'Delivered', desc: 'Order completed' }
          ].map((item, idx) => {
            const isCompleted = currentStatusIndex >= idx || (idx === 0);
            const isActive = currentStatusIndex === idx;
            const isPending = currentStatusIndex < idx;
            
            return `
              <div class="tracking-step" style="position: relative; padding-bottom: 2rem; ${idx === 5 ? 'padding-bottom: 0;' : ''}">
                ${idx < 5 ? '<div style="position: absolute; left: -2.25rem; top: 2rem; width: 2px; height: calc(100% - 1rem); background: ' + (isCompleted ? 'var(--accent-gold)' : 'var(--border-dark)') + ';"></div>' : ''}
                <div style="position: absolute; left: -3rem; top: 0; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: ${isCompleted ? 'var(--accent-gold)' : isActive ? 'var(--primary)' : 'var(--secondary-dark)'}; border: 3px solid ${isCompleted || isActive ? 'var(--accent-gold)' : 'var(--border-dark)'}; display: flex; align-items: center; justify-content: center; color: ${isCompleted ? 'var(--primary-dark)' : 'var(--text-gray)'}; ${isActive ? 'box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);' : ''}">
                  <i class="fas ${item.icon}" style="font-size: 0.9rem;"></i>
                </div>
                <div>
                  <h4 style="margin-bottom: 0.3rem; color: ${isCompleted || isActive ? 'var(--text-light)' : 'var(--text-gray)'};">${item.step}</h4>
                  <p style="color: var(--text-gray); font-size: 0.9rem; margin: 0;">${item.desc}</p>
                  ${isCompleted ? '<div style="color: var(--success); font-size: 0.85rem; margin-top: 0.3rem;"><i class="fas fa-check"></i> Completed</div>' : ''}
                  ${isActive ? '<div style="color: var(--accent-gold); font-size: 0.85rem; margin-top: 0.3rem;"><i class="fas fa-spinner fa-pulse"></i> In Progress</div>' : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <!-- Order Details -->
      <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-info-circle"></i> Order Details</h4>
        <div style="display: grid; gap: 0.8rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-gray);">Order Number:</span>
            <span style="font-family: 'Courier New', monospace; font-weight: 600;">${order.orderNumber || order.id}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-gray);">Order Date:</span>
            <span style="font-weight: 600;">${orderDate}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-gray);">Total Amount:</span>
            <span style="font-weight: 700; color: var(--accent-gold); font-size: 1.1rem;">₹${order.total}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-gray);">Payment Status:</span>
            <span class="order-status ${order.paymentStatus.toLowerCase()}">${order.paymentStatus}</span>
          </div>
        </div>
      </div>
      
      <!-- Shipping Address -->
      <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-map-marker-alt"></i> Delivery Address</h4>
        <div style="line-height: 1.8; color: var(--text-light);">
          <strong>${order.customerName}</strong><br>
          ${order.address || 'N/A'}<br>
          ${order.city ? `${order.city}, ` : ''}${order.state || ''} ${order.pincode ? `- ${order.pincode}` : ''}<br>
          ${order.country || ''}<br><br>
          <i class="fas fa-phone" style="color: var(--accent-gold);"></i> ${order.phone}<br>
          <i class="fas fa-envelope" style="color: var(--accent-gold);"></i> ${order.email}
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div style="display: flex; gap: 1rem; margin-top: 2rem;">
        <button class="btn btn-primary" onclick="downloadInvoice('${order.orderNumber || order.id}')" style="flex: 1;">
          <i class="fas fa-download"></i> Download Invoice
        </button>
        <button class="btn btn-secondary" onclick="contactSupport('${order.orderNumber || order.id}')" style="flex: 1;">
          <i class="fas fa-headset"></i> Contact Support
        </button>
      </div>
      
      <button class="btn btn-text btn-full" style="margin-top: 1rem;" onclick="closeTrackOrderModal()">
        <i class="fas fa-times"></i> Close
      </button>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeTrackOrderModal() {
  document.getElementById('trackOrderModal').classList.remove('active');
}

function trackOrderPublic(e) {
  e.preventDefault();
  
  const orderNumber = document.getElementById('publicTrackOrderNumber').value.trim();
  const contact = document.getElementById('publicTrackContact').value.trim();
  
  // Find order by order number and verify contact
  const order = orders.find(o => {
    const matchesOrderNumber = (o.orderNumber || o.id).toLowerCase() === orderNumber.toLowerCase();
    const matchesEmail = o.email.toLowerCase() === contact.toLowerCase();
    const matchesPhone = o.phone === contact.replace(/\D/g, '');
    
    return matchesOrderNumber && (matchesEmail || matchesPhone);
  });
  
  if (!order) {
    alert('❌ Order Not Found\n\nPlease check:\n• Order number is correct\n• Email or phone matches the order\n\nIf you need help, contact our support team.');
    return;
  }
  
  // Clear form
  document.getElementById('publicTrackOrderNumber').value = '';
  document.getElementById('publicTrackContact').value = '';
  
  // Show tracking details
  showTrackOrderPage(order.orderNumber || order.id);
}

function trackCustomerOrder(orderNumber) {
  showTrackOrderPage(orderNumber);
}

function downloadInvoice(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order) return;
  
  alert(`📄 Invoice Download\n\nGenerating invoice for order: ${order.orderNumber || order.id}\n\nInvoice Number: INV-${order.orderNumber || order.id}\nAmount: ₹${order.total}\n\n✅ In a real application, a PDF invoice would be downloaded automatically.`);
}

function cancelOrder(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order) return;
  
  if (order.orderStatus === 'Shipped' || order.orderStatus === 'Out for Delivery' || order.orderStatus === 'Delivered') {
    alert('❌ Cannot cancel order. The order has already been shipped.');
    return;
  }
  
  if (confirm(`🗑️ Cancel Order\n\nAre you sure you want to cancel this order?\n\nOrder: ${order.orderNumber || order.id}\nAmount: ₹${order.total}\n\nRefund will be initiated within 5-7 business days.`)) {
    order.orderStatus = 'Cancelled';
    alert(`✅ Order Cancelled Successfully!\n\nOrder ${order.orderNumber || order.id} has been cancelled.\n\nRefund Amount: ₹${order.total}\nRefund will be processed to your original payment method within 5-7 business days.\n\nYou will receive a confirmation email shortly.`);
    closeOrderModal();
    renderCustomerOrdersPage();
  }
}

function returnOrder(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order) return;
  
  if (order.orderStatus !== 'Delivered') {
    alert('❌ Only delivered orders can be returned.');
    return;
  }
  
  const reason = prompt(`🔄 Return Order\n\nOrder: ${order.orderNumber || order.id}\n\nPlease select a reason for return:\n1. Wrong item received\n2. Damaged product\n3. Size/fit issue\n4. Quality not as expected\n5. Other\n\nEnter reason number (1-5):`);
  
  if (reason && reason >= 1 && reason <= 5) {
    const reasons = ['Wrong item', 'Damaged product', 'Size/fit issue', 'Quality issue', 'Other'];
    order.orderStatus = 'Returned';
    alert(`✅ Return Request Submitted!\n\nOrder: ${order.orderNumber || order.id}\nReason: ${reasons[reason - 1]}\n\nReturn process initiated:\n1. Return pickup will be scheduled\n2. Quality check after pickup\n3. Refund initiated (5-7 days)\n\nYou will receive return pickup details via email and SMS.`);
    closeOrderModal();
    renderCustomerOrdersPage();
  }
}

function reorderItems(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order || !order.items) return;
  
  if (confirm(`🔁 Reorder Items\n\nAdd all items from order ${order.orderNumber || order.id} to cart?\n\nThis will add ${order.items.length} ${order.items.length === 1 ? 'item' : 'items'} to your cart.`)) {
    order.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const existingItem = cart.find(c => c.id === product.id && c.selectedSize === item.size && c.selectedColor === item.color);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.push({ ...product, quantity: item.quantity, selectedSize: item.size, selectedColor: item.color });
        }
      }
    });
    updateCartBadge();
    alert(`✅ Items Added to Cart!\n\n${order.items.length} ${order.items.length === 1 ? 'item has' : 'items have'} been added to your cart.\n\nProceed to checkout?`);
    closeOrderModal();
    showPage('cart');
  }
}

function contactSupport(orderNumber) {
  const order = orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  if (!order) return;
  
  alert(`📞 Contact Support\n\nOrder: ${order.orderNumber || order.id}\n\nCustomer Support:\nPhone: +91 6266568880\nEmail: contact@akrul.com\nWhatsApp: +91 6266568880\n\nSupport Hours:\nMon-Sat: 9 AM - 6 PM\nSun: Closed\n\nInstagram: @akrulofficial\n\n💬 Our support team will assist you with your order.`);
}

function searchOrders() {
  const query = document.getElementById('orderSearchInput').value.toLowerCase();
  if (!currentUser) return;
  
  const userOrders = orders.filter(o => {
    const matchesUser = o.email === currentUser.email || o.phone === currentUser.phone;
    if (!matchesUser) return false;
    
    if (!query) return true;
    
    const orderNum = (o.orderNumber || o.id).toLowerCase();
    const items = o.items ? o.items.map(i => (i.productName || '').toLowerCase()).join(' ') : '';
    
    return orderNum.includes(query) || items.includes(query);
  });
  
  updateCustomerOrdersDisplay(userOrders);
}

function filterCustomerOrders() {
  const status = document.getElementById('orderStatusFilterCustomer').value;
  if (!currentUser) return;
  
  let userOrders = orders.filter(o => o.email === currentUser.email || o.phone === currentUser.phone);
  
  if (status !== 'all') {
    userOrders = userOrders.filter(o => o.orderStatus === status);
  }
  
  updateCustomerOrdersDisplay(userOrders);
}

function sortCustomerOrders() {
  const sortBy = document.getElementById('orderSortCustomer').value;
  if (!currentUser) return;
  
  let userOrders = orders.filter(o => o.email === currentUser.email || o.phone === currentUser.phone);
  
  switch(sortBy) {
    case 'newest':
      userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      userOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'amount-high':
      userOrders.sort((a, b) => b.total - a.total);
      break;
    case 'amount-low':
      userOrders.sort((a, b) => a.total - b.total);
      break;
  }
  
  updateCustomerOrdersDisplay(userOrders);
}

function updateCustomerOrdersDisplay(userOrders) {
  const container = document.getElementById('customerOrdersList');
  
  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-search" style="font-size: 5rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
        <h3>No Orders Found</h3>
        <p style="color: var(--text-gray); margin-bottom: 2rem;">No orders match your search or filter criteria.</p>
        <button class="btn btn-secondary" onclick="resetOrderFilters()">
          <i class="fas fa-redo"></i> Reset Filters
        </button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div style="background: var(--card-bg); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h3 style="margin: 0; color: var(--accent-gold);">${userOrders.length} ${userOrders.length === 1 ? 'Order' : 'Orders'}</h3>
        <p style="color: var(--text-gray); margin: 0.3rem 0 0 0; font-size: 0.9rem;">Track and manage your orders</p>
      </div>
    </div>
    ${userOrders.map(order => createCustomerOrderCard(order)).join('')}
  `;
}

function resetOrderFilters() {
  document.getElementById('orderSearchInput').value = '';
  document.getElementById('orderStatusFilterCustomer').value = 'all';
  document.getElementById('orderSortCustomer').value = 'newest';
  renderCustomerOrdersPage();
}

function viewOrderDetails(orderNumber) {
  viewCustomerOrderDetails(orderNumber);
}

function trackOrder(orderNumber) {
  trackCustomerOrder(orderNumber);
}

// Guest checkout - no account pages needed

// Page Navigation
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  
  const pageMap = {
    'home': 'homePage',
    'shop': 'shopPage',
    'productDetail': 'productDetailPage',
    'cart': 'cartPage',
    'checkout': 'checkoutPage',
    'account': 'accountPage',
    'wishlist': 'wishlistPage',
    'orders': 'ordersPage',
    'collections': 'shopPage',
    'about': 'aboutPage',
    'terms': 'termsPage',
    'trackOrder': 'trackOrderPage'
  };
  
  const pageId = pageMap[pageName];
  if (pageId) {
    document.getElementById(pageId).classList.add('active');
    
    if (pageName === 'cart') renderCart();
    if (pageName === 'wishlist') renderWishlistPage();
    if (pageName === 'orders') {
      if (!currentUser) {
        alert('⚠️ Please login to view your orders');
        toggleAuthModal();
        return;
      }
      renderCustomerOrdersPage();
    }
    if (pageName === 'checkout') renderCheckout();
    if (pageName === 'account') {
      if (!currentUser) {
        alert('⚠️ Please login to access your account');
        toggleAuthModal();
        return;
      }
      updateAccountInfo();
    }
    if (pageName === 'shop' || pageName === 'collections') {
      filteredProducts = [...products];
      renderShopProducts();
    }
    
    window.scrollTo(0, 0);
  }
}

// UI Toggles
function toggleSearch() {
  document.getElementById('searchBar').classList.toggle('active');
}

function toggleInlineSearch() {
  const input = document.getElementById('inlineSearchInput');
  input.classList.toggle('active');
  if (input.classList.contains('active')) {
    input.focus();
  } else {
    input.value = '';
  }
}

function toggleMobileMenu() {
  document.getElementById('navMenu').classList.toggle('active');
}

// Authentication removed - guest checkout only

// Guest checkout - authentication removed
// Authentication Validation Functions
function validateLoginField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return false;
  
  const value = field.value.trim();
  const errorSpan = document.getElementById(`${fieldId}-error`);
  let isValid = true;
  let errorMessage = '';
  
  field.classList.remove('error', 'success');
  
  if (fieldId === 'loginUsername') {
    if (value === '') {
      errorMessage = 'Email or phone number is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/^\d{10}$/.test(value)) {
      errorMessage = 'Please enter a valid email or 10-digit phone number';
      isValid = false;
    }
  } else if (fieldId === 'loginPassword') {
    if (value === '') {
      errorMessage = 'Password is required';
      isValid = false;
    }
  }
  
  if (errorSpan) {
    errorSpan.textContent = errorMessage;
  }
  
  if (isValid) {
    field.classList.add('success');
  } else {
    field.classList.add('error');
  }
  
  return isValid;
}

function clearLoginError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);
  
  if (field) {
    field.classList.remove('error', 'success');
  }
  if (errorSpan) {
    errorSpan.textContent = '';
  }
}

function validateRegisterField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return false;
  
  const value = field.value.trim();
  const errorSpan = document.getElementById(`${fieldId}-error`);
  let isValid = true;
  let errorMessage = '';
  
  field.classList.remove('error', 'success');
  
  switch(fieldId) {
    case 'registerName':
      if (value === '') {
        errorMessage = 'Full name is required';
        isValid = false;
      } else if (value.length < 3) {
        errorMessage = 'Name must be at least 3 characters';
        isValid = false;
      } else if (/\d/.test(value)) {
        errorMessage = 'Name cannot contain numbers';
        isValid = false;
      }
      break;
      
    case 'registerEmail':
      if (value === '') {
        errorMessage = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      } else if (registeredUsers.some(u => u.email.toLowerCase() === value.toLowerCase())) {
        errorMessage = 'Email is already registered';
        isValid = false;
      }
      break;
      
    case 'registerPhone':
      if (value === '') {
        errorMessage = 'Phone number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
        errorMessage = 'Please enter a valid 10-digit phone number';
        isValid = false;
      } else if (registeredUsers.some(u => u.phone === value.replace(/\D/g, ''))) {
        errorMessage = 'Phone number is already registered';
        isValid = false;
      }
      break;
      
    case 'registerPassword':
      if (value === '') {
        errorMessage = 'Password is required';
        isValid = false;
      } else if (value.length < 8) {
        errorMessage = 'Password must be at least 8 characters';
        isValid = false;
      } else if (!/[A-Z]/.test(value)) {
        errorMessage = 'Password must contain at least one uppercase letter';
        isValid = false;
      } else if (!/[a-z]/.test(value)) {
        errorMessage = 'Password must contain at least one lowercase letter';
        isValid = false;
      } else if (!/\d/.test(value)) {
        errorMessage = 'Password must contain at least one number';
        isValid = false;
      } else if (!/[!@#$%^&*]/.test(value)) {
        errorMessage = 'Password must contain at least one special character (!@#$%^&*)';
        isValid = false;
      }
      break;
      
    case 'registerConfirmPassword':
      const password = document.getElementById('registerPassword').value;
      if (value === '') {
        errorMessage = 'Please confirm your password';
        isValid = false;
      } else if (value !== password) {
        errorMessage = 'Passwords do not match';
        isValid = false;
      }
      break;
  }
  
  if (errorSpan) {
    errorSpan.textContent = errorMessage;
  }
  
  if (isValid) {
    field.classList.add('success');
  } else {
    field.classList.add('error');
  }
  
  return isValid;
}

function clearRegisterError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);
  
  if (field) {
    field.classList.remove('error', 'success');
  }
  if (errorSpan) {
    errorSpan.textContent = '';
  }
}

function updatePasswordStrength() {
  const password = document.getElementById('registerPassword').value;
  const strengthDiv = document.getElementById('passwordStrength');
  
  if (!password) {
    strengthDiv.innerHTML = '';
    return;
  }
  
  let strength = 0;
  let feedback = [];
  
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;
  
  let strengthText = '';
  let strengthColor = '';
  
  if (strength <= 2) {
    strengthText = 'Weak';
    strengthColor = 'var(--danger)';
  } else if (strength <= 3) {
    strengthText = 'Medium';
    strengthColor = 'var(--warning)';
  } else if (strength <= 4) {
    strengthText = 'Strong';
    strengthColor = 'var(--success)';
  } else {
    strengthText = 'Very Strong';
    strengthColor = 'var(--success)';
  }
  
  const percentage = (strength / 5) * 100;
  
  strengthDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <div style="flex: 1; height: 6px; background: var(--secondary-dark); border-radius: 3px; overflow: hidden;">
        <div style="width: ${percentage}%; height: 100%; background: ${strengthColor}; transition: all 0.3s;"></div>
      </div>
      <span style="font-size: 0.85rem; font-weight: 600; color: ${strengthColor};">${strengthText}</span>
    </div>
  `;
}

function customerLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  // Validate fields
  const usernameValid = validateLoginField('loginUsername');
  const passwordValid = validateLoginField('loginPassword');
  
  if (!usernameValid || !passwordValid) {
    return;
  }
  
  // Check login attempts
  if (!loginAttempts[username]) {
    loginAttempts[username] = { count: 0, lockUntil: null };
  }
  
  const attempt = loginAttempts[username];
  
  // Check if account is locked
  if (attempt.lockUntil && Date.now() < attempt.lockUntil) {
    const remainingMinutes = Math.ceil((attempt.lockUntil - Date.now()) / 60000);
    alert(`🔒 Account temporarily locked due to multiple failed login attempts.\n\nPlease try again in ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}.\n\nOr reset your password using "Forgot Password?"`);
    return;
  }
  
  // Reset lock if expired
  if (attempt.lockUntil && Date.now() >= attempt.lockUntil) {
    attempt.count = 0;
    attempt.lockUntil = null;
  }
  
  // Find user by email or phone
  const user = registeredUsers.find(u => 
    u.email.toLowerCase() === username.toLowerCase() || 
    u.phone === username.replace(/\D/g, '')
  );
  
  if (!user) {
    attempt.count++;
    if (attempt.count >= 5) {
      attempt.lockUntil = Date.now() + (15 * 60 * 1000); // Lock for 15 minutes
      alert('🔒 Account locked for 15 minutes due to multiple failed login attempts.');
    } else {
      alert(`❌ User not found.\n\nPlease check your credentials:\n• Email or Phone: ${username}\n\n💡 Try these test credentials:\nEmail: testuser@akrul.com\nPassword: TestAkrul@123\n\nAttempts remaining: ${5 - attempt.count}`);
    }
    return;
  }
  
  // Verify password (exact match)
  if (user.password !== password) {
    attempt.count++;
    if (attempt.count >= 5) {
      attempt.lockUntil = Date.now() + (15 * 60 * 1000); // Lock for 15 minutes
      alert('🔒 Account locked for 15 minutes due to multiple failed login attempts.');
    } else {
      alert(`❌ Incorrect password for ${user.email}\n\nPlease try again or use "Forgot Password?" to reset.\n\n💡 Test Account Password: TestAkrul@123\n\nAttempts remaining: ${5 - attempt.count}`);
    }
    return;
  }
  
  // Check if email is verified
  if (!user.emailVerified) {
    alert('⚠️ Please verify your email address before logging in.\n\nCheck your inbox for the verification link.');
    return;
  }
  
  // Login successful
  attempt.count = 0;
  attempt.lockUntil = null;
  
  user.lastLogin = new Date().toISOString();
  currentUser = user;
  
  toggleAuthModal();
  updateUserIcon();
  
  alert(`✅ Login Successful!\n\nWelcome back, ${user.fullName}!\n\nYou are now logged in and can access:\n• My Account - Edit your profile\n• Your Orders - Track your purchases\n• Wishlist - Saved items`);
  
  // Clear form
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
  clearLoginError('loginUsername');
  clearLoginError('loginPassword');
}

function customerRegister(e) {
  e.preventDefault();
  
  // Validate all fields
  const nameValid = validateRegisterField('registerName');
  const emailValid = validateRegisterField('registerEmail');
  const phoneValid = validateRegisterField('registerPhone');
  const passwordValid = validateRegisterField('registerPassword');
  const confirmValid = validateRegisterField('registerConfirmPassword');
  
  const termsChecked = document.getElementById('registerTerms').checked;
  if (!termsChecked) {
    document.getElementById('registerTerms-error').textContent = 'You must accept the terms and conditions';
    return;
  }
  
  if (!nameValid || !emailValid || !phoneValid || !passwordValid || !confirmValid) {
    alert('⚠️ Please fix all errors before submitting.');
    return;
  }
  
  // Get form values
  const fullName = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const phone = document.getElementById('registerPhone').value.trim().replace(/\D/g, '');
  const password = document.getElementById('registerPassword').value;
  
  // Create new user
  const newUser = {
    id: Math.max(...registeredUsers.map(u => u.id), 0) + 1,
    fullName: fullName,
    email: email,
    phone: phone,
    password: password,
    registrationDate: new Date().toISOString().split('T')[0],
    lastLogin: null,
    accountStatus: 'Active',
    emailVerified: true // Auto-verify for demo
  };
  
  registeredUsers.push(newUser);
  
  // Send verification email (simulated)
  console.log(`📧 Verification email sent to ${email}`);
  
  // Show success message
  alert(`✅ Registration Successful!\n\nWelcome, ${fullName}!\n\nYour account has been created.\n\nEmail: ${email}\nPhone: ${phone}\n\n✉️ A verification email has been sent to your email address.\n\nYou can now login with your email or phone number.`);
  
  // Clear form
  document.getElementById('registerName').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerPhone').value = '';
  document.getElementById('registerPassword').value = '';
  document.getElementById('registerConfirmPassword').value = '';
  document.getElementById('registerTerms').checked = false;
  document.getElementById('passwordStrength').innerHTML = '';
  
  // Clear errors
  ['registerName', 'registerEmail', 'registerPhone', 'registerPassword', 'registerConfirmPassword'].forEach(id => {
    clearRegisterError(id);
  });
  
  // Switch to login tab
  showAuthTab('login');
}

function showForgotPassword() {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.getElementById('forgotPasswordForm').classList.add('active');
}

function sendPasswordReset(e) {
  e.preventDefault();
  
  const username = document.getElementById('forgotUsername').value.trim();
  const errorSpan = document.getElementById('forgotUsername-error');
  
  if (!username) {
    errorSpan.textContent = 'Email or phone number is required';
    return;
  }
  
  // Find user
  const user = registeredUsers.find(u => 
    u.email.toLowerCase() === username.toLowerCase() || 
    u.phone === username.replace(/\D/g, '')
  );
  
  if (!user) {
    errorSpan.textContent = 'No account found with this email/phone number';
    return;
  }
  
  // Generate reset token
  const token = 'RESET-' + Date.now() + '-' + Math.random().toString(36).substring(7);
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  
  passwordResetTokens[token] = {
    userId: user.id,
    expiresAt: expiresAt
  };
  
  // Show success message with instructions
  alert(`✅ Password Reset Email Sent!\n\n📧 We've sent a password reset link to:\n${user.email}\n\nThe link will expire in 24 hours.\n\n📱 For demo purposes, your current password is: ${user.password}\n\nTo reset your password, you would normally click the link in the email, but for this demo, you can update it directly in the system.\n\nPlease check your email inbox and spam folder.`);
  
  // Clear form
  document.getElementById('forgotUsername').value = '';
  errorSpan.textContent = '';
  
  // Switch to login
  showAuthTab('login');
}



// Admin Portal
function showAdminPortal() {
  document.getElementById('customerSite').style.display = 'none';
  document.getElementById('adminPortal').style.display = 'block';
  document.getElementById('adminLogin').style.display = 'flex';
  document.getElementById('adminDashboard').style.display = 'none';
}

function backToCustomerSite() {
  document.getElementById('customerSite').style.display = 'block';
  document.getElementById('adminPortal').style.display = 'none';
}

function adminLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  
  if (email === 'admin@akrul.com' && password === 'admin123') {
    isAdminLoggedIn = true;
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    initializeAdminDashboard();
  } else {
    alert('Invalid credentials');
  }
}

function adminLogout() {
  isAdminLoggedIn = false;
  backToCustomerSite();
}

function toggleAdminSidebar() {
  document.getElementById('adminSidebar').classList.toggle('active');
}

function initializeAdminDashboard() {
  renderAdminStats();
  renderRevenueChart();
  renderRecentOrders();
  renderProductsTable();
  renderOrdersTable();
  renderCustomersTable();
  renderInventoryTable();
}

function renderAdminStats() {
  const stats = document.getElementById('statsGrid');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const completedPayments = paymentTransactions.filter(t => t.status === 'Completed').length;
  const failedPayments = paymentTransactions.filter(t => t.status === 'Failed').length;
  const emailsSentCount = orders.filter(o => o.emailSent).length;
  const emailsFailedCount = orders.filter(o => o.emailSent === false).length;
  
  stats.innerHTML = `
    <div class="stat-card">
      <h4>Total Revenue</h4>
      <div class="stat-value">₹${totalRevenue.toLocaleString()}</div>
      <div class="stat-change positive">+12.5%</div>
    </div>
    <div class="stat-card">
      <h4>Total Orders</h4>
      <div class="stat-value">${totalOrders}</div>
      <div class="stat-change positive">+8.3%</div>
    </div>
    <div class="stat-card">
      <h4>Emails Sent</h4>
      <div class="stat-value">${emailsSentCount}</div>
      <div class="stat-change ${emailsFailedCount > 0 ? 'negative' : 'positive'}">${emailsFailedCount} failed</div>
    </div>
    <div class="stat-card">
      <h4>Email Success Rate</h4>
      <div class="stat-value">${totalOrders > 0 ? Math.round((emailsSentCount / totalOrders) * 100) : 0}%</div>
      <div class="stat-change positive">Automated delivery</div>
    </div>
  `;
}

function renderRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: '#e63946',
        backgroundColor: 'rgba(230, 57, 70, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#2a2a3e' }, ticks: { color: '#b8b8b8' } },
        x: { grid: { color: '#2a2a3e' }, ticks: { color: '#b8b8b8' } }
      }
    }
  });
}

function renderRecentOrders() {
  const table = document.getElementById('recentOrdersTable');
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${orders.slice(0, 5).map(o => `
          <tr>
            <td>${o.id}</td>
            <td>${o.customerName}</td>
            <td>${o.date}</td>
            <td>₹${o.total}</td>
            <td><span class="order-status ${o.orderStatus.toLowerCase()}">${o.orderStatus}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderProductsTable() {
  const table = document.getElementById('productsTable');
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => `
          <tr>
            <td><div class="product-thumb" style="background-image: url('${p.image}'); background-size: cover; background-position: center;"></div></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>₹${p.price}</td>
            <td>${p.stock}</td>
            <td>
              <div class="action-btns">
                <button class="btn-icon" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-icon" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderOrdersTable() {
  const table = document.getElementById('ordersTable');
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(o => `
          <tr>
            <td>
              <div style="font-weight: 600;">${o.id}</div>
              <div style="font-size: 0.85rem; color: var(--accent-gold); font-family: 'Courier New', monospace;">${o.orderNumber || o.id}</div>
            </td>
            <td>
              <div>${o.customerName}</div>
              <div style="font-size: 0.85rem; color: var(--text-gray);">${o.email}</div>
            </td>
            <td>${o.date}</td>
            <td>₹${o.total}</td>
            <td><span class="order-status ${o.paymentStatus.toLowerCase()}">${o.paymentStatus}</span></td>
            <td><span class="order-status ${o.orderStatus.toLowerCase()}">${o.orderStatus}</span></td>
            <td>
              ${o.emailSent ? `<span style="color: var(--success); font-size: 0.85rem;"><i class="fas fa-check-circle"></i> Sent</span>` : `<span style="color: var(--danger); font-size: 0.85rem;"><i class="fas fa-times-circle"></i> Failed</span>`}
              ${o.emailSentTime ? `<div style="font-size: 0.75rem; color: var(--text-gray);">${o.emailSentTime}</div>` : ''}
            </td>
            <td>
              <button class="btn-icon" onclick="viewOrder('${o.id}')" title="View Order"><i class="fas fa-eye"></i></button>
              ${o.emailSent ? `<button class="btn-icon" onclick="resendOrderEmail('${o.orderNumber}')" title="Resend Email"><i class="fas fa-envelope"></i></button>` : `<button class="btn-icon" onclick="resendOrderEmail('${o.orderNumber}')" title="Send Email"><i class="fas fa-paper-plane"></i></button>`}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderCustomersTable() {
  const table = document.getElementById('customersTable');
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Orders</th>
          <th>Total Spent</th>
          <th>Join Date</th>
        </tr>
      </thead>
      <tbody>
        ${customers.map(c => `
          <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.totalOrders}</td>
            <td>₹${c.totalSpent.toLocaleString()}</td>
            <td>${c.joinDate}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderInventoryTable() {
  const table = document.getElementById('inventoryTable');
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>SKU</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => {
          let status = 'high';
          if (p.stock === 0) status = 'out';
          else if (p.stock < 20) status = 'low';
          else if (p.stock < 50) status = 'medium';
          
          return `
            <tr>
              <td>${p.name}</td>
              <td>${p.sku}</td>
              <td>${p.stock}</td>
              <td><span class="stock-status ${status}">${status === 'out' ? 'Out of Stock' : status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
              <td><button class="btn-icon"><i class="fas fa-edit"></i></button></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function showAdminPage(page) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
  
  const pageMap = {
    'dashboard': 'adminDashboardPage',
    'products': 'adminProductsPage',
    'orders': 'adminOrdersPage',
    'customers': 'adminCustomersPage',
    'users': 'adminUsersPage',
    'inventory': 'adminInventoryPage',
    'analytics': 'adminAnalyticsPage',
    'settings': 'adminSettingsPage',
    'payments': 'adminPaymentsPage'
  };
  
  const pageId = pageMap[page];
  if (pageId) {
    document.getElementById(pageId).classList.add('active');
    if (event && event.target) {
      event.target.classList.add('active');
    }
    
    if (page === 'payments') {
      renderPaymentsPage();
    } else if (page === 'users') {
      renderUsersPage();
    }
  }
}

function renderUsersPage() {
  // Update stats
  const totalUsers = registeredUsers.length;
  const activeUsers = registeredUsers.filter(u => u.accountStatus === 'Active').length;
  const verifiedEmails = registeredUsers.filter(u => u.emailVerified).length;
  const currentMonth = new Date().getMonth();
  const newUsers = registeredUsers.filter(u => new Date(u.registrationDate).getMonth() === currentMonth).length;
  
  document.getElementById('totalUsersCount').textContent = totalUsers;
  document.getElementById('activeUsersCount').textContent = activeUsers;
  document.getElementById('verifiedEmailsCount').textContent = verifiedEmails;
  document.getElementById('newUsersCount').textContent = newUsers;
  
  // Render users table
  const table = document.getElementById('usersTable');
  
  if (registeredUsers.length === 0) {
    table.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No registered users yet</p>';
    return;
  }
  
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Registration Date</th>
          <th>Last Login</th>
          <th>Status</th>
          <th>Email Verified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${registeredUsers.map(u => `
          <tr>
            <td>${u.id}</td>
            <td>${u.fullName}</td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            <td>${new Date(u.registrationDate).toLocaleDateString()}</td>
            <td>${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
            <td><span class="order-status ${u.accountStatus.toLowerCase()}">${u.accountStatus}</span></td>
            <td>
              ${u.emailVerified ? 
                '<span style="color: var(--success);"><i class="fas fa-check-circle"></i> Yes</span>' : 
                '<span style="color: var(--danger);"><i class="fas fa-times-circle"></i> No</span>'}
            </td>
            <td>
              <button class="btn-icon" onclick="viewUserDetails(${u.id})" title="View Details"><i class="fas fa-eye"></i></button>
              <button class="btn-icon" onclick="resetUserPassword(${u.id})" title="Reset Password"><i class="fas fa-key"></i></button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function viewUserDetails(userId) {
  const user = registeredUsers.find(u => u.id === userId);
  if (!user) return;
  
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  const userOrders = orders.filter(o => o.email === user.email || o.phone === user.phone);
  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
  
  content.innerHTML = `
    <h2>User Account Details</h2>
    
    <div style="background: var(--primary-dark); padding: 2rem; border-radius: 12px; margin: 1.5rem 0; border-top: 3px solid var(--accent-gold);">
      <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--accent-gold) 0%, #f4e5c3 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--primary-dark); font-weight: 800;">
          ${user.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem;">${user.fullName}</h3>
          <span class="order-status ${user.accountStatus.toLowerCase()}">${user.accountStatus}</span>
        </div>
      </div>
    </div>
    
    <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">Account Information</h4>
      <div style="display: grid; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">User ID:</span>
          <span style="font-weight: 600;">${user.id}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Email:</span>
          <span style="font-weight: 600;">${user.email}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Phone:</span>
          <span style="font-weight: 600;">${user.phone}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Registration Date:</span>
          <span style="font-weight: 600;">${new Date(user.registrationDate).toLocaleDateString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Last Login:</span>
          <span style="font-weight: 600;">${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Email Verified:</span>
          <span style="font-weight: 600; color: ${user.emailVerified ? 'var(--success)' : 'var(--danger)'};"><i class="fas ${user.emailVerified ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${user.emailVerified ? 'Yes' : 'No'}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Password:</span>
          <span style="font-family: 'Courier New', monospace; color: var(--accent-gold);">${user.password}</span>
        </div>
      </div>
    </div>
    
    <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">Order Statistics</h4>
      <div style="display: grid; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Total Orders:</span>
          <span style="font-weight: 600; font-size: 1.2rem; color: var(--accent-gold);">${userOrders.length}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Total Spent:</span>
          <span style="font-weight: 600; font-size: 1.2rem; color: var(--accent-gold);">₹${totalSpent}</span>
        </div>
      </div>
    </div>
    
    <button class="btn btn-primary btn-full" onclick="closeOrderModal()">Close</button>
  `;
  
  modal.classList.add('active');
}

function resetUserPassword(userId) {
  const user = registeredUsers.find(u => u.id === userId);
  if (!user) return;
  
  const newPassword = prompt(`Reset password for ${user.fullName}\n\nEnter new password (min 8 chars, must contain uppercase, lowercase, number, special char):`);
  
  if (!newPassword) return;
  
  if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
    alert('❌ Password does not meet requirements');
    return;
  }
  
  user.password = newPassword;
  alert(`✅ Password reset successfully for ${user.fullName}\n\nNew password: ${newPassword}`);
  renderUsersPage();
}

function renderPaymentsPage() {
  renderPaymentTransactions();
  renderPaymentGatewaySettings();
}

function renderPaymentTransactions() {
  const table = document.getElementById('paymentTransactionsTable');
  
  if (paymentTransactions.length === 0) {
    table.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-gray);">No payment transactions yet</p>';
    return;
  }
  
  table.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date & Time</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Status</th>
          <th>Gateway</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${paymentTransactions.map(t => `
          <tr>
            <td style="font-family: 'Courier New', monospace; color: var(--accent-gold);">${t.transactionId}</td>
            <td>${new Date(t.timestamp).toLocaleString()}</td>
            <td style="font-weight: 600;">₹${t.amount}</td>
            <td>${t.paymentMethod.toUpperCase()}</td>
            <td><span class="order-status ${t.status.toLowerCase()}">${t.status}</span></td>
            <td>${t.gateway.toUpperCase()}</td>
            <td>
              <button class="btn-icon" onclick="viewTransactionDetails('${t.transactionId}')"><i class="fas fa-eye"></i></button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderPaymentGatewaySettings() {
  const container = document.getElementById('paymentGatewaySettings');
  
  container.innerHTML = `
    <div style="background: var(--primary-dark); padding: 2rem; border-radius: 12px; border-left: 4px solid var(--accent-gold); margin-bottom: 2rem;">
      <h3 style="color: var(--accent-gold); margin-bottom: 1rem;"><i class="fas fa-info-circle"></i> Payment Gateway Integration</h3>
      <p style="color: var(--text-gray); line-height: 1.8; margin-bottom: 1rem;">To enable real payments, integrate a payment gateway. Choose from the following options:</p>
      
      <div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
        <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 8px;">
          <h4 style="color: var(--text-light); margin-bottom: 0.5rem;"><i class="fas fa-bolt" style="color: var(--accent-gold);"></i> Razorpay (India)</h4>
          <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">Most popular in India - Easy integration</p>
          <a href="https://razorpay.com" target="_blank" style="color: var(--accent-gold); font-size: 0.85rem;">www.razorpay.com <i class="fas fa-external-link-alt" style="font-size: 0.7rem;"></i></a>
        </div>
        
        <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 8px;">
          <h4 style="color: var(--text-light); margin-bottom: 0.5rem;"><i class="fas fa-stripe" style="color: var(--accent-gold);"></i> Stripe</h4>
          <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">Global payments - 135+ currencies</p>
          <a href="https://stripe.com" target="_blank" style="color: var(--accent-gold); font-size: 0.85rem;">www.stripe.com <i class="fas fa-external-link-alt" style="font-size: 0.7rem;"></i></a>
        </div>
        
        <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 8px;">
          <h4 style="color: var(--text-light); margin-bottom: 0.5rem;"><i class="fab fa-paypal" style="color: var(--accent-gold);"></i> PayPal</h4>
          <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">International payments - Trusted worldwide</p>
          <a href="https://paypal.com" target="_blank" style="color: var(--accent-gold); font-size: 0.85rem;">www.paypal.com <i class="fas fa-external-link-alt" style="font-size: 0.7rem;"></i></a>
        </div>
        
        <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 8px;">
          <h4 style="color: var(--text-light); margin-bottom: 0.5rem;"><i class="fas fa-credit-card" style="color: var(--accent-gold);"></i> Instamojo (India)</h4>
          <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.5rem;">India-based - Quick setup</p>
          <a href="https://instamojo.com" target="_blank" style="color: var(--accent-gold); font-size: 0.85rem;">www.instamojo.com <i class="fas fa-external-link-alt" style="font-size: 0.7rem;"></i></a>
        </div>
      </div>
    </div>
    
    <div style="background: var(--card-bg); padding: 2rem; border-radius: 12px;">
      <h3 style="margin-bottom: 1.5rem;">Gateway Configuration</h3>
      <form class="settings-form" onsubmit="return false;">
        <div class="form-group">
          <label>Payment Gateway</label>
          <select id="gatewaySelect" class="form-control">
            <option value="demo" selected>Demo Mode (Testing)</option>
            <option value="razorpay">Razorpay</option>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="instamojo">Instamojo</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>API Key</label>
          <input type="text" id="gatewayApiKey" class="form-control" placeholder="Enter your API key" />
        </div>
        
        <div class="form-group">
          <label>Secret Key</label>
          <input type="password" id="gatewaySecretKey" class="form-control" placeholder="Enter your secret key" />
        </div>
        
        <div class="form-group">
          <label>Merchant ID (if applicable)</label>
          <input type="text" id="gatewayMerchantId" class="form-control" placeholder="Enter merchant ID" />
        </div>
        
        <div class="form-group">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="liveMode" />
            <span>Enable Live Mode (Process real payments)</span>
          </label>
          <p style="color: var(--text-gray); font-size: 0.85rem; margin-top: 0.5rem;"><i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i> Keep in Test Mode until you're ready to accept real payments</p>
        </div>
        
        <button type="button" class="btn btn-primary" onclick="saveGatewaySettings()">Save Settings</button>
        <button type="button" class="btn btn-secondary" style="margin-left: 1rem;" onclick="testGatewayConnection()"><i class="fas fa-plug"></i> Test Connection</button>
      </form>
      
      <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 8px; margin-top: 2rem; border-left: 3px solid var(--info);">
        <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;"><i class="fas fa-info-circle"></i> Current Status</h4>
        <p style="color: var(--text-gray);">Gateway: <strong style="color: var(--text-light);">${paymentGatewaySettings.gateway.toUpperCase()}</strong></p>
        <p style="color: var(--text-gray);">Mode: <strong style="color: ${paymentGatewaySettings.mode === 'live' ? 'var(--success)' : 'var(--warning)'};">${paymentGatewaySettings.mode === 'live' ? 'LIVE' : 'TEST'}</strong></p>
        <p style="color: var(--text-gray); font-size: 0.85rem; margin-top: 0.5rem;"><i class="fas fa-shield-alt" style="color: var(--success);"></i> All payments are encrypted and secure</p>
      </div>
    </div>
  `;
}

function saveGatewaySettings() {
  paymentGatewaySettings.gateway = document.getElementById('gatewaySelect').value;
  paymentGatewaySettings.apiKey = document.getElementById('gatewayApiKey').value;
  paymentGatewaySettings.secretKey = document.getElementById('gatewaySecretKey').value;
  paymentGatewaySettings.merchantId = document.getElementById('gatewayMerchantId').value;
  paymentGatewaySettings.mode = document.getElementById('liveMode').checked ? 'live' : 'test';
  
  alert('✅ Payment gateway settings saved successfully!');
  renderPaymentGatewaySettings();
}

function testGatewayConnection() {
  alert('🔌 Testing gateway connection...\n\nConnection successful! (Demo Mode)');
}

function viewTransactionDetails(transactionId) {
  const transaction = paymentTransactions.find(t => t.transactionId === transactionId);
  if (!transaction) return;
  
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  content.innerHTML = `
    <h2 style="margin-bottom: 1.5rem;">Transaction Details</h2>
    
    <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 2px solid ${transaction.status === 'Completed' ? 'var(--success)' : 'var(--danger)'};">
      <h4 style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 0.5rem;">Transaction ID</h4>
      <div style="font-size: 1.3rem; font-weight: 700; font-family: 'Courier New', monospace; color: var(--accent-gold);">${transaction.transactionId}</div>
      <div style="margin-top: 1rem;">
        <span class="order-status ${transaction.status.toLowerCase()}" style="font-size: 1rem; padding: 0.5rem 1rem;">${transaction.status}</span>
      </div>
    </div>
    
    <div style="background: var(--secondary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">Payment Information</h4>
      <div style="display: grid; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Amount:</span>
          <span style="font-weight: 700; font-size: 1.2rem; color: var(--accent-gold);">₹${transaction.amount}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Payment Method:</span>
          <span style="font-weight: 600;">${transaction.paymentMethod.toUpperCase()}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Gateway:</span>
          <span style="font-weight: 600;">${transaction.gateway.toUpperCase()}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-gray);">Date & Time:</span>
          <span style="font-weight: 600;">${new Date(transaction.timestamp).toLocaleString()}</span>
        </div>
        ${transaction.authCode ? `
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-gray);">Auth Code:</span>
            <span style="font-family: 'Courier New', monospace; color: var(--success);">${transaction.authCode}</span>
          </div>
        ` : ''}
        ${transaction.errorCode ? `
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-gray);">Error Code:</span>
            <span style="font-family: 'Courier New', monospace; color: var(--danger);">${transaction.errorCode}</span>
          </div>
        ` : ''}
      </div>
    </div>
    
    ${transaction.message ? `
      <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;">Message</h4>
        <p style="color: var(--text-light);">${transaction.message}</p>
      </div>
    ` : ''}
    
    <button class="btn btn-primary btn-full" onclick="closeOrderModal()">Close</button>
  `;
  
  modal.classList.add('active');
}

function openProductModal(productId = null) {
  const modal = document.getElementById('productModal');
  const title = document.getElementById('productModalTitle');
  
  if (productId) {
    editingProductId = productId;
    const product = products.find(p => p.id === productId);
    title.textContent = 'Edit Product';
    document.getElementById('productName').value = product.name;
    document.getElementById('productSKU').value = product.sku;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productComparePrice').value = product.comparePrice || '';
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productDescription').value = product.description || '';
  } else {
    editingProductId = null;
    title.textContent = 'Add Product';
    document.getElementById('productForm').reset();
  }
  
  modal.classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  editingProductId = null;
}

function saveProduct(e) {
  e.preventDefault();
  
  const productData = {
    name: document.getElementById('productName').value,
    sku: document.getElementById('productSKU').value,
    category: document.getElementById('productCategory').value,
    price: parseInt(document.getElementById('productPrice').value),
    comparePrice: parseInt(document.getElementById('productComparePrice').value) || 0,
    stock: parseInt(document.getElementById('productStock').value),
    description: document.getElementById('productDescription').value,
    rating: 4.5,
    reviews: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White']
  };
  
  if (editingProductId) {
    const product = products.find(p => p.id === editingProductId);
    Object.assign(product, productData);
    alert('Product updated successfully!');
  } else {
    productData.id = Math.max(...products.map(p => p.id)) + 1;
    products.push(productData);
    alert('Product added successfully!');
  }
  
  closeProductModal();
  renderProductsTable();
  renderInventoryTable();
}

function editProduct(productId) {
  openProductModal(productId);
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    const index = products.findIndex(p => p.id === productId);
    products.splice(index, 1);
    renderProductsTable();
    renderInventoryTable();
    alert('Product deleted successfully!');
  }
}

function searchAdminProducts() {
  const query = document.getElementById('productSearch').value.toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.sku.toLowerCase().includes(query)
  );
  // Re-render with filtered results (simplified for now)
  renderProductsTable();
}

function filterOrders() {
  const status = document.getElementById('orderStatusFilter').value;
  // Filter and re-render (simplified)
  renderOrdersTable();
}

function viewOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  const modal = document.getElementById('orderModal');
  const content = document.getElementById('orderModalContent');
  
  content.innerHTML = `
    <h2>Order Details - ${order.id}</h2>
    
    <div style="background: var(--primary-dark); padding: 1.5rem; border-radius: 12px; margin: 1rem 0; border: 2px solid var(--accent-gold);">
      <h4 style="color: var(--text-gray); font-size: 0.85rem; margin-bottom: 0.5rem;">Unique Order Number</h4>
      <div style="font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, var(--accent-gold) 0%, #f4e5c3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: 'Courier New', monospace; letter-spacing: 1px;">
        ${order.orderNumber || order.id}
      </div>
    </div>
    
    <div style="margin-top: 1rem;">
      <h4>Customer Information</h4>
      <p>${order.customerName}<br>${order.email}<br>${order.phone}</p>
      
      <h4 style="margin-top: 1rem;">Order Information</h4>
      <p>Date: ${order.date}<br>Total: ₹${order.total}<br>Payment: ${order.paymentStatus}<br>Status: ${order.orderStatus}</p>
      
      <div style="background: ${order.emailSent ? 'rgba(76, 175, 80, 0.1)' : 'rgba(196, 30, 58, 0.1)'}; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 3px solid ${order.emailSent ? 'var(--success)' : 'var(--danger)'};">
        <h4 style="color: ${order.emailSent ? 'var(--success)' : 'var(--danger)'}; margin-bottom: 0.5rem;">
          <i class="fas ${order.emailSent ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
          Confirmation Email ${order.emailSent ? 'Sent' : 'Failed'}
        </h4>
        <p style="color: var(--text-gray); font-size: 0.9rem; margin-bottom: 0.3rem;">To: ${order.email}</p>
        ${order.emailSentTime ? `<p style="color: var(--text-gray); font-size: 0.85rem;">Sent at: ${order.emailSentTime}</p>` : ''}
        <button class="btn btn-secondary" style="margin-top: 0.8rem; padding: 0.6rem 1.2rem; font-size: 0.9rem;" onclick="resendOrderEmail('${order.orderNumber}'); closeOrderModal();">
          <i class="fas fa-envelope"></i> ${order.emailSent ? 'Resend' : 'Send'} Email
        </button>
      </div>
      
      ${order.items && order.items.length > 0 ? `
        <h4 style="margin-top: 1rem;">Order Items</h4>
        ${order.items.map(item => `
          <div style="padding: 0.8rem; background: var(--secondary-dark); border-radius: 8px; margin-bottom: 0.5rem;">
            <div><strong>${item.productName || 'Product'}</strong></div>
            <div style="font-size: 0.85rem; color: var(--text-gray);">Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity} | Price: ₹${item.price * item.quantity}</div>
          </div>
        `).join('')}
      ` : ''}
      
      <div style="margin-top: 1rem;">
        <label>Update Status:</label>
        <select class="form-control" style="margin-top: 0.5rem;" onchange="updateOrderStatus('${order.id}', this.value)">
          <option ${order.orderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
          <option ${order.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
          <option ${order.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </div>
      
      <button class="btn btn-primary" style="margin-top: 1rem;" onclick="closeOrderModal()">Close</button>
    </div>
  `;
  
  modal.classList.add('active');
}

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.orderStatus = newStatus;
    alert(`Order status updated to: ${newStatus}`);
    renderOrdersTable();
  }
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
}

function showSettingsTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(tab + 'Settings').classList.add('active');
}

// Product Detail Selection Functions
function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('#sizeOptionsDetail .size-option').forEach(opt => {
    if (opt.textContent === size) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

function selectColor(color) {
  selectedColor = color;
  document.querySelectorAll('#colorOptionsDetail .color-option').forEach(opt => {
    if (opt.textContent === color) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

function updateProductQuantity(delta) {
  const newQty = productQuantity + delta;
  if (newQty >= 1 && newQty <= (currentProduct?.stock || 999)) {
    productQuantity = newQty;
    document.getElementById('productQuantityDisplay').textContent = productQuantity;
  } else if (newQty > (currentProduct?.stock || 999)) {
    alert(`⚠️ Only ${currentProduct.stock} items available in stock`);
  }
}
