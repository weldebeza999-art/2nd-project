import React, { useState } from 'react';

export default function PublicView({ products, onAddToCart }) {
  // Track which product IDs have been added to the cart (just for visual feedback)
  const [addedIds, setAddedIds] = useState(new Set());

  const handleAdd = (item) => {
    onAddToCart(item);                 // call the parent function
    setAddedIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(item.id);
      return newSet;
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Amora Marketplace</h1>
        <p style={styles.subtitle}>Discover our curated collection of live products</p>
      </header>

      <div style={styles.grid}>
        {products.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.title}
                style={styles.image}
              />
            </div>
            <div style={styles.cardBody}>
              <span style={styles.category}>{item.category || 'General'}</span>
              <h3 style={styles.productTitle}>{item.title}</h3>
              <div style={styles.priceTag}>${item.price.toFixed(2)}</div>
              <button
                style={{
                  ...styles.addButton,
                  backgroundColor: addedIds.has(item.id) ? '#16a34a' : '#0f172a',
                }}
                onClick={() => handleAdd(item)}
              >
                {addedIds.has(item.id) ? 'Added ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: { textAlign: 'center', marginBottom: '40px', padding: '20px 0' },
  mainTitle: {
    fontSize: '2.5rem',
    color: '#0f172a',
    margin: '0 0 10px 0',
    fontWeight: '800',
  },
  subtitle: { fontSize: '1.1rem', color: '#64748b', margin: 0 },
  grid: {
    display: 'grid',
    // 3 columns on large screens (≥1024px), 2 columns on tablets, 1 column on phones
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    border: 'none',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
  },
  imageWrapper: {
    height: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: '#fff',
  },
  image: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
  cardBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    borderTop: '1px solid #f1f5f9',
  },
  category: {
    textTransform: 'uppercase',
    fontSize: '11px',
    color: '#0284c7',
    fontWeight: 'bold',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  },
  productTitle: {
    fontSize: '15px',
    color: '#1e293b',
    fontWeight: '600',
    margin: '0 0 12px 0',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: '1.4',
  },
  priceTag: { fontSize: '20px', fontWeight: '700', color: '#0f172a' },
  addButton: {
    marginTop: '12px',
    padding: '10px 0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
};