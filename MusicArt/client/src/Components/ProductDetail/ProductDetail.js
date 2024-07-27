import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { addToBuy } from '../../features/buy/buySlice';
import axios from 'axios';
import styles from './ProductDetail.module.css';
import phoneImg from '../../Assets/phone.png';
import cart from '../../Assets/cart.png';
import logoImg from '../../Assets/head.png';
import star from '../../Assets/star.png';

function ProductDetail() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productDet, setProductDet]=useState([]);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const{id}=useParams();
  useEffect(()=>{
    axios.get(`https://product-eshop.onrender.com/get-prod-desc/${id}`)
         .then(res=>{setProductDet(res.data.product); })
         .catch(err=>console.log(err))
  },[id, isLoggedIn]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
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

  const handleAddToCart = () => {
    dispatch(addToCart(productDet));
    alert('Item added to cart')
  }
  const handleAddToBuy=()=>{
    dispatch(addToBuy(productDet))
    navigate('/single-item')
}

  const cartItems = useSelector((state) => state.cart);

  const detailed_description=productDet && productDet.detailed_desc ? productDet.detailed_desc : '';
  const lines = detailed_description.split('\n');

  let stars = Array(productDet.review_stars?productDet.review_stars:'').fill().map((_, i) => {
    return <img key={i} src={star} alt="star" height={25} style={{marginRight:'0.3rem'}} />; 
  })

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
                <span style={{textDecoration:'none', color:'black'}}>Home/&nbsp;{productDet.name_of_product}</span>
              </div>
              {
                isLoggedIn&&(
                  <button className={styles.cartButton} onClick={()=>{navigate('/cart')}}><img src={cart} alt="" height={20} />{cartItems.length>0?cartItems.length:'Show cart'}</button>
                )
              }
              
          </div>
          <button className={styles.backToProducts} onClick={()=>{navigate('/')}}>Back to products</button>
          
          {
            productDet&&(
              <div className={styles.productInfo}>
                <h2 style={{flexWrap:'wrap', textAlign:'start'}}>{productDet.short_desc}</h2>
                <div className={styles.otherDetails}>
                  <div className={styles.imagesDiv}>
                    {/* {
                      productDet.imageURLs && productDet.imageURLs.map((image, idx)=>(

                      ))
                    } */}
                    <div style={{border:'4px solid #2E0052', paddingTop:'5rem', paddingBottom:'4rem', width:'80%', borderRadius:'1rem'}}>
                      <img  src={productDet.imageURLs ? productDet.imageURLs[0] : 'default-image-url'} alt="" height={400} width='45%'/>
                    </div>
                    
                    <div className={styles.otherViewImages}>
                      <div style={{border:'4px solid #2E0052', paddingTop:'1rem', paddingBottom:'1rem', width:'23%', borderRadius:'1rem', marginRight:'1rem', marginTop:'1rem'}}>
                        <img  src={productDet.imageURLs ? productDet.imageURLs[0] : 'default-image-url'} alt="" height={130} width='45%'/>
                      </div>
                      <div style={{border:'4px solid #2E0052', paddingTop:'1rem', paddingBottom:'1rem', width:'23%', borderRadius:'1rem', marginRight:'1rem', marginTop:'1rem'}}>
                        <img  src={productDet.imageURLs ? productDet.imageURLs[1] : 'default-image-url'} alt="" height={130} width='45%'/>
                      </div>
                    </div>
                  </div>
                  <div className={styles.otherDetailsDiv}>
                    <h1 style={{marginBottom:'1rem'}}>{productDet.name_of_product}</h1>
                    <div style={{display:'flex', width:'60%', justifyContent:'space-between', marginBottom:'1rem', alignItems:'center'}}>
                      <span>{stars}</span>
                      <span>(50 Customer reviews)</span>
                    </div>
                    <h2 style={{fontWeight:'500', marginTop:0}}>Price - ₹{productDet.price}</h2>
                    <h2 style={{ marginTop:0, fontWeight:'400'}}>{productDet.color}&nbsp;|&nbsp;{productDet.type}</h2>
                    <h3 style={{ marginTop:0, fontWeight:'400'}}>
                    {lines.map((line, index) => (
                        <span key={index}>
                        {line}
                        <br />
                        </span>
                    ))}
                    </h3>
                    <span style={{display:'flex'}}><h2 style={{ fontWeight:'500', marginTop:0}}>Available&nbsp;-&nbsp;</h2>{productDet.isAvailable? <h2 style={{ marginTop:0, fontWeight:'400'}}>In stock </h2>: <h2 style={{ marginTop:0, fontWeight:'400'}}>Not in stock</h2>}</span>

                    <span style={{display:'flex'}}><h2 style={{ fontWeight:'500', marginTop:0}}>Brand - </h2><h2 style={{ marginTop:0, fontWeight:'400'}}>{productDet.brand}</h2></span>

                    {
                      isLoggedIn?(
                        <div className={styles.addAndBuyButtons}>
                          <button className={styles.addToCart} onClick={handleAddToCart}>Add to cart</button>
                          <button className={styles.buyNow} onClick={handleAddToBuy}>Buy now</button>
                          
                        </div>
                      ):
                      (
                        <button className={styles.loginToBuyButton} onClick={handleLogin}>
                          Login or sign up to buy
                        </button>
                      )
                    }

                  </div>
                </div>
              </div>
            )
          }
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

export default ProductDetail