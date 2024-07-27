import React, {useState, useEffect, useCallback} from 'react';
import styles from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTotalPrice } from '../../features/totalPrice/totalPriceSlice';
import phoneImg from '../../Assets/phone.png';
import logoImg from '../../Assets/head.png';
import cart from '../../Assets/cart.png';
import shopping from '../../Assets/shopping_bag.png'
function Cart() {
  const cartItems = useSelector((state) => state.cart);

  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [quantities, setQuantities] = useState(() => {
    const initQuant = {};
    cartItems.forEach(item => initQuant[item.id] = 1)
    return initQuant;
  });

  const navigate =useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    
  }
  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/register')
  }
 

  const handleQuantityChange = (e, id) => {
    const value = parseInt(e.target.value);
    setQuantities(prevQuantities => ({ 
      ...prevQuantities,
      [id]: value
    }));
  };

  const handleTotalPriceMigration=()=>{
    const totalPrice = calculateTotalPrice() + 45;
    dispatch(setTotalPrice(totalPrice));
    navigate('/place-order');
  }
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += (item.price * (quantities[item._id] || 1));
    }
    return total;
   }

  const calculateTotalPriceForItem = (price, id) => {
    return price * (quantities[id] || 1);
   }

  

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div style={{display:'flex', alignItems:'center', fontSize:'small'}}>
          <img src={phoneImg} height={20} alt="" style={{marginRight:'0.5rem'}} />
          <span>9845970484</span>
        </div>

        <div style={{fontSize:'small'}}>
          <span>Get 50% off on selected items&nbsp;&nbsp; |  &nbsp;&nbsp;Shop Now</span>
        </div>

        <div>
          {
            isLoggedIn?(
              <>
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
              </>
            ):
            <>
             <button className={styles.loginButton} onClick={handleLogin}>Login </button>&nbsp;|&nbsp;
             <button className={styles.signupButton} onClick={handleSignup}>Signup</button>
            </>
          }
        </div>
      </div>

      <div className={styles.mainBody}>
        <div className={styles.bodyContent}>
          <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:'2rem', alignItems:'center'}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
              <a href="/" style={{textDecoration:'none', color:'black'}}>Home/ View Cart</a>
            </div>
            {
              isLoggedIn&&(
                <button className={styles.cartButton}  onClick={()=>{navigate('/cart')}}><img src={cart} alt="" height={20}/>{cartItems.length>0?cartItems.length:'Show cart'}</button>
              )
            }
            
            
          </div>
          <button className={styles.backToProducts} onClick={()=>{navigate('/')}}>Back to products</button>
          <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'2rem', marginBottom:'4rem'}}>
            <span style={{display:'flex', alignItems:'center'}}><img src={shopping} alt="" height={45} style={{marginRight:'0.5rem'}}/><h2 style={{marginBottom:'0.5rem', }}>My cart</h2></span>
          </div>

          <div className={styles.cartItems}>
            <div className={styles.cartItemsDetails}>
              <hr style={{width:'100%', border:'2.87px solid #E1E1E1',}} />
                {
                  cartItems.length > 0?(
                    cartItems.map((item, idx)=>(
                      <div className={styles.details} key={idx}>
                        <div style={{backgroundColor:'white', border:'3px solid #2E0052', borderRadius:'0.5rem', padding:'1rem'}}>
                         <img src={item.imageURLs&&item.imageURLs[0]} alt="" height={150} />
                        </div>
                        <div style={{display:'flex', flexDirection:'column', paddingLeft:'2rem', width:'20%', textAlign:'start', fontWeight:'500'}}>
                          <h3 style={{fontWeight:'600', marginTop:'0.3rem', marginBottom:'1rem'}}>{item.name_of_product}</h3>
                          <span style={{marginBottom:'0.7rem'}}>Color:{item.color}</span>
                          <span>{item.isAvailable?'In Stock':'Out of stock'}</span>
                        </div>

                        <div style={{display:'flex', flexDirection:'column', width:'12%', textAlign:'start', fontWeight:'500'}}>
                          <h3 style={{fontWeight:'600', marginTop:'0.3rem', marginBottom:'1rem'}}>Price</h3>
                          <span style={{marginBottom:'0.7rem'}}>₹{item.price}</span>
                          
                        </div>

                        <div style={{display:'flex', flexDirection:'column', width:'10%', textAlign:'start', fontWeight:'500'}}>
                          <h3 style={{fontWeight:'600', marginTop:'0.3rem', marginBottom:'1rem'}}>Quantity</h3>
                          <select className={styles.quantity} value={quantities[item._id] || 1}  onChange={(e) => handleQuantityChange(e, item._id)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                          </select>
                          
                        </div>

                        <div style={{display:'flex', flexDirection:'column', width:'20%', textAlign:'start', fontWeight:'500', paddingLeft:'3rem'}}>
                          <h3 style={{fontWeight:'600', marginTop:'0.3rem', marginBottom:'1rem'}}>Total</h3>
                          <span style={{marginBottom:'0.7rem'}}>₹{calculateTotalPriceForItem(item.price, item._id)}</span>
                          
                        </div>
                        
                      </div>
                    ))
                  ):
                  (
                    <>
                      <h1>No item in the cart</h1>
                    </>
                  )
                }
              <hr style={{width:'100%', border:'2.87px solid #E1E1E1'}} />
              <div style={{width:'100%', display:'flex', justifyContent:'space-around'}}>
                <h3>{cartItems.length} Items</h3>
                <h3>₹{calculateTotalPrice()}</h3>
              </div>

            </div>
            <div className={styles.cartItemsFinalPrice}>
              <hr style={{border:'2.87px solid #E1E1E1', height:'35rem', margin:0}} />
              <div className={styles.finalPriceDiv}>
                <h2 style={{fontWeight:'500'}}>Price Details</h2>
                <span style={{display:'flex', width:'80%', justifyContent:'space-between'}}><h3 style={{fontWeight:'500'}}>Total MRP</h3><h3 style={{fontWeight:'500'}}>₹{calculateTotalPrice()}</h3></span>
                <span style={{display:'flex', width:'80%', justifyContent:'space-between'}}><h3 style={{fontWeight:'500'}}>Discount on MRP</h3><h3 style={{fontWeight:'500'}}>₹0</h3></span>
                <span style={{display:'flex', width:'80%', justifyContent:'space-between'}}><h3 style={{fontWeight:'500'}}>Convenience Fee</h3><h3 style={{fontWeight:'500'}}>₹45</h3></span>
                <span style={{display:'flex', width:'80%', justifyContent:'space-between', marginTop:'10rem'}}><h2 style={{fontWeight:'500'}}>Total Amount</h2><h3 style={{fontWeight:'500'}}>₹{calculateTotalPrice()+45}</h3></span>
                <button className={styles.placeYourOrder} disabled={!cartItems.length} onClick={()=>{navigate("/place-order", { state: { totalPrice: calculateTotalPrice()} });}} >Place order</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className={styles.footer}>
        <footer style={{ backgroundColor:'#2E0052', width:'100%', padding:'0.8rem 0 0.8rem 0', color:'white'}}>
          Musicart | All rights reserved
        </footer>
      </div>
      
    </div>
  )
}

export default Cart