import { useState } from 'react';
import { ShoppingCart, Phone, Truck, Star, MapPin, CheckCircle2, ChevronRight, Menu, X, Trash2 } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Sample Product Data
const products = [
  { id: '1', name: 'Heavy Duty Paper Plates', specs: '9-inch, 100 pack', image: '/heavy-duty.jpg' },
  { id: '2', name: 'Clear Plastic Cups', specs: '16oz, 50 pack', image: '/clear-plastic-cups.jpg' },
  { id: '3', name: 'Aluminum Foil Roll', specs: '18-inch x 500 ft, Heavy Duty', image: '/aluminium-foil.jpg' },
  { id: '4', name: 'Eco-Friendly Takeout Containers', specs: '3-Compartment, 150 pack', image: '/eco-friendly.jpg' },
  { id: '5', name: 'Premium Napkins', specs: 'White, 2-ply, 500 pack', image: '/napkin.jpg' },
  { id: '6', name: 'Silverware Combo Set', specs: 'Forks, Knives, Spoons, 300 pack', image: '/silverware.jpg' },
];

export default function App() {
  const [cart, setCart] = useState<{ product: typeof products[0]; quantity: number }[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to your quote!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const location = formData.get('location');

    let message = `*New Quote Request from ${name}*\n`;
    message += `Phone: ${phone}\n`;
    message += `Delivery Location: ${location}\n\n`;
    message += `*Items:*\n`;
    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.product.name} (${item.product.specs})\n`;
    });

    const whatsappUrl = `https://wa.me/256757206966?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setCart([]);
    setIsCartOpen(false);
    toast.success('Your quote request has been prepared! Redirecting to WhatsApp.');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] selection:bg-[#E02424] selection:text-white flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#E02424] text-white font-black text-xl tracking-tighter">
              MW&P
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter hidden sm:inline-block">
              <span className="text-[#E02424]">Mike's</span> Wrap & Pack
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-bold uppercase tracking-widest text-xs">
            <a href="#products" className="hover:text-[#E02424] transition-colors">Catalog</a>
            <a href="#delivery" className="hover:text-[#E02424] transition-colors">Delivery</a>
            <a href="#customer-corner" className="hover:text-[#E02424] transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-[#E02424] transition-colors">Contact</a>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <div className="flex items-center gap-4 cursor-pointer group">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-black transition-colors">Quote Cart</span>
                    <span className="text-sm font-black">{cartItemsCount} Items</span>
                  </div>
                  <div className="bg-[#E02424] text-white p-3 group-hover:bg-black transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:max-w-md flex flex-col p-6 sm:p-8 border-l border-gray-100 shadow-2xl">
                <SheetHeader className="mb-6 border-b border-gray-100 pb-4 text-left">
                  <SheetTitle className="text-2xl font-black uppercase tracking-tight">Quote Summary</SheetTitle>
                  <SheetDescription className="hidden">
                    Review the items you want to quote. We'll finalize pricing and delivery via WhatsApp.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 -mx-2 px-2">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                      <ShoppingCart className="h-12 w-12 opacity-50" />
                      <p className="font-bold text-xs uppercase tracking-widest">Cart is empty</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-4 items-center bg-gray-50/80 p-3 rounded-2xl border border-gray-100 mb-2">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl shadow-sm bg-white shrink-0" />
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className="font-black uppercase leading-tight truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase truncate">{item.product.specs}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden group shadow-sm">
                                <button type="button" className="px-3 py-1 text-black hover:bg-white hover:text-[#E02424] font-black transition-colors bg-gray-100" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                                <span className="text-sm w-8 text-center font-black bg-white text-black py-1">{item.quantity}</span>
                                <button type="button" className="px-3 py-1 text-black hover:bg-white hover:text-[#E02424] font-black transition-colors bg-gray-100" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                              </div>
                            </div>
                          </div>
                          <button 
                            className="text-gray-400 font-black uppercase text-[10px] tracking-widest cursor-pointer hover:text-[#E02424] transition-colors p-2 shrink-0" 
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6 mt-4 pb-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-full bg-[#E02424] text-white py-4 px-6 text-sm font-black uppercase tracking-widest hover:bg-black hover:scale-[1.02] shadow-xl transition-all rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={cart.length === 0}>
                        Finalize Inquiry
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] border border-gray-100 rounded-2xl shadow-2xl">
                      <DialogHeader className="border-b border-gray-100 pb-4 mb-4">
                        <DialogTitle className="text-xl font-black uppercase">Finalize Inquiry</DialogTitle>
                        <DialogDescription className="hidden">
                          Provide your details, and Mike will get back to you.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleQuoteSubmit} className="space-y-4">
                        <div>
                          <input id="name" name="name" placeholder="NAME / BUSINESS" required className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:border-[#E02424] focus:ring-1 focus:ring-[#E02424]" />
                        </div>
                        <div>
                          <input id="phone" name="phone" type="tel" placeholder="WHATSAPP / PHONE" required className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:border-[#E02424] focus:ring-1 focus:ring-[#E02424]" />
                        </div>
                        <div>
                          <textarea id="location" name="location" placeholder="DELIVERY LOCATION" required className="w-full border border-gray-200 rounded-xl p-3 text-xs font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:border-[#E02424] focus:ring-1 focus:ring-[#E02424] h-20 resize-none" />
                        </div>
                        <button type="submit" className="w-full bg-[#E02424] text-white rounded-xl py-4 mt-2 font-black uppercase tracking-widest text-xs hover:bg-black transition-colors flex items-center justify-center gap-2">
                          <WhatsAppIcon className="h-4 w-4" />
                          Send Quote via WhatsApp
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </SheetContent>
            </Sheet>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E02424] px-1.5 py-0.5 text-[10px] text-white font-black rounded-none">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <button className="text-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white px-4 py-4 space-y-2 absolute w-full top-[64px] z-40">
            <a href="#products" className="block text-[#1A1A1A] font-black uppercase text-sm py-2 tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Catalog</a>
            <a href="#delivery" className="block text-[#1A1A1A] font-black uppercase text-sm py-2 tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Delivery</a>
            <a href="#customer-corner" className="block text-[#1A1A1A] font-black uppercase text-sm py-2 tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
            <a href="#contact" className="block text-[#1A1A1A] font-black uppercase text-sm py-2 tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col bg-black">
        {/* Hero Section */}
        <section className="bg-black text-white pt-24 pb-32 px-4 md:px-8 border-b-2 border-black flex-1">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="bg-[#E02424] text-white px-3 py-1 text-[10px] uppercase font-black tracking-widest">
                Wholesale & Retail
              </span>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[1]">
                Daily <span className="text-[#E02424]">Disposables.</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-wider text-gray-400 max-w-lg leading-relaxed">
                Plates, cups, foils, and containers for your restaurant, event, or everyday hustle. Quality supplies with honest flat-rate delivery.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-8">
                <button className="bg-white text-black py-4 px-8 text-sm font-black uppercase tracking-widest hover:bg-[#E02424] hover:text-white transition-colors" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Catalog
                </button>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <CheckCircle2 className="h-4 w-4 text-[#E02424]" />
                  Fast Turnaround
                </div>
              </div>
            </div>
            <div className="relative order-first md:order-last mb-12 md:mb-0">
               <div className="absolute inset-0 bg-[#E02424] transform translate-x-4 translate-y-4 rounded-xl"></div>
               <img 
                 src="/aluminium-foil.jpg?auto=compress&cs=tinysrgb&w=800" 
                 alt="Stack of restaurant takeout containers" 
                 className="relative z-10 w-full object-cover aspect-[4/3] rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:-translate-x-1" 
               />
            </div>
          </div>
        </section>

        {/* Product Catalog */}
        <section id="products" className="py-24 px-4 md:px-8 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-[#1A1A1A]">Daily Disposables</h2>
              </div>
              <div className="flex gap-2">
                <span className="bg-black text-white rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest">ALL</span>
                <span className="border border-gray-300 rounded-full text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer">PLATES</span>
                <span className="border border-gray-300 rounded-full text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer">FOILS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden group bg-white hover:shadow-xl transition-all duration-300">
                  <div className="bg-gray-100 aspect-square flex items-center justify-center relative overflow-hidden border-b border-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] shadow-sm">
                      In Stock
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="font-black uppercase text-xl leading-tight text-[#1A1A1A]">{product.name}</h3>
                      <p className="text-[11px] text-gray-500 mt-2 uppercase font-bold tracking-wider">
                        {product.specs}
                      </p>
                    </div>
                    <button 
                      className="mt-6 w-full bg-[#E02424] text-white rounded-xl py-4 text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-sm"
                      onClick={() => addToCart(product)}
                    >
                      Add to Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section id="delivery" className="py-24 px-4 md:px-8 bg-black text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="border border-gray-800 rounded-3xl p-8 md:p-12 relative bg-gray-900/50 backdrop-blur-sm">
              <div className="absolute -top-6 -right-6 bg-[#E02424] w-12 h-12 rounded-full shadow-lg flex items-center justify-center">
                 <Truck className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Delivery Logistics</h2>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-8 leading-relaxed">
                    We focus on getting your supplies to you exactly when you need them. Simple, transparent delivery terms for local businesses.
                  </p>
                  <ul className="space-y-6">
                    <li className="flex flex-col border-b border-gray-800 pb-4">
                      <span className="text-[10px] font-black text-[#E02424] mb-2">COVERAGE:</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Greater Metro Area. Up to 50 miles.</span>
                    </li>
                    <li className="flex flex-col border-b border-gray-800 pb-4">
                      <span className="text-[10px] font-black text-[#E02424] mb-2">RATES:</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Flat rate UGX 50,000. Free on quotes &gt; UGX 500,000.</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-[10px] font-black text-[#E02424] mb-2">LEAD TIMES:</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Standard 24-48 HRS turnaround.</span>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:flex flex-col gap-4">
                   <div className="bg-gray-800 aspect-video border-2 border-gray-600 relative overflow-hidden group">
                     <img 
                      src="/logistics.jpg?auto=format&fit=crop&q=80&w=800" 
                      alt="Delivery box" 
                      className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:mix-blend-normal group-hover:grayscale-0 transition-all duration-700"
                     />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Corner */}
        <section id="customer-corner" className="py-24 px-4 md:px-8 bg-gray-50 border-b-2 border-black">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-12 text-[#1A1A1A] border-b-4 border-black inline-block pb-2">Products in Action</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              <div className="aspect-[4/3] border border-gray-200 relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <img src="/heavy-duty.jpg" alt="BBQ Event" className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
              </div>
              <div className="aspect-[4/3] border border-gray-200 relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <img src="/napkin.jpg" alt="Takeout food" className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
              </div>
              <div className="aspect-[4/3] border border-gray-200 relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <img src="/clear-plastic-cups.jpg" alt="Restaurant setting" className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
              </div>
              <div className="aspect-[4/3] border border-gray-200 relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <img src="/product-four.jpg" alt="Catering tray" className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
              </div>
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-[#E02424] mb-8">Client Testimonials</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Sarah J.", role: "Cafe Owner", text: "Mike's cups and foils are top-notch. The delivery is always on time, which is crucial for my morning rush." },
                { name: "David T.", role: "Event Caterer", text: "I've been ordering the heavy-duty plates for all our corporate events. Never had a single issue. Excellent service." },
                { name: "Elena R.", role: "Food Truck", text: "The flat rate delivery and simple quote process on WhatsApp saves me hours every week. Highly recommended!" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm relative flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-sm font-bold tracking-wider text-[#1A1A1A] mb-8">"{testimonial.text}"</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-black uppercase text-[#1A1A1A]">{testimonial.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="py-24 px-4 md:px-8 bg-white border-b border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#1A1A1A] mb-6">Let's Talk Business.</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12 leading-relaxed">
                  Have a special request, need bulk pricing, or just have a question? Reach out to Mike directly.
                </p>
                <div className="space-y-8 border-l-4 border-red-500 pl-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-[#E02424] font-black uppercase tracking-widest mb-2">Direct Line</p>
                    <p className="text-2xl font-black text-[#1A1A1A]">+256 757 206 966</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[10px] text-[#E02424] font-black uppercase tracking-widest mb-2">Warehouse Location</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A]">123 Packaging Way, Suite 100<br/>Business District, ST 12345</p>
                  </div>
                   <div className="flex flex-col">
                    <p className="text-[10px] text-[#E02424] font-black uppercase tracking-widest mb-2">Email</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A]">orders@mikespack.com</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 text-[#1A1A1A]">
                <h3 className="text-xl font-black uppercase tracking-tight mb-8">Send an Inquiry</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Inquiry sent! We'll get back to you shortly."); e.currentTarget.reset(); }}>
                  <div>
                    <input id="inquiry-name" placeholder="NAME / BUSINESS" required className="w-full border border-gray-200 p-4 text-xs font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:border-[#E02424] focus:ring-1 focus:ring-[#E02424] rounded-xl bg-gray-50/50" />
                  </div>
                  <div>
                    <input id="inquiry-contact" placeholder="EMAIL OR PHONE" required className="w-full border border-gray-200 p-4 text-xs font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:border-[#E02424] focus:ring-1 focus:ring-[#E02424] rounded-xl bg-gray-50/50" />
                  </div>
                  <div>
                    <textarea id="inquiry-message" placeholder="MESSAGE / DETAILS" rows={4} required className="w-full border border-gray-200 p-4 text-xs font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:border-[#E02424] focus:ring-1 focus:ring-[#E02424] rounded-xl resize-none bg-gray-50/50" />
                  </div>
                  <button type="submit" className="w-full bg-black text-white py-4 mt-2 font-black uppercase tracking-widest text-xs hover:bg-[#E02424] transition-colors rounded-xl shadow-sm">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/256757206966" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center group"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <footer className="bg-gray-50 text-gray-900 px-4 py-8 md:px-8 border-t border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <span className="text-[#E02424] font-black uppercase text-[10px]">Direct:</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">+256 757 206 966</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#E02424] font-black uppercase text-[10px]">Email:</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">orders@mikespack.com</span>
            </div>
          </div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Mike's Wrap & Pack Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
