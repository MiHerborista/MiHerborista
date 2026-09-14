import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  ArrowRight,
  Sparkles,
  Send,
  RotateCcw,
  Tag,
  Copy,
  Check,
  ShoppingBag,
  Truck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ChatMessage, Product, UserProfile } from '../../types';
import { getRefinedBotanicalAdvice } from '../../lib/ai/soniaConsultant';

interface FloatingSoniaChatProps {
  user: UserProfile;
  products: Product[];
  onAddToCart: (p: Product) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cartTotal?: number;
  onOpenCart?: () => void;
  onOpenProductDetail?: (p: Product) => void;
}

// Helper to render refined botanical advice with formatted bolding, lists and tips
const renderInlineSpans = (str: string) => {
  const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-[#0f291e]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-stone-700 font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

const renderFormattedBotanicalText = (text: string) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs text-stone-800 leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Highlight tip section (e.g. 🌿 *L'astuce de l'herboriste* : ...)
        if (trimmed.startsWith('🌿') || trimmed.includes("L'astuce de l'herboriste")) {
          return (
            <div
              key={idx}
              className="bg-emerald-50/90 border border-emerald-200/70 rounded-xl p-2.5 my-2 text-[11.5px] text-emerald-950 shadow-2xs"
            >
              {renderInlineSpans(trimmed)}
            </div>
          );
        }

        // Bullet point lines starting with • or - or *
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
              <div className="flex-1">{renderInlineSpans(bulletContent)}</div>
            </div>
          );
        }

        return <p key={idx}>{renderInlineSpans(trimmed)}</p>;
      })}
    </div>
  );
};

