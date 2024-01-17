import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase';
import './View.css';
import { PostContext } from '../../Context/PostContext';
import { getDocs, query, where, collection } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState('')
  const { postDetails } = useContext(PostContext);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        console.log(postDetails);
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("id", "==", userId));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } else {
          alert("no user founded");
          console.log("No matching user found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.CreatedAt}</span>
        </div>
        <div className="contactDetails">
          <p>{userDetails.username}</p>

          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
