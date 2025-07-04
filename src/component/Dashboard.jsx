import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  EyeOff,
  Settings,
  ShoppingCart,
  Star,
  Heart,
  TrendingUp,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

export default function Dashboard() {
  // Feature flags state
  const [featureFlags, setFeatureFlags] = useState({
    showRecommendations: true,
    enableWishlist: true,
    showPriceComparison: true,
    enableQuickBuy: true,
    showRatings: true,
    enableAdvancedFilters: false,
    showPromotions: true,
    enableBulkActions: false,
    showProductGallery: true,
    enableReviews: true,
    showShippingInfo: true,
    enableSocialShare: true,
  });

  // Sample product data with detailed info
  const [products] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299000,
      originalPrice: 399000,
      category: "Electronics",
      rating: 4.8,
      reviews: 156,
      description:
        "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort design for all-day listening.",
      features: [
        "Active Noise Cancellation",
        "30-hour Battery Life",
        "Quick Charge",
        "Premium Comfort",
        "Wireless Connectivity",
      ],
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      ],
      inStock: true,
      trending: true,
      discount: 25,
      brand: "AudioTech",
      sku: "AT-WH-001",
      warranty: "2 years",
      shipping: "Free shipping available",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 1299000,
      originalPrice: 1499000,
      category: "Wearables",
      rating: 4.6,
      reviews: 89,
      description:
        "Advanced fitness tracking with heart rate monitoring, GPS, and comprehensive health insights. Perfect companion for your active lifestyle.",
      features: [
        "Heart Rate Monitor",
        "GPS Tracking",
        "Water Resistant",
        "Sleep Tracking",
        "Multi-Sport Modes",
      ],
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=600&fit=crop",
      ],
      inStock: true,
      trending: false,
      discount: 13,
      brand: "FitMax",
      sku: "FM-SW-002",
      warranty: "1 year",
      shipping: "Free shipping available",
    },
    {
      id: 3,
      name: "Mechanical Gaming Keyboard",
      price: 899000,
      originalPrice: 899000,
      category: "Gaming",
      rating: 4.9,
      reviews: 234,
      description:
        "Professional mechanical keyboard with RGB backlighting, customizable keys, and ultra-responsive switches for competitive gaming.",
      features: [
        "Mechanical Switches",
        "RGB Backlighting",
        "Programmable Keys",
        "Gaming Mode",
        "Durable Build",
      ],
      images: [
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&h=600&fit=crop",
      ],
      inStock: false,
      trending: true,
      discount: 0,
      brand: "GamePro",
      sku: "GP-MK-003",
      warranty: "3 years",
      shipping: "Express shipping available",
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      price: 2499000,
      originalPrice: 2999000,
      category: "Photography",
      rating: 4.7,
      reviews: 67,
      description:
        "High-quality professional lens with superior optics, image stabilization, and weather sealing for professional photographers.",
      features: [
        "Image Stabilization",
        "Weather Sealed",
        "Ultra-Sharp Optics",
        "Silent Autofocus",
        "Professional Grade",
      ],
      images: [
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&h=600&fit=crop",
      ],
      inStock: true,
      trending: false,
      discount: 17,
      brand: "ProLens",
      sku: "PL-CL-004",
      warranty: "5 years",
      shipping: "Free shipping available",
    },
  ]);

  // App state
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'detail'
  const [currentProductId, setCurrentProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFlagPanel, setShowFlagPanel] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Simulate URL routing
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("product/")) {
      const productId = parseInt(hash.split("/")[1]);
      setCurrentProductId(productId);
      setCurrentView("detail");
    } else {
      setCurrentView("list");
      setCurrentProductId(null);
    }
  }, []);

  const navigateToProduct = (productId) => {
    setCurrentProductId(productId);
    setCurrentView("detail");
    setSelectedImageIndex(0);
    window.location.hash = `product/${productId}`;
  };

  const navigateToList = () => {
    setCurrentView("list");
    setCurrentProductId(null);
    window.location.hash = "";
  };

  const toggleFeatureFlag = (flag) => {
    setFeatureFlags((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const categories = [
    "All",
    "Electronics",
    "Wearables",
    "Gaming",
    "Photography",
  ];

  // Get current product for detail view
  const currentProduct = currentProductId
    ? products.find((p) => p.id === currentProductId)
    : null;

  // Product Detail View
  if (currentView === "detail" && currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={navigateToList}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Product Details
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {featureFlags.enableSocialShare && (
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setShowFlagPanel(!showFlagPanel)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Feature Flags Panel */}
        {showFlagPanel && (
          <div className="bg-blue-50 border-b border-blue-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Feature Flags Control
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(featureFlags).map(([flag, enabled]) => (
                  <div key={flag} className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFeatureFlag(flag)}
                      className={`p-1 rounded ${
                        enabled ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {enabled ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    <span className="text-sm text-gray-700 capitalize">
                      {flag.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Detail Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {featureFlags.showProductGallery && (
                <>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                    <img
                      src={currentProduct.images[selectedImageIndex]}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {featureFlags.showPromotions &&
                      currentProduct.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          -{currentProduct.discount}%
                        </div>
                      )}
                    {featureFlags.enableWishlist && (
                      <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {currentProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImageIndex === index
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${currentProduct.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentProduct.name}
                </h1>
                <p className="text-gray-600">
                  {currentProduct.brand} • SKU: {currentProduct.sku}
                </p>
              </div>

              {featureFlags.showRatings && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">
                    {currentProduct.rating}
                  </span>
                  <span className="text-gray-500">
                    ({currentProduct.reviews} reviews)
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(currentProduct.price)}
                  </span>
                  {featureFlags.showPriceComparison &&
                    currentProduct.originalPrice > currentProduct.price && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(currentProduct.originalPrice)}
                      </span>
                    )}
                </div>
                <p
                  className={`text-sm font-medium ${
                    currentProduct.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {currentProduct.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{currentProduct.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Features
                </h3>
                <ul className="space-y-1">
                  {currentProduct.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {featureFlags.showShippingInfo && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {currentProduct.shipping}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {currentProduct.warranty} warranty
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      30-day return policy
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {featureFlags.enableQuickBuy && (
                  <button
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!currentProduct.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 inline mr-2" />
                    {currentProduct.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                )}
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {featureFlags.showRecommendations && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter(
                    (p) =>
                      p.id !== currentProduct.id &&
                      p.category === currentProduct.category
                  )
                  .slice(0, 4)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigateToProduct(product.id)}
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 text-sm mb-2">
                          {product.name}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Product List View (Original Dashboard)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Product Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFlagPanel(!showFlagPanel)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Flags Panel */}
      {showFlagPanel && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Feature Flags Control
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(featureFlags).map(([flag, enabled]) => (
                <div key={flag} className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFeatureFlag(flag)}
                    className={`p-1 rounded ${
                      enabled ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {enabled ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <span className="text-sm text-gray-700 capitalize">
                    {flag.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {featureFlags.enableAdvancedFilters && (
              <div className="flex items-center space-x-4">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Quick category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {featureFlags.showRecommendations && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Trending Products
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products
                .filter((p) => p.trending)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigateToProduct(product.id)}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="aspect-square bg-gray-100 relative cursor-pointer"
                onClick={() => navigateToProduct(product.id)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {featureFlags.showPromotions && product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    -{product.discount}%
                  </div>
                )}
                {featureFlags.enableWishlist && (
                  <button className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-medium text-gray-900 text-sm leading-tight cursor-pointer hover:text-blue-600"
                    onClick={() => navigateToProduct(product.id)}
                  >
                    {product.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">{product.category}</p>

                {featureFlags.showRatings && (
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {featureFlags.showPriceComparison &&
                      product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {featureFlags.enableQuickBuy && (
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 inline mr-2" />
                      Quick Buy
                    </button>
                  )}
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => navigateToProduct(product.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No products found</div>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
