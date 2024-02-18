import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Product = () => {
  // state
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);

  const addProduct = async () => {
    try {
      const url = "https://workshop-react-api.vercel.app/product";
      const user_id = localStorage.getItem("user_id");
      //API
      const res = await axios.post(url, { name, qty, price, image, user_id });
      fetchData(); //เมื่อกดบันทึกแล้วมันไม่ต้องรีใหม่แล้ว
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const url = `https://workshop-react-api.vercel.app/product?user_id=${user_id}`;
      //api
      const res = await axios.get(url);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const url = `https://workshop-react-api.vercel.app/product/${id}`;
      await axios.delete(url);
      Swal.fire({
        title: "คุณต้องการลบหรือไม่?",
        text: "โปรดเลือก!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "yes delect"
      }).then(async (result) => { // ใช้ async เพื่อเรียกใช้ fetchData หลังจากที่ลบสินค้าแล้ว
        if (result.isConfirmed) {
          await fetchData(); // เรียกใช้ fetchData เพื่อโหลดข้อมูลใหม่หลังจากลบสินค้า
          Swal.fire({
            title: "ลบข้อมูล!",
            text: "คุณได้ลบข้อมูลเรียบร้อย",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = (product) => {
    setName(product.name);
    setQty(product.qty);
    setPrice(product.price);
    setImage(product.image);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col mt-20 text-center">
        <div className=" bg-white rounded-lg shadow-lg p-2 m-3 mr-52 ml-52">
          <input
            placeholder="ชื่อสินค้า"
            className="border border-gray-600 px-2 m-4 p-2 rounded"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="จำนวน"
            className="border border-gray-600  px-2 m-4 p-2 rounded"
            type="number"
            name="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <input
            placeholder="ราคา"
            className="border border-gray-600  px-2 m-4 p-2 rounded"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            placeholder="รูปภาพ"
            className="border border-gray-600  px-2 m-4 p-2 rounded"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button
            className=" bg-blue-900 text-white py-1 px-4 rounded shadow-lg text-[19px]"
            onClick={addProduct}
          >
            บันทึก
          </button>
        </div>
      </div>

      <div className=" bg-white flex justify-center mt-2 shadow-lg px-2 m-4 p-2 rounded-lg mr-52 ml-52">
        <div className="relative w-screen">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-[19px]">
                  รูปภาพ
                </th>
                <th scope="col" className="px-6 py-3 text-[19px]">
                  ชื่อสินค้า
                </th>
                <th scope="col" className="px-6 py-3 text-[19px]">
                  จำนวน
                </th>
                <th scope="col" className="px-6 py-3 text-[19px]">
                  ราคา
                </th>
                <th scope="col" className="px-6 py-3 text-[19px]">
                  แก้ไข/ลบ
                </th>
              </tr>
            </thead>
            <tbody>
              { data.map((item, index) =>(
                <tr ket={index}>
                  <td>
                    <img src={item.image} alt="" className="w-24"/>
                  </td>
                  <td className="px-6 py-4 text-[19px]">{item.name}</td>
                  <td className="px-6 py-4 text-[19px]">{item.qty}</td>
                  <td className="px-6 py-4 text-[19px]">{item.price}</td>
                  <td><button className=" px-3 py-3 bg-orange-400 text-white shadow rounded mr-2 text-[19px]" onClick={() => editProduct(item)}>แก้ไข</button><button className=" px-3 py-3 bg-red-700 text-white shadow rounded text-[19px]" onClick={() => deleteProduct(item.id)}>ลบ</button></td>
                </tr>
              ))}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4 text-[19px]">Silver</td>
                <td className="px-6 py-4 text-[19px]">Laptop</td>
                <td className="px-6 py-4 text-[19px]">$2999</td>
                <td>
                  <button className="px-3 py-3 bg-orange-400 text-white shadow rounded mr-3 text-[19px]">
                    แก้ไข
                  </button>
                  <button className="px-3 py-3 bg-red-700 text-white shadow rounded text-[19px]">
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
