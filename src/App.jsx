import { useState, useEffect } from 'react';
import PublicView from './PublicView';
import AdminView from './AdminView';
import Cart from './Cart';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [systemLog, setSystemLog] = useState("System online. Fetch complete.");

  // View toggle states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [cartView, setCartView] = useState(false);

  // Cart state
  const [cart, setCart] = useState([]);

  // Form states for creating products (Admin)
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');   // <-- important: image URL field

  // Fetch products (unchanged)
  useEffect(() => {
    const fetchMasterPayload = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        if (!response.ok) throw new Error('Failed to load initial API catalog bundle.');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMasterPayload();
  }, []);

  // ---------- Cart Handlers ----------
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ---------- CRUD Handlers (Updated) ----------
  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return alert("Please specify both Title and Price metrics.");
    const imageUrl = newImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500';

    setSystemLog("POST: Dispatching object data map package to server endpoints...");
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          price: parseFloat(newPrice),
          image: imageUrl,
          category: 'Accessories'
        })
      });
      if (!response.ok) throw new Error('POST operation transmission failed.');
      const verifiedItem = await response.json();
      setProducts([verifiedItem, ...products]);
      setSystemLog(`POST Success! Server assigned ID: ${verifiedItem.id}. Item appended.`);
      setNewTitle('');
      setNewPrice('');
      setNewImage('');
    } catch (err) {
      setSystemLog(`POST Error: ${err.message}`);
    }
  };

  // FULL UPDATE (replaces old handleUpdate)
  const handleUpdateProduct = async (id, updatedData) => {
    setSystemLog(`PUT: Amending record parameters on product ID #${id}...`);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error('PUT modifications declined.');
      // Update local state
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
      setSystemLog(`PUT Success! Server synchronized ID #${id}.`);
    } catch (err) {
      setSystemLog(`PUT Error: ${err.message}`);
    }
  };

  // DELETE (unchanged)
  const handleDelete = async (id) => {
    if (!confirm(`Confirm hard deletion profile sequence for record ID #${id}?`)) return;
    setSystemLog(`DELETE: Sending drop instruction for record ID #${id}...`);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error('DELETE tracking drop handshake failed.');
      setProducts(products.filter(p => p.id !== id));
      setSystemLog(`DELETE Success! Object ID #${id} unlinked.`);
    } catch (err) {
      setSystemLog(`DELETE Error: ${err.message}`);
    }
  };

  if (loading) return <div style={styles.fallback}>📡 Synchronizing Global App Pipeline...</div>;
  if (error) return <div style={styles.fallbackError}>⚠️ Core Data Route Blocked: {error}</div>;

  return (
    <div style={styles.globalWrapper}>
      <div style={styles.navBar}>
        <div style={styles.brand}>Amora Enterprise Hub</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Toggle Public/Admin */}
          <button
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setCartView(false);
            }}
            style={isAdminMode ? styles.toggleBtnAdmin : styles.toggleBtnPublic}
          >
            {isAdminMode ? "🔄 Switch to Public Storefront" : "🛠️ Switch to Admin View"}
          </button>
          {/* Cart button */}
          <button
            onClick={() => {
              setCartView(true);
              setIsAdminMode(false);
            }}
            style={styles.cartBtn}
          >
            🛒 Cart
          </button>
        </div>
      </div>

      <main style={styles.mainContent}>
        {cartView ? (
          <Cart
            cart={cart}
            onRemove={removeFromCart}
            onClear={clearCart}
            totalPrice={totalPrice}
          />
        ) : isAdminMode ? (
          <AdminView
            products={products}
            systemLog={systemLog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newPrice={newPrice}
            setNewPrice={setNewPrice}
            newImage={newImage}             // <-- pass image state
            setNewImage={setNewImage}       // <-- pass setter
            onCreate={handleCreate}
            onUpdateProduct={handleUpdateProduct}   // <-- changed name
            onDelete={handleDelete}
          />
        ) : (
          <PublicView products={products} onAddToCart={addToCart} />
        )}
      </main>
    </div>
  );
}

const styles = {
  globalWrapper: { minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '60px' },
  navBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '15px 30px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  brand: { fontWeight: 'bold', fontSize: '18px', letterSpacing: '0.5px' },
  toggleBtnPublic: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  toggleBtnAdmin: { backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  cartBtn: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  mainContent: { padding: '40px 20px' },
  fallback: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', fontFamily: 'sans-serif', color: '#475569' },
  fallbackError: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', fontFamily: 'sans-serif', color: '#ef4444', fontWeight: 'bold' }
};