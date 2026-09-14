import React, { useState } from 'react';
import { TopNoticeBar } from './components/layout/TopNoticeBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { PromoBar } from './components/home/PromoBar';
import { RayonsPhares } from './components/home/RayonsPhares';
import { ProductCatalog } from './components/products/ProductCatalog';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { RecipesAndTutos } from './components/recipes/RecipesAndTutos';
import { FloatingSoniaChat } from './components/ai/FloatingSoniaChat';
import { SkinDiagnosticModal } from './components/ai/SkinDiagnosticModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/cart/WishlistDrawer';
import { StackInspector } from './components/architecture/StackInspector';
import { ClerkAuthModal } from './components/auth/ClerkAuthModal';
import { LegalModal, LegalDocType } from './components/layout/LegalModal';

import { INITIAL_PRODUCTS, HERO_FEATURED_PRODUCT } from './data/productsData';
import { Product, ProductCategory, CartItem, UserProfile } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('tous');
  const [activeView, setActiveView] = useState<'shop' | 'recettes' | 'diagnostic' | 'stack'>('shop');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Products Dataset
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    id: 'user_2x9m8k7L1q4P',
    fullName: 'Yosra Herborista',
    email: 'yosra.herborista@gmail.com',
    role: 'client',
    savedProductIds: ['serum-acide-hyaluronique-35'],
    cart: []
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: HERO_FEATURED_PRODUCT,
      quantity: 1
    }
  ]);

  // Modal / Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSkinDiagnosisOpen, setIsSkinDiagnosisOpen] = useState(false);
  const [isSoniaChatOpen, setIsSoniaChatOpen] = useState(false);
  const [isClerkAuthOpen, setIsClerkAuthOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalDocType>('mentions');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  const handleOpenLegalModal = (tab: LegalDocType) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setUser((prev) => {
      const exists = prev.savedProductIds.includes(productId);
      return {
        ...prev,
        savedProductIds: exists
          ? prev.savedProductIds.filter((id) => id !== productId)
          : [...prev.savedProductIds, productId]
      };
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-[#0f291e] selection:text-white">
      
      {/* Top Announcement Bar */}
      <TopNoticeBar
        onOpenSoniaChat={() => setIsSoniaChatOpen(true)}
        onOpenSkinDiagnosis={() => setIsSkinDiagnosisOpen(true)}
      />

      {/* Main Header & Nav */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        user={user}
        onOpenClerkAuth={() => setIsClerkAuthOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSkinDiagnosis={() => setIsSkinDiagnosisOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStackInspector={() => setActiveView('stack')}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View Workspace */}
      <main className="flex-1">
        {activeView === 'shop' && (
          <>
            <HeroBanner
              featuredProduct={HERO_FEATURED_PRODUCT}
              onAddToCart={handleAddToCart}
              onOpenSkinDiagnosis={() => setIsSkinDiagnosisOpen(true)}
              onOpenSoniaChat={() => setIsSoniaChatOpen(true)}
              onExploreSerums={() => {
                setActiveCategory('soins_visage');
                setActiveView('shop');
              }}
            />

            <PromoBar
              onOpenSoniaChat={() => setIsSoniaChatOpen(true)}
            />

            <RayonsPhares
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                setActiveView('shop');
              }}
              onExploreAll={() => {
                setActiveCategory('tous');
                setActiveView('shop');
              }}
            />

            <ProductCatalog
              products={products}
              user={user}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              searchQuery={searchQuery}
              onOpenProductDetail={(p) => setSelectedProductForDetail(p)}
            />
          </>
        )}

        {activeView === 'recettes' && <RecipesAndTutos />}

        {activeView === 'stack' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <StackInspector user={user} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenLegalModal={handleOpenLegalModal} />

      {/* Floating Sonia AI Assistant Widget */}
      <FloatingSoniaChat
        user={user}
        products={products}
        onAddToCart={handleAddToCart}
        isOpen={isSoniaChatOpen}
        setIsOpen={setIsSoniaChatOpen}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProductDetail={(p) => setSelectedProductForDetail(p)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        user={user}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* Slide-over Wishlist / Favorites Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedProductIds={user.savedProductIds}
        products={products}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenProductDetail={(p) => setSelectedProductForDetail(p)}
      />

      {/* Skin Diagnosis AI Modal */}
      <SkinDiagnosticModal
        isOpen={isSkinDiagnosisOpen}
        onClose={() => setIsSkinDiagnosisOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
      />

      {/* Product Quick View Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Clerk Profile Modal */}
      <ClerkAuthModal
        isOpen={isClerkAuthOpen}
        onClose={() => setIsClerkAuthOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

    </div>
  );
}
