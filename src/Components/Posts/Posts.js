import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import Heart from '../../assets/Heart';
import './Post.css';
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { PostContext } from '../../Context/PostContext';
import { useNavigate } from "react-router-dom";

function Posts() {
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const navigate = useNavigate();
  useEffect(() => {
    getDocs(collection(db, "products")).then((snapshot) => {
      const allpost = snapshot.docs.map((product) => {
        return { ...product.data(), id: product.id };
      });
      setProducts(allpost);
      console.log(allpost);
    });
  }, [db]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return <div
              className="card"
              onClick={() => {
                setPostDetails(product)
                navigate("/view");
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <Link to='/view'>  <img src={product.url} alt="" /></Link>
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <Link to='/view'>   <p className="name"> {product.name}</p></Link>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          })}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Posts;
