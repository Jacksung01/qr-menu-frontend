import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // รีเฟรชทุก 5 วินาที
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = () => {
    axios.get('https://qr-menu-backend-2r1h.onrender.com/orders')
      .then(res => setOrders(res.data));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>รายการออเดอร์</h1>
      {orders.length === 0 ? <p>ยังไม่มีออเดอร์</p> : (
        orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
            <h3>โต๊ะ {order.table} - สถานะ: {order.status}</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
            <small>เวลาสั่ง: {new Date(order.created_at).toLocaleTimeString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
