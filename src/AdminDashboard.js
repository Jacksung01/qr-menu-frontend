import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://qr-menu-backend-2r1h.onrender.com/orders')
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>รายการออเดอร์</h1>
      {orders.map((order, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <strong>โต๊ะ {order.table} - สถานะ: {order.status}</strong>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name}</li>
            ))}
          </ul>
          <p>เวลาสั่ง: {new Date(order.timestamp).toLocaleTimeString()}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
