import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { UserAuth } from '../../Context/AuthContextProvider';
import { db } from '../../firebase';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const { user } = UserAuth()
  const navigate = useNavigate();

  const date = new Date();

  const handleSubmit = () => {
    console.log("Started")
    const storageRef = ref(storage, `image/${image.name}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, 'products'), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          navigate('/');
        });
      })
      .catch((error) => {
        alert(error.message);
        setError(error);
        console.error(error);
      });
  };





  return (
    <Fragment>
      <Header />

      <div className="centerDiv">

        {error ? <p>{error}</p> : null}
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          id="fname"
          name="Name"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          type="text"
          id="fname"
          name="category"
          defaultValue="John"
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input className="input" onChange={(e) => setPrice(e.target.value)}
          value={price} type="number" id="fname" name="Price" />
        <br />

        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

      </div>

    </Fragment>
  );
};

export default Create;
