import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState("1");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableNumber = params.get('table');
    if (tableNumber) setTable(tableNumber);

    axios.get('https://qr-menu-backend-2r1h.onrender.com/menu')
      .then(res => setMenu(res.data));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const sendOrder = () => {
    if (cart.length === 0) {
      alert("ยังไม่ได้เลือกเมนู!");
      return;
    }

    axios.post('https://qr-menu-backend-2r1h.onrender.com/order', {
      table,
      items: cart,
      note: ""
    }).then(() => {
      alert("ส่งออเดอร์เรียบร้อยแล้ว");
      setCart([]);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>เมนูอาหาร (โต๊ะ {table})</h1>
      {menu.map(item => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <strong>{item.name}</strong> - {item.price} บาท<br />
          <button onClick={() => addToCart(item)}>เพิ่ม</button>
        </div>
      ))}

      <hr />
      <h2>ตะกร้าอาหาร</h2>
      {cart.length === 0 ? (
        <p>ยังไม่มีรายการ</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <button onClick={sendOrder}>ส่งออเดอร์</button>
        </>
      )}
    </div>
  );
}

export default App;
