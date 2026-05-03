"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Factory,
  Menu,
  MessageCircle,
  SearchCheck,
  Send,
  Shirt,
  Sparkles,
  Star,
  X,
} from "lucide-react";

type Category = "All" | "Track Pants" | "T-Shirts" | "Embroidery Work";

const navItems = ["Home", "About", "Collection", "Lookbook", "Contact"];
const whatsappNumber = "918758367118";
const accentColor = "#D4AF37";

const products = [
  { id: 1, name: "Royal Stitch Track Pants", category: "Track Pants" as Category, tag: "BEST", image: "https://images.unsplash.com/photo-1506629905607-d405b7a40db9?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, name: "Bold Crest Tee", category: "T-Shirts" as Category, tag: "NEW", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, name: "Threadline Signature Embroidery", category: "Embroidery Work" as Category, tag: "NEW", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, name: "Metro Fit Track Pants", category: "Track Pants" as Category, tag: "BEST", image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, name: "Noir Line Tee", category: "T-Shirts" as Category, tag: "NEW", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, name: "Precision Crest Work", category: "Embroidery Work" as Category, tag: "BEST", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80" },
];

const reviews = [
  { name: "Arjun Mehta", city: "Mumbai", text: "The embroidery finish is outstanding. Premium fit and quick delivery." },
  { name: "Rohan Singh", city: "Delhi", text: "Exactly the modern style I wanted. Fabric quality feels elite." },
  { name: "Aditya Sharma", city: "Bengaluru", text: "Ordered through WhatsApp and got a smooth experience end-to-end." },
];

const processSteps = [
  { title: "Inquiry & Design Discussion", subtitle: "Requirement & design discussion", text: "Share your requirement, design, fabric type, quantity, and deadline. We guide you with the best embroidery solution.", icon: SearchCheck },
  { title: "Order Confirmation", subtitle: "Final approval & payment", text: "Final design approval, pricing confirmation, and advance payment to lock the order.", icon: ClipboardCheck },
  { title: "Embroidery Production", subtitle: "Embroidery work in progress", text: "High-quality embroidery work done using precision machines and skilled craftsmanship.", icon: Factory },
  { title: "Dispatch Order", subtitle: "Delivery to your doorstep ", text: "Final inspection, secure packing, and on-time dispatch to your location.", icon: Send },
];

