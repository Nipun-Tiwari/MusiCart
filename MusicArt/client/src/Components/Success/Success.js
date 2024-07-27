import React from 'react';
import styles from './Success.module.css';
import logoImg from '../../Assets/head.png';
import confetti from '../../Assets/confetti.png';
import { useNavigate } from 'react-router-dom';

function Success() {

  const navigate =useNavigate();
  return (
    <div className={styles.container}>
      <div style={{display:'flex', alignItems:'center', marginTop:'2rem', marginLeft:'4rem'}}>
         <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
      </div>

      <div className={styles.successMessage}>
        <div className={styles.content}>
          <img src={confetti} alt="" height={120}/>
          <h2>Order is placed successfully!</h2>
          <h3 style={{color:'#969696', fontWeight:'500', marginTop:'0', marginBottom:'0'}}>You  will be receiving a confirmation email with order details</h3>
          <button className={styles.backToProducts} onClick={()=>{navigate('/')}}>Go back to Home page</button>
          
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

export default Success