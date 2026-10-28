import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "Everyday Tote", category: "Accessories", price: 1850, oldPrice: 2200, tag: "Bestseller", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85", description: "A roomy everyday tote designed for work, campus, and weekend plans." },
  { id: 2, name: "Classic Sneakers", category: "Shoes", price: 4200, oldPrice: 4800, tag: "Popular", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", description: "Comfortable, versatile sneakers that make casual outfits feel complete." },
  { id: 3, name: "Minimal Watch", category: "Accessories", price: 3500, oldPrice: null, tag: "New", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85", description: "A clean, timeless watch with a minimal face and everyday styling." },
  { id: 4, name: "Soft Knit Sweater", category: "Clothing", price: 2950, oldPrice: 3300, tag: "Sale", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85", description: "A soft knit layer for relaxed days and cool evenings." },
  { id: 5, name: "Everyday Backpack", category: "Accessories", price: 2650, oldPrice: null, tag: "", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85", description: "A practical backpack with a simple silhouette and space for daily essentials." },
  { id: 6, name: "Cozy Home Mug", category: "Home", price: 950, oldPrice: null, tag: "New", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85", description: "A ceramic mug for your morning coffee, evening tea, or desk setup." },
  { id: 7, name: "Linen Shirt", category: "Clothing", price: 2250, oldPrice: 2500, tag: "", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85", description: "An easy-to-style shirt with a relaxed fit for everyday wear." },
  { id: 8, name: "Daily Sunglasses", category: "Accessories", price: 1450, oldPrice: null, tag: "", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85", description: "A classic pair of sunglasses to finish your look." }
];

const money = (amount) => `Rs ${amount.toLocaleString("en-PK")}`;

function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <div className="announcement">A little something for you — free delivery on orders over Rs 5,000</div>
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setMenuOpen(false)}><span className="brand-mark">S</span> ShopEase<span className="brand-dot">.</span></Link>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={() => setMenuOpen(false)}>Shop</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
      </nav>
      <Link className="cart-link" to="/cart" aria-label="Shopping cart">Bag <span>{cartCount}</span></Link>
    </header>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div><Link className="brand footer-brand" to="/"><span className="brand-mark">S</span> ShopEase<span className="brand-dot">.</span></Link><p>Thoughtful finds for your everyday life.</p></div>
    <div className="footer-links"><Link to="/products">Shop products</Link><Link to="/about">Our story</Link><Link to="/contact">Contact us</Link></div>
    <small>© {new Date().getFullYear()} ShopEase. Student project demo.</small>
  </footer>;
}

function ProductCard({ product, addToCart }) {
  return <article className="product-card">
    <Link to={`/product/${product.id}`} className="product-image-wrap">
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <img src={product.image} alt={product.name} loading="lazy" />
    </Link>
    <div className="product-info">
      <span className="product-category">{product.category}</span>
      <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
      <div className="price-row"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
      <button className="button button-dark button-small full-button" onClick={() => addToCart(product)}>Add to bag +</button>
    </div>
  </article>;
}

function Home({ addToCart }) {
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-line"></span> YOUR EVERYDAY, ELEVATED</span>
        <h1>Good things.<br /><em>Every day.</em></h1>
        <p>Discover useful, beautiful finds made to fit your life. Simple style, thoughtful details, and little things that make a difference.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/products">Explore the collection <span>↗</span></Link><Link className="text-link" to="/about">Our story <span>→</span></Link></div>
        <div className="hero-note"><span className="note-stars">★★★★★</span><span>Loved by everyday explorers</span></div>
      </div>
      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="Bright, modern shopping boutique" />
        <div className="floating-note"><span>THE EVERYDAY EDIT</span><strong>Find your<br />new favourite.</strong><Link to="/products">Shop now ↗</Link></div>
        <div className="hero-circle">GOOD<br />FINDS<br /><span>✳</span></div>
      </div>
    </section>
    <section className="benefits">
      <div><span>✳</span><strong>Thoughtful picks</strong><small>Useful things, chosen well</small></div>
      <div><span>↗</span><strong>Easy shopping</strong><small>A smooth, simple experience</small></div>
      <div><span>♡</span><strong>Everyday value</strong><small>Good finds at fair prices</small></div>
    </section>
    <section className="section featured-section">
      <div className="section-heading"><div><span className="eyebrow">A FEW GOOD THINGS</span><h2>Our favourites</h2><p>Meet the pieces everyone keeps coming back to.</p></div><Link className="text-link" to="/products">View all products ↗</Link></div>
      <div className="product-grid">{PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div>
    </section>
    <section className="promo">
      <div><span className="eyebrow">A BETTER KIND OF BROWSING</span><h2>Make room for<br /><em>little joys.</em></h2><p>From daily essentials to just-because treats, find something that feels like you.</p><Link to="/products" className="button button-light">Find your thing <span>↗</span></Link></div>
      <div className="promo-image"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" alt="Curated everyday fashion pieces" /></div>
    </section>
    <Newsletter />
  </main>;
}

function Products({ addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  const filtered = useMemo(() => {
    let items = PRODUCTS.filter(p => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [search, category, sort]);
  return <main className="page-shell">
    <div className="page-intro"><span className="eyebrow">THE SHOP</span><h1>Find your <em>everyday.</em></h1><p>Good things for wherever life takes you.</p></div>
    <div className="shop-toolbar"><div className="category-pills">{categories.map(c => <button key={c} className={category === c ? "pill active" : "pill"} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="shop-controls"><input aria-label="Search products" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} /><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>
    <p className="results-count">{filtered.length} products</p>
    {filtered.length ? <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div> : <div className="empty-state"><h2>No products found</h2><p>Try another search or category.</p><button className="button button-dark" onClick={() => {setSearch(""); setCategory("All");}}>Clear filters</button></div>}
  </main>;
}

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const navigate = useNavigate();
  if (!product) return <div className="empty-state"><h2>Product not found</h2><Link to="/products" className="button button-dark">Back to shop</Link></div>;
  return <main className="detail-shell"><button className="back-link" onClick={() => navigate(-1)}>← Back</button><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><span className="eyebrow">{product.category.toUpperCase()}</span><h1>{product.name}</h1><div className="detail-price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><p>{product.description}</p><p className="stock-note">✓ Available for order</p><button className="button button-dark" onClick={() => addToCart(product)}>Add to bag +</button><div className="detail-perks"><span>✓ Easy demo checkout</span><span>✓ Cart saved in this browser</span></div></div></div></main>;
}

function Cart({ cart, changeQuantity, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <main className="page-shell cart-shell"><div className="page-intro compact"><span className="eyebrow">YOUR SELECTION</span><h1>Shopping <em>bag.</em></h1><p>All the good things you picked out.</p></div>
    {!cart.length ? <div className="empty-state"><div className="empty-icon">♡</div><h2>Your bag is taking a little break.</h2><p>Add something you love and it will show up here.</p><Link to="/products" className="button button-dark">Start shopping ↗</Link></div> :
    <div className="cart-layout"><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><Link to={`/product/${item.id}`} className="product-name">{item.name}</Link><span>{item.category}</span><strong>{money(item.price)}</strong><button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button></div><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">+</button></div><strong className="line-total">{money(item.price * item.quantity)}</strong></div>)}</div>
      <aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{subtotal >= 5000 ? "FREE" : money(subtotal === 0 ? 0 : 250)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(subtotal + (subtotal >= 5000 || subtotal === 0 ? 0 : 250))}</strong></div><Link to="/checkout" className="button button-dark full-button">Continue to checkout ↗</Link><p className="summary-note">This is a student demo. No real payment is taken.</p></aside>
    </div>}
  </main>;
}

function Checkout({ cart, clearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (subtotal >= 5000 || subtotal === 0 ? 0 : 250);
  function handleSubmit(e) {
    e.preventDefault();
    if (!cart.length) return;
    setOrderNumber(`SB${Date.now().toString().slice(-6)}`);
    setOrderPlaced(true);
    clearCart();
  }
  if (orderPlaced) return <main className="empty-state success-state"><div className="success-icon">✓</div><span className="eyebrow">ORDER CONFIRMED</span><h1>Thank you for your order!</h1><p>Your demo order number is <strong>{orderNumber}</strong>.</p><p>This is a project demonstration; no payment or real shipment has been arranged.</p><Link className="button button-dark" to="/products">Continue shopping</Link></main>;
  if (!cart.length) return <main className="empty-state"><h2>Your bag is empty</h2><p>Add products before going to checkout.</p><Link to="/products" className="button button-dark">Shop products</Link></main>;
  return <main className="page-shell"><div className="page-intro compact"><span className="eyebrow">ALMOST YOURS</span><h1>Quick <em>checkout.</em></h1><p>Enter your details to place a demo order.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={handleSubmit}><h2>Contact & delivery</h2><label>Full name<input required name="name" placeholder="Your full name" /></label><label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label><label>Phone number<input required type="tel" name="phone" placeholder="03XX XXXXXXX" /></label><label>Delivery address<textarea required name="address" rows="3" placeholder="House, street, city" /></label><label>Payment method<select name="payment"><option>Cash on delivery (demo)</option><option>Pay at pickup (demo)</option></select></label><button className="button button-dark full-button" type="submit">Place demo order · {money(total)}</button></form><aside className="order-summary"><h2>Your order</h2>{cart.map(item => <div className="checkout-line" key={item.id}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>)}<div><span>Delivery</span><strong>{subtotal >= 5000 ? "FREE" : money(250)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><p className="summary-note">Demo only: this form does not collect payment or send data to a server.</p></aside></div></main>;
}

function About() {
  return <main className="page-shell about-page"><div className="page-intro"><span className="eyebrow">A LITTLE ABOUT US</span><h1>Everyday things,<br /><em>thoughtfully found.</em></h1><p>We believe shopping should feel simple, useful, and a little joyful.</p></div><div className="about-layout"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="A welcoming modern shop" /><div><span className="eyebrow">OUR IDEA</span><h2>Less fuss.<br />More good stuff.</h2><p>ShopEase is a student-built e-commerce demo made to explore the online shopping experience. It brings together everyday accessories, clothing, shoes, and home finds in one friendly place.</p><p>Our focus is clear navigation, product discovery, a working shopping cart, and a simple demo checkout.</p><Link to="/products" className="button button-dark">Explore products ↗</Link></div></div><div className="values-grid"><div><span>01</span><h3>Keep it simple</h3><p>Shopping should be clear and easy to use.</p></div><div><span>02</span><h3>Choose thoughtfully</h3><p>Useful finds with a timeless feel.</p></div><div><span>03</span><h3>Make it welcoming</h3><p>A friendly experience on every screen.</p></div></div></main>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  function handleSubmit(e) { e.preventDefault(); setSent(true); }
  return <main className="page-shell contact-page"><div className="page-intro"><span className="eyebrow">WE'RE HERE TO HELP</span><h1>Say <em>hello.</em></h1><p>Questions, ideas, or just want to get in touch? Send a demo message below.</p></div><div className="contact-layout"><div className="contact-note"><div className="contact-symbol">✳</div><h2>Let's talk.</h2><p>This contact form is for demonstration. It shows a confirmation message but does not send an email to a server.</p><div className="contact-detail"><span>Email</span><strong>hello@shopease.example</strong></div><div className="contact-detail"><span>Response time</span><strong>1–2 business days (sample text)</strong></div></div><form className="checkout-form contact-form" onSubmit={handleSubmit}>{sent ? <div className="form-success"><span>✓</span><h2>Message ready!</h2><p>Thanks for trying the demo contact form.</p><button type="button" className="button button-dark" onClick={() => setSent(false)}>Send another message</button></div> : <><h2>Send a message</h2><label>Your name<input required placeholder="Your name" /></label><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>Subject<input required placeholder="What is this about?" /></label><label>Message<textarea required rows="5" placeholder="Write your message..." /></label><button type="submit" className="button button-dark full-button">Send demo message ↗</button></>}</form></div></main>;
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  function submit(e) { e.preventDefault(); if (email.trim()) setDone(true); }
  return <section className="newsletter"><span className="eyebrow">A NOTE FROM US</span><h2>Good finds, in your inbox.</h2><p>Sign up for the demo newsletter and keep in the loop.</p>{done ? <div className="newsletter-success">Thanks! This is a demo subscription for {email}.</div> : <form onSubmit={submit}><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" /><button className="button button-dark" type="submit">Sign me up ↗</button></form>}<small>No spam, just good things. (Sample newsletter form.)</small></section>;
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shopease-cart")) || []; }
    catch { return []; }
  });
  useEffect(() => { localStorage.setItem("shopease-cart", JSON.stringify(cart)); }, [cart]);
  function addToCart(product) {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
  }
  function changeQuantity(id, amount) {
    setCart(current => current.map(item => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0));
  }
  function removeFromCart(id) { setCart(current => current.filter(item => item.id !== id)); }
  function clearCart() { setCart([]); }
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return <><Header cartCount={cartCount} /><Routes>
    <Route path="/" element={<Home addToCart={addToCart} />} />
    <Route path="/products" element={<Products addToCart={addToCart} />} />
    <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
    <Route path="/cart" element={<Cart cart={cart} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />} />
    <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<main className="empty-state"><h1>Page not found</h1><Link className="button button-dark" to="/">Go home</Link></main>} />
  </Routes><Footer /></>;
}