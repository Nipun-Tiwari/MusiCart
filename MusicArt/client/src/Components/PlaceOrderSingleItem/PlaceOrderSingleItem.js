import React, {useState, useEffect, useCallback} from 'react';
import styles from './PlaceOrderSingleItem.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearCart } from '../../features/buy/buySlice';
import phoneImg from '../../Assets/phone.png';
import logoImg from '../../Assets/head.png';
import cart from '../../Assets/cart.png';
import shopping from '../../Assets/shopping_bag.png'

function PlaceOrderSingleItem() {

  const buyItems = useSelector((state) => state.buy);
  
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const totalPrice = location.state?.totalPrice;
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
  const handlePlaceOrder = () => {
    dispatch(clearCart());
    navigate('/success');
  };
  

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
                <button className={styles.cartButton}  onClick={()=>{navigate('/cart')}}><img src={cart} alt="" height={20}/>{buyItems.length>0?buyItems.length:'Show cart'}</button>
              )
            }
            
            
          </div>
          <button className={styles.backToProducts} onClick={()=>{navigate('/')}}>Back to products</button>
          <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'2rem', marginBottom:'4rem'}}>
            <span style={{display:'flex', alignItems:'center'}}><h2 style={{marginBottom:'0.5rem',textDecoration:'underline', fontWeight:'500' }}>Checkout</h2></span>
          </div>

            <div className={styles.orderDetails}>
              <div className={styles.shippingDetails}>
                <div style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <h2 style={{color:'#B52B00', fontWeight:'500', marginTop:'0'}}>1. Delivery address</h2>
                  <span style={{maxWidth:'20%', flexWrap:'wrap', textAlign:'start',fontSize:'large', fontWeight:'500', marginTop:'0'}}>Hunasamranahalli Bangalore Karnataka 562157</span>
                </div>
                <hr style={{width:'100%', border:'2.87px solid #E1E1E1', marginTop:'1.5rem', marginBottom:'1.5rem'}} />
                <div style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <h2 style={{color:'#B52B00', fontWeight:'500', marginTop:'0'}}>2. Payment method</h2>
                  <span style={{maxWidth:'20%', flexWrap:'wrap', textAlign:'start',fontSize:'large', fontWeight:'500', marginTop:'0'}}>Pay on delivery ( Cash/Card)</span>
                </div>
                <hr style={{width:'100%', border:'2.87px solid #E1E1E1', marginTop:'1.5rem', marginBottom:'1.5rem'}} />
                
                <div style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <h2 style={{color:'#B52B00', fontWeight:'500', marginTop:'0'}}>3. Review items and delivery</h2>
                  <div style={{maxWidth:'40%', flexWrap:'wrap', textAlign:'start',fontSize:'large', fontWeight:'500', marginTop:'0'}}>
                      {buyItems&&
 
                        <div className={styles.itemCard} >
                          <img src={buyItems.imageURLs&&buyItems.imageURLs[0]} style={{border:'2px solid #2E0052', borderRadius:'0.3rem'}} alt="" height={160} width={140} />
                          <span style={{fontSize:'large', fontWeight:'500', marginTop:'0.7rem'}}>{buyItems.name_of_product}</span>
                          <span style={{fontSize:'medium', marginTop:'0.4rem', color:'#797979'}}>Color : {buyItems.color}</span>
                          <span style={{fontSize:'medium', marginTop:'0.4rem', color:'#797979'}}>{buyItems.isAvailable?'In Stock':'Out of stock'}</span>
                          <span style={{fontSize:'medium', marginTop:'0.4rem',}}>Estimated delivery : <br />Monday — FREE Standard Delivery</span>
                        </div>
                      }
                        
                      
                    
                  </div>
                </div>
                <hr style={{width:'100%', border:'2.87px solid #E1E1E1', marginTop:'1.5rem', marginBottom:'1.5rem'}} />

                <div className={styles.finalPriceOrderCheckout}>
                <button className={styles.placeYourOrderSmall} onClick={()=>{navigate('/success')}} >Place order</button>
                <div style={{textAlign:'start', paddingLeft:'1rem',}}>
                  <span style={{fontSize:'medium', color:'#B52B00', fontWeight:'500'}}>Order Total: ₹{totalPrice+45}</span><br />
                  <span style={{fontSize:'small', fontWeight:'500'}}>By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                </div>
                
                </div>
              </div>
              <div className={styles.pricingDetails}>
                <div className={styles.priceWrapper}>
                  <button className={styles.placeYourOrder} onClick={handlePlaceOrder} >Place order</button>
                  <span style={{fontSize:'small', fontWeight:'500'}}>By placing your order, you agree to Musicart privacy notice and conditions of use.</span>
                  <hr style={{width:'90%', border:'2.87px solid #E1E1E1', marginTop:'1.5rem', marginBottom:'1.5rem'}} />
                  <h2 style={{fontWeight:'500', marginTop:'0', textAlign:'start', width:'90%'}}>Order Summary</h2>
                  <span style={{width:'90%', display:'flex', justifyContent:'space-between'}}>
                    <span style={{  fontSize:'large', marginTop:'0', color:'#797979'}}>Items : </span>
                    <span style={{  fontSize:'large', marginTop:'0', color:'#797979'}}>₹{totalPrice}.00 </span>

                  </span>
                  <span style={{width:'90%', display:'flex', justifyContent:'space-between'}}>
                    <span style={{  fontSize:'large', marginTop:'0', color:'#797979'}}>Delivery : </span>
                    <span style={{  fontSize:'large', marginTop:'0', color:'#797979'}}>₹45.00 </span>

                  </span>
                  <hr style={{width:'90%', border:'2.87px solid #E1E1E1', marginTop:'1.5rem', marginBottom:'1.5rem'}} />
                  <div style={{display:'flex', width:'90%', justifyContent:'space-between'}}>
                    <h2 style={{color:'#B52B00', fontWeight:'500', marginTop:'0'}}>Order Total : </h2>
                    <h2 style={{color:'#B52B00', fontWeight:'500', marginTop:'0'}}>₹{totalPrice+45}</h2>
                  </div>
                  
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

export default PlaceOrderSingleItem