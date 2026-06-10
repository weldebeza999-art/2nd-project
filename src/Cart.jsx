import { useState } from 'react';

export default function Cart({ cart, onRemove, onClear, totalPrice }) {
  const [showPayment, setShowPayment] = useState(false);

  const handlePurchase = () => setShowPayment(true);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert('Payment processed (demo)');
    onClear();
    setShowPayment(false);
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h2>Your cart is empty</h2>
       
      </div>
    );
  }

  return (
    <div style={styles.cartContainer}>
      <h2 style={styles.heading}>Your Cart</h2>

      <div style={styles.cartItems}>
        {cart.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <img
              src={item.image || 'https://via.placeholder.com/50'}
              alt={item.title}
              style={styles.thumb}
            />
            <div style={styles.itemInfo}>
              <h4 style={styles.itemTitle}>{item.title}</h4>
              <p>${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
            <button onClick={() => onRemove(item.id)} style={styles.removeBtn}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={styles.totalSection}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button style={styles.purchaseBtn} onClick={handlePurchase}>
          Purchase
        </button>
      </div>

      {showPayment && (
        <div style={styles.overlay}>
          <div style={styles.paymentCard}>
            <h3>Select Payment Method</h3>
            <form onSubmit={handlePaymentSubmit}>
              <label style={styles.radioLabel}>
                <input type="radio" name="payment" value="card" defaultChecked /> Credit/Debit Card
              </label>
              <label style={styles.radioLabel}>
                <input type="radio" name="payment" value="paypal" /> PayPal
              </label>
              <label style={styles.radioLabel}>
                <input type="radio" name="payment" value="applepay" /> Apple Pay
              </label>
              <div style={styles.paymentActions}>
                <button type="submit" style={styles.confirmBtn}>
                  Pay ${totalPrice.toFixed(2)}
                </button>
                <button type="button" onClick={() => setShowPayment(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  cartContainer: { maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' },
  heading: { fontSize: '2rem', color: '#0f172a', marginBottom: '30px' },
  emptyCart: { textAlign: 'center', padding: '50px' },
  backBtn: { backgroundColor: 'transparent', border: '1px solid #0f172a', color: '#0f172a', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' },
  cartItems: { display: 'flex', flexDirection: 'column', gap: '15px' },
  cartItem: { display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px', background: '#fff' },
  thumb: { width: '60px', height: '60px', objectFit: 'contain', borderRadius: '8px' },
  itemInfo: { flexGrow: 1 },
  itemTitle: { margin: '0 0 5px 0', fontWeight: '600' },
  removeBtn: { background: 'none', border: 'none', color: '#ef4444', fontWeight: '600', cursor: 'pointer' },
  totalSection: { marginTop: '30px', textAlign: 'right', borderTop: '2px solid #e2e8f0', paddingTop: '20px' },
  purchaseBtn: { padding: '12px 30px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  paymentCard: { backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  radioLabel: { display: 'block', marginBottom: '12px', fontWeight: '500', cursor: 'pointer' },
  paymentActions: { display: 'flex', gap: '10px', marginTop: '20px' },
  confirmBtn: { flex: 1, padding: '12px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  cancelBtn: { flex: 1, padding: '12px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
};
