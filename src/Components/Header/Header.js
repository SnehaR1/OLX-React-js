import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { UserAuth } from '../../Context/AuthContextProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Header() {
  const { user, logOut } = UserAuth()
  const [lang, setLang] = useState('')
  const [username, setUsername] = useState('');
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.email);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUsername(userData.username);
          }
        } catch (error) {
          console.error('Error fetching username:', error.message);
        }
      }
    };

    fetchUsername();
  }, [user]);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'> <OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div class="dropdown">

          <span> {lang}</span>
          <div class="dropdown-content">
            <p onClick={() => setLang('English')}>English</p>
            <p onClick={() => setLang('हिंदी')}>हिंदी</p>
          </div>
          <span><Arrow></Arrow></span>
        </div>





        {user?.email ? (
          <div>
            <span>Welcome {username}</span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <div className="loginPage">
            <span>
              <Link to='/login'>Login</Link>
            </span>
            <hr />
          </div>
        )}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>  <Link to='/create'>SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