const sectionMotion = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const sections = navItems.map((item) => document.getElementById(item.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const found = navItems.find((item) => item.toLowerCase() === entry.target.id);
          if (found) setActiveSection(found);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.1 },
    );
    sections.forEach((section) => section && observer.observe(section));
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, item: string) => {
    event.preventDefault();
    setActiveSection(item);
    setMenuOpen(false);
    scrollToSection(item.toLowerCase());
  };

  const handleOrderSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message =
      `Hello Estich Creative Embroidery!%0A%0A` +
      `Name: ${formData.get("name")}%0A` +
      `Phone: ${formData.get("phone")}%0A` +
      `Product: ${formData.get("product")}%0A` +
      `Size: ${formData.get("size")}%0A` +
      `Color: ${formData.get("color")}%0A` +
      `Quantity: ${formData.get("quantity")}%0A` +
      `Address: ${formData.get("address")}%0A` +
      `Notes: ${formData.get("notes")}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-black text-white">
      <header
        className={`fixed inset-x-0 top-3 z-50 border-b transition-all duration-300 ${scrolled ? "bg-black/95 top-0 shadow-2xl backdrop-blur-lg" : "top-0border-transparent bg-transparent"}`}
        style={{ borderColor: scrolled ? `${accentColor}66` : "transparent" }}
      >
        <div className="site-padding mx-auto flex max-w-7xl items-center justify-between py-4">
          <a href="#home" className="text-base font-extrabold tracking-[0.16em] md:text-xl"><span style={{ color: accentColor }}>Estich</span> Creative Embroidery</a>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={(event) => handleNavClick(event, item)} className={`relative text-sm tracking-[0.16em] ${activeSection === item ? "text-white" : "text-white/75"}`} style={{ color: activeSection === item ? accentColor : undefined }}>
                {item}
                {activeSection === item && <motion.span layoutId="active-nav" className="absolute -bottom-2 left-0 h-[1.5px] w-full" style={{ backgroundColor: accentColor }} />}
              </a>
            ))}
          </nav>
          <button onClick={() => setMenuOpen((value) => !value)} className="border p-2 md:hidden" style={{ borderColor: accentColor, color: accentColor }} aria-label="Toggle menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          <motion.a href="#contact" whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(212,175,55,0.4)" }} onClick={(event) => handleNavClick(event, "Contact")} className="hidden border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] md:inline-flex" style={{ borderColor: accentColor, color: accentColor }}>Order Now</motion.a>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-t bg-black md:hidden" style={{ borderColor: `${accentColor}55` }}>
              <div className="site-padding mx-auto flex max-w-7xl flex-col py-4">
                {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={(event) => handleNavClick(event, item)} className="border-b border-white/10 py-3 text-sm uppercase tracking-[0.18em]" style={{ color: activeSection === item ? accentColor : "#ffffffd9" }}>{item}</a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="relative min-h-screen overflow-hidden">
          <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1920&q=80" alt="Premium men fashion" className="absolute inset-0 h-full w-full object-cover" />
          <motion.div initial={{ scale: 1 }} animate={{ scale: 1.06 }} transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }} className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#2C2E32]/80 to-[#2C2E32]" />
          <div className="site-padding relative mx-auto flex min-h-screen max-w-7xl items-center pt-28 pb-16">
            <motion.div variants={sectionMotion} initial="hidden" animate="show" className="max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/75">Premium Men&apos;s Embroidery Studio</p>
              <h1 className="text-5xl font-black leading-tight tracking-[0.08em] sm:text-6xl md:text-[80px]">STITCH WITH <span style={{ color: accentColor }}>CONFIDENCE</span></h1>
              <p className="mt-6 max-w-xl text-sm text-white/85 md:text-lg">Crafted for the modern man: premium embroidery, elevated streetwear, and tailored silhouettes built to make every outfit stand out.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("collection")} className="px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-black" style={{ backgroundColor: accentColor }}>Shop Collection</motion.button>
                <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em]"><MessageCircle className="h-4 w-4" style={{ color: accentColor }} />Order on WhatsApp</motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="overflow-hidden py-3 text-black" style={{ backgroundColor: accentColor }}>
          <motion.div initial={{ x: "0%" }} animate={{ x: "-50%" }} transition={{ duration: 22, ease: "linear", repeat: Infinity }} className="flex w-max gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.2em]">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-10"><span>Premium Quality</span><span>+</span><span>WhatsApp Order</span><span>+</span><span>EST. 2026</span><span>+</span><span>Embroidery Design</span><span>+</span><span>Track Pants</span><span>+</span><span>T-Shirts</span></div>
            ))}
          </motion.div>
        </section>

        <motion.section id="about" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="site-padding mx-auto grid max-w-7xl gap-10 bg-[#1c1c1c] py-24 md:grid-cols-2">
          <div className="overflow-hidden border" style={{ borderColor: `${accentColor}66` }}><img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80" alt="Embroidery detail craftsmanship" className="h-full w-full object-cover" /></div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em]" style={{ color: accentColor }}>Our Story</p>
            <h2 className="text-4xl font-bold tracking-[0.08em] text-white md:text-6xl">BUILT FOR THE <span style={{ color: accentColor }}>MODERN MAN</span></h2>
            <p className="mt-6 text-white/80">Estich Creative Embroidery combines handcrafted precision with modern menswear aesthetics. Each piece is designed to feel confident, luxurious, and sharp in every setting.</p>
            <div className="mt-8 space-y-5">{["Premium Fabric", "Modern Fit", "Bold Style"].map((feature) => (<div key={feature}><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5" style={{ color: accentColor }} /><span className="tracking-wide">{feature}</span></div><div className="mt-3 h-px w-full" style={{ backgroundColor: `${accentColor}88` }} /></div>))}</div>
          </div>
        </motion.section>

        <section className="bg-black py-28">
  <div className="site-padding mx-auto max-w-7xl">
    
    {/* Heading */}
    <div className="mb-14">
      <h3 className="text-3xl font-black md:text-5xl">
        Our <span style={{ color: accentColor }}>Embroidery Work Process</span>
      </h3>
      <p className="mt-4 max-w-3xl text-white/75 text-lg">
        Inquiry, confirmation, production, and dispatch – a clear process for premium delivery.
      </p>
    </div>

    {/* Process Cards */}
    <div className="grid gap-8 md:grid-cols-2">
      {processSteps.map((item, index) => (
        <motion.div
          key={item.title}
          whileHover={{ y: -8, boxShadow: "0px 25px 40px rgba(0,0,0,0.45)" }}
          className="
            min-h-[260px]
            rounded-2xl
            border border-dashed border-white/30
            bg-[#141414]
            p-10
            transition-all
          "
        >
          <div className="flex items-start gap-5">
            
            {/* Step Number */}
            <div
              className=" items-center justify-center  text-base font-bold"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {index + 1}
            </div>

            {/* Content */}
            <div>
              <p className="text-xl font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-white/65">{item.subtitle}</p>

              <item.icon
                className="mt-4 h-6 w-6"
                style={{ color: accentColor }}
              />

              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {item.text}
              </p>
            </div>

          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>

        <section className="bg-[#1c1c1c] py-24">
          <div className="site-padding mx-auto max-w-7xl">
            <h3 className="text-3xl font-black md:text-5xl">Our <span style={{ color: accentColor }}>Happy Clients</span></h3>
            <p className="mt-3 text-white/70">Trusted by brands and teams across categories.</p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">{["NIKE", "PUMA", "ADIDAS", "LEVIS", "ZARA", "H&M", "La coste", "U.S Polo Assian"].map((name) => (<div key={name} className="flex h-24 items-center justify-center border border-white/20 bg-black text-lg font-extrabold tracking-[0.08em] text-white/90">{name}</div>))}</div>
          </div>
        </section>

        <motion.section id="collection" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="site-padding mx-auto max-w-7xl bg-black py-24">
          <h2 className="text-3xl font-black tracking-[0.14em] md:text-5xl">THE <span style={{ color: accentColor }}>COLLECTION</span></h2>
          <div className="mt-8 flex flex-wrap gap-3">{(["All", "Track Pants", "T-Shirts", "Embroidery Work"] as Category[]).map((category) => (<button key={category} onClick={() => setActiveCategory(category)} className={`border px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] ${activeCategory === category ? "text-black" : "border-white/25 text-white/80 hover:text-white"}`} style={activeCategory === category ? { borderColor: accentColor, backgroundColor: accentColor } : undefined}>{category}</button>))}</div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <motion.article key={product.id} whileHover={{ y: -6 }} className="group overflow-hidden border border-white/20 bg-black">
                  <div className="relative h-80 overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <span className="absolute left-4 top-4 bg-black/90 px-3 py-1 text-[10px] font-bold tracking-[0.14em]" style={{ color: accentColor }}>{product.tag}</span>
                    <button onClick={() => scrollToSection("contact")} className="absolute bottom-4 left-1/2 -translate-x-1/2 border border-black px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundColor: accentColor }}>Order Now</button>
                  </div>
                  <div className="flex items-center justify-between p-5"><div><p className="text-base font-semibold">{product.name}</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/70">{product.category}</p></div><Shirt className="h-5 w-5" style={{ color: accentColor }} /></div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        <motion.section id="lookbook" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="bg-[#1c1c1c] py-32">
          <div className="site-padding mx-auto max-w-7xl">
            <h2 className="text-3xl font-black tracking-[0.12em] md:text-5xl">REAL <span style={{ color: accentColor }}>REVIEWS</span></h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">{reviews.map((review) => (<motion.article key={review.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ y: -5, boxShadow: "0px 0px 24px rgba(212,175,55,0.2)" }} className="border border-white/20 bg-[#1a1a1a] px-6 py-10"><div className="mb-4 flex gap-1">{Array.from({ length: 5 }).map((_, index) => (<Star key={index} className="h-4 w-4" style={{ fill: accentColor, color: accentColor }} />))}</div><p className="text-white/85">{review.text}</p><p className="mt-5 text-sm font-semibold" style={{ color: accentColor }}>{review.name} - {review.city}</p></motion.article>))}</div>
          </div>
        </motion.section>

        <motion.section id="contact" variants={sectionMotion} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="site-padding mx-auto grid max-w-7xl gap-8 bg-black py-24 md:grid-cols-2">
          <div className="overflow-hidden border" style={{ borderColor: `${accentColor}55` }}><img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80" alt="Lifestyle men fashion shoot" className="h-full w-full object-cover" /></div>
          <form onSubmit={handleOrderSubmit} className="border bg-black p-6 text-white shadow-2xl md:p-8" style={{ borderColor: `${accentColor}88` }}>
            <p className="text-xs uppercase tracking-[0.24em]" style={{ color: accentColor }}>Contact</p>
            <h4 className="mt-2 text-2xl font-black tracking-[0.1em] text-white md:text-4xl">ORDER VIA <span style={{ color: accentColor }}>WHATSAPP</span></h4>
            <p className="mt-1 text-white/40 md:text-sm">Fill in your details and send your inquiry directly to +91 8758367118.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><InputField name="name" placeholder="Full Name" /><InputField name="phone" placeholder="Phone Number" /><InputField name="product" placeholder="Product Select" /><SizeField /><InputField name="color" placeholder="Color" /><InputField name="quantity" placeholder="Quantity" /></div>
            <textarea name="address" required placeholder="Delivery Address" className="mt-3 h-24 w-full border border-white/30 bg-[#151515] px-4 py-3 text-sm text-white outline-none" />
            <textarea name="notes" placeholder="Notes" className="mt-3 h-20 w-full border border-white/30 bg-[#151515] px-4 py-3 text-sm text-white outline-none" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-black shadow-lg"><MessageCircle className="h-4 w-4" />Send Order on WhatsApp</motion.button>
          </form>
        </motion.section>
      </main>

      <footer className="border-t bg-black" style={{ borderColor: `${accentColor}66` }}>
        <div className="site-padding mx-auto grid max-w-7xl items-start gap-8 py-20 text-center md:grid-cols-4 md:text-left">
          <div className="flex h-full flex-col justify-between"><h3 className="text-lg font-bold tracking-[0.08em]" style={{ color: accentColor }}>Estich Creative Embroidery</h3><p className="mt-4 text-sm text-white/75">Premium men&apos;s fashion with confident design and precision-crafted embroidery.</p></div>
          <div className="flex h-full flex-col justify-between"><p className="text-xs uppercase tracking-[0.16em]" style={{ color: accentColor }}>Quick Links</p><div className="mt-4 space-y-2 text-sm">{navItems.map((item) => (<a key={item} href={`#${item.toLowerCase()}`} onClick={(event) => handleNavClick(event, item)} className="block">{item}</a>))}</div></div>
          <div className="flex h-full flex-col justify-between"><p className="text-xs uppercase tracking-[0.16em]" style={{ color: accentColor }}>Contact</p><div className="mt-4 space-y-2 text-sm text-white/85"><p>Phone: +91 8758367118</p><p>Email: estichembroidery@gmail.com</p><p>Address: second floor 210, sadguru plaza.</p><p>near valinath chowk, katargam 395004.</p></div></div>
          <div className="flex h-full flex-col justify-between"><p className="text-xs uppercase tracking-[0.16em]" style={{ color: accentColor }}>Order Directly</p><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 border px-5 py-2 text-sm md:justify-start" style={{ borderColor: accentColor, color: accentColor }}>WhatsApp Order <ArrowUpRight className="h-4 w-4" /></a><p className="mt-4 text-sm text-white/80">Contact us and connect with +91 8758367118. Send inquiry on WhatsApp.</p><div className="mt-6 flex items-center justify-center gap-3 md:justify-start">{[MessageCircle, Sparkles, CircleDot].map((Icon, index) => (<motion.a key={index} whileHover={{ y: -3 }} href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="border border-white/40 p-2 text-white/80"><Icon className="h-4 w-4" /></motion.a>))}</div></div>
        </div>
        <div className="site-padding border-t py-8 text-center text-xs text-white/70" style={{ borderColor: `${accentColor}33` }}>© 2026 Estich Creative Embroidery. All rights reserved.</div>
      </footer>

      <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl"><MessageCircle className="h-7 w-7" /></motion.a>
    </div>
  );
}

function InputField({ name, placeholder }: { name: string; placeholder: string }) {
  return <input name={name} required placeholder={placeholder} className="w-full border border-white/30 bg-[#151515] px-4 py-3 text-sm text-white outline-none" />;
}

function SizeField() {
  return (
    <select name="size" required defaultValue="" className="w-full border border-white/30 bg-[#151515] px-4 py-3 text-sm text-white outline-none">
      <option value="" disabled>Size</option>
      {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
  );
}
