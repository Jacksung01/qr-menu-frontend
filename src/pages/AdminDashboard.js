import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://qr-menu-backend-2r1h.onrender.com/order")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>รายการออเดอร์</h1>
      {orders.length === 0 ? <p>ยังไม่มีออเดอร์</p> : (
        orders.map((order, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <strong>โต๊ะ {order.table} - สถานะ: {order.status}</strong>
            <ul>{order.items.map((item, j) => <li key={j}>{item.name}</li>)}</ul>
            <p>เวลาสั่ง: {new Date(order.timestamp).toLocaleTimeString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