export const FloatingSoniaChat: React.FC<FloatingSoniaChatProps> = ({
  user,
  products,
  onAddToCart,
  isOpen,
  setIsOpen,
  cartTotal = 5.95,
  onOpenCart,
  onOpenProductDetail
}) => {
  const [showTeaser, setShowTeaser] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Suggested Prompts as seen in image.png
  const quickSuggestions = [
    { label: 'Acné & pores dilatés', query: 'Quelle routine pour acné & pores dilatés ?' },
    { label: 'Peau sèche & ridules de déshydratation', query: 'Quelle routine pour peau sèche & ridules ?' },
    { label: 'Teint terne & taches pigmentaires', query: 'Quelle routine pour teint terne & taches ?' },
    { label: 'Pousse des cheveux & anti-chute', query: 'Quelle routine pour la pousse des cheveux & anti-chute ?' }
  ];

  // Welcome Chat State matching image.png
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'welcome_card', // special key rendered with full welcome template
      timestamp: '12:03 PM'
    }
  ]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BIENVENUE10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'assistant',
        text: 'welcome_card',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/trpc/consultation.sendChatMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, userProfile: user })
      }).catch(() => null);

      let replyText = '';
      let recommendedProducts: Product[] = [];

      if (res && res.ok) {
        const data = await res.json();
        replyText = data?.reply || data?.result?.data?.reply;
        if (data?.recommendedProductIds && Array.isArray(data.recommendedProductIds) && data.recommendedProductIds.length > 0) {
          recommendedProducts = products.filter(p => data.recommendedProductIds.includes(p.id));
        }
      }

      // If backend was unreachable or returned empty, use our refined botanical advice engine
      if (!replyText || recommendedProducts.length === 0) {
        const refined = getRefinedBotanicalAdvice(text);
        if (!replyText) replyText = refined.reply;
        if (recommendedProducts.length === 0) {
          recommendedProducts = products.filter(p => refined.recommendedProductIds.includes(p.id));
        }
      }

      // Guarantee of relevant products if filter had no matches
      if (recommendedProducts.length === 0) {
        recommendedProducts = products.slice(0, 3);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        recommendedProducts,
        timestamp: timeStr
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const fallback = getRefinedBotanicalAdvice(text);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          text: fallback.reply,
          recommendedProducts: products.filter(p => fallback.recommendedProductIds.includes(p.id)),
          timestamp: timeStr
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const remainingForFreeDelivery = Math.max(0, 35 - cartTotal);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-3 pointer-events-none">

      {/* Floating Teaser Card */}
      {showTeaser && !isOpen && (
        <div className="pointer-events-auto bg-white rounded-2xl p-4 shadow-2xl border border-stone-200/90 max-w-xs text-stone-900 transition-all transform hover:-translate-y-1 relative animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowTeaser(false)}
            className="absolute top-2.5 right-2.5 text-stone-400 hover:text-stone-700 cursor-pointer p-1 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-2 font-bold text-xs text-[#0f291e] mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sonia • MiHerborista •</span>
          </div>

          <p className="text-xs text-stone-700 leading-snug font-medium mb-3">
            Une question sur votre peau ? Découvrez votre routine idéale + <strong className="text-[#0f291e] font-bold">-10% de bienvenue !</strong>
          </p>

          <button
            onClick={() => {
              setIsOpen(true);
              setShowTeaser(false);
            }}
            className="flex items-center space-x-1.5 text-xs font-bold text-[#0f291e] hover:text-emerald-800 transition-colors cursor-pointer group"
          >
            <span>Lancer la discussion</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Main Sonia AI Chat Drawer Window matching image.png & image.png */}
      {isOpen && (
        <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-stone-200/90 w-[92vw] sm:w-[410px] h-[580px] max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

          {/* Top Dark Header matching image.png */}
          <div className="bg-[#0b2419] text-white p-3.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center space-x-3">
              {/* Avatar with leaf & online badge */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#133526] border-2 border-emerald-500/40 flex items-center justify-center font-serif text-base font-bold text-emerald-100 shadow-inner">
                  🌿
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b2419]"></span>
              </div>

              <div>
                <div className="text-xs font-bold flex items-center gap-1.5 text-stone-100">
                  <span>Sonia • Experte MiHerborista</span>
                  <span className="bg-amber-900/60 text-amber-300 text-[9px] font-semibold px-1.5 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider">
                    IA Botanique
                  </span>
                </div>
                <div className="text-[11px] text-emerald-200/90 flex items-center gap-1.5 mt-0.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Conseillère en ligne • Spécialiste soins naturels</span>
                </div>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleResetChat}
                title="Réinitialiser la discussion"
                className="p-1.5 hover:bg-emerald-900/60 rounded-full transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Fermer"
                className="p-1.5 hover:bg-emerald-900/60 rounded-full transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader: Free Delivery Counter Bar */}
          <div className="bg-stone-50 border-b border-stone-200 px-3.5 py-2 flex items-center justify-between text-xs text-stone-800 font-medium shrink-0">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span>
                Livraison offerte à 35 DT : plus que{' '}
                <strong className="text-[#0f291e] font-bold">
                  {remainingForFreeDelivery.toFixed(2)} DT
                </strong>
              </span>
            </div>
            <button
              onClick={onOpenCart}
              className="text-[#0f291e] hover:text-emerald-700 font-bold flex items-center gap-0.5 cursor-pointer text-[11px]"
            >
              <span>Panier ({cartTotal.toFixed(2)} DT)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrollable Messages Container */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#fbf9f5]/70">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                
                {/* Special Initial Welcome Card matching image.png */}
                {msg.text === 'welcome_card' ? (
                  <div className="bg-white rounded-2xl p-4 shadow-2xs border border-stone-200/90 text-stone-800 space-y-3 text-xs leading-relaxed animate-in fade-in">
                    <p>
                      Bonjour ! Je suis <strong className="text-[#0f291e]">Sonia</strong>, votre conseillère botaniste et dermo-cosmétique certifiée chez <strong className="text-[#0f291e]">MiHerborista</strong> en Tunisie 🌿
                    </p>

                    <p>
                      Je suis là pour vous composer une routine 100% sur-mesure, analyser vos besoins ou vous guider parmi nos soins purs formulés en Tunisie.
                    </p>

                    <p className="text-stone-800">
                      🎁 <strong className="text-[#0f291e]">Offre exclusive</strong> : Bénéficiez de <strong className="text-emerald-800">-10%</strong> immédiats sur votre commande avec le code <strong className="text-[#0f291e]">BIENVENUE10</strong>, et de la <strong className="text-emerald-800">livraison offerte dès 35 DT</strong> partout en Tunisie !
                    </p>

                    <p className="font-medium text-stone-700">
                      Par quoi aimeriez-vous commencer aujourd'hui ?
                    </p>

                    {/* Mint Promo Code Box matching image.png */}
                    <div className="bg-[#edf6f1] border border-emerald-200/90 rounded-2xl p-3 flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-start gap-2.5">
                        <Tag className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-stone-900 text-xs">
                            <span>Code : BIENVENUE10</span>
                            <span className="bg-[#0f291e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                              -10%
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-600 block mt-0.5 font-normal">
                            Valable dès maintenant sur tout le panier
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleCopyCode}
                        className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer active:scale-95"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="text-emerald-800">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-600" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard User or Assistant Message */
                  <div
                    className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-[#0f291e] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                        S
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] ${
                        msg.sender === 'user'
                          ? 'bg-[#0f291e] text-white rounded-2xl rounded-tr-xs p-3 text-xs leading-relaxed shadow-xs'
                          : 'bg-white text-stone-800 border border-stone-200/90 rounded-2xl rounded-tl-xs p-3.5 text-xs leading-relaxed shadow-2xs'
                      }`}
                    >
                      {msg.sender === 'assistant' ? (
                        renderFormattedBotanicalText(msg.text)
                      ) : (
                        <p className="whitespace-pre-line">{msg.text}</p>
                      )}

                      {/* Render Product Recommendation Cards if present */}
                      {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                        <div className="mt-3 space-y-2 border-t border-stone-100 pt-2.5">
                          <div className="flex items-center justify-between text-[11px] font-serif font-bold text-[#0f291e] px-0.5">
                            <span>Soins Botaniques Recommandés</span>
                            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-medium">
                              100% Purs
                            </span>
                          </div>

                          {msg.recommendedProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="bg-white border border-stone-200/90 rounded-xl p-2.5 flex items-center justify-between gap-2.5 shadow-2xs hover:border-emerald-300 transition-colors"
                            >
                              {/* Product Thumbnail */}
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                className="w-13 h-13 rounded-lg object-cover shrink-0 bg-stone-100 border border-stone-200/60"
                              />

                              {/* Product Details with Readable Typography */}
                              <div className="flex-1 min-w-0 pr-1">
                                {prod.badge && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block mb-0.5">
                                    {prod.badge}
                                  </span>
                                )}
                                <h4 className="font-serif font-bold text-xs text-stone-900 line-clamp-2 leading-tight">
                                  {prod.title}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="font-bold text-xs text-[#0f291e]">
                                    {prod.price.toFixed(2)} DT
                                  </span>
                                  {prod.volumeOrSize && (
                                    <span className="text-[10px] text-stone-500 truncate max-w-[120px]">
                                      • {prod.volumeOrSize.replace(/Flacon (verre ambré |spray )?/, '')}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Actions: Details & Add Button */}
                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <button
                                  onClick={() => onAddToCart(prod)}
                                  className="bg-[#0f291e] hover:bg-emerald-950 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-transform active:scale-95 cursor-pointer shadow-2xs"
                                >
                                  <ShoppingBag className="w-3 h-3" />
                                  <span>Ajouter</span>
                                </button>
                                {onOpenProductDetail && (
                                  <button
                                    onClick={() => onOpenProductDetail(prod)}
                                    className="text-[10px] text-stone-500 hover:text-stone-800 font-medium px-1 cursor-pointer underline"
                                  >
                                    Détails
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <span
                        className={`text-[9px] block mt-1.5 ${
                          msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-stone-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            ))}

            {/* Quick Suggestion Pills right inside messages body (matching image.png) */}
            <div className="space-y-1.5 pt-1">
              {quickSuggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.query)}
                  className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/90 rounded-full px-3.5 py-1.5 text-xs font-medium flex items-center justify-between w-full cursor-pointer shadow-2xs hover:border-emerald-300 hover:text-[#0f291e] transition-all text-left"
                >
                  <span className="truncate">{sug.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-stone-600 p-3 bg-white rounded-2xl border border-stone-200/80 w-fit shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Sonia consulte la pharmacopée MiHerborista...</span>
              </div>
            )}
          </div>

          {/* Input Footer Area matching image.png & image.png */}
          <div className="p-3 bg-white border-t border-stone-200/90 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Posez votre question (ex: routine acné, rides...)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-stone-100/90 border border-stone-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#0f291e] focus:bg-white transition-all"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || loading}
                className="w-9 h-9 rounded-2xl bg-[#0f291e] hover:bg-emerald-950 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Footer Badges matching image.png */}
            <div className="flex items-center justify-between mt-2.5 pt-1 text-[10px] text-stone-500 font-medium px-1 border-t border-stone-100">
              <div className="flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Conseils botaniques certifiés</span>
              </div>
              <span className="text-stone-400">Livraison offerte dès 35 DT</span>
            </div>
          </div>

        </div>
      )}

      {/* Floating Toggle Round Button with Notification Badge */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (showTeaser) setShowTeaser(false);
        }}
        className="pointer-events-auto relative w-14 h-14 rounded-full bg-[#0f291e] hover:bg-emerald-950 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-emerald-400/40"
      >
        <MessageSquare className="w-6 h-6 text-emerald-100" />
        <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          1
        </span>
      </button>

    </div>
  );
};
