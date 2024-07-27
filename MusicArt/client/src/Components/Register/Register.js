import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import img1 from '../../Assets/head.png';
import musicImage from '../../Assets/musicImage.png';


const DivStyles={
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  alignItems: 'flex-start',
  width: '85%',
}
const InputStyles={
  width: '90%',
  padding:'0.5rem 0.5rem 0.5rem 0.5rem',
  borderRadius: '8px',
  border:'2px solid #B6B6B6',
  marginTop: '0.5rem',
}
function Register() {
  const navigate=useNavigate();
  const [error, setError]=useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const signup = (event) => {
    event.preventDefault();
    axios.post('https://product-eshop.onrender.com/signup', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData=localStorage.getItem('token')
        if(tokenData!=='undefined') {
          navigate('/')
        }
        else{
          setError(res.data.message)
        }
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <img src={musicImage}alt="" height={40} style={{marginTop:'2rem', marginBottom:'2rem', marginRight:'0.3rem'}} />
        <h1 style={{fontWeight:'500'}}>Musicart</h1>
      </div>
      <h1 className={styles.welcomeText} >Welcome</h1>
      <form className={styles.form}>
        
        <div className={styles.inputContainer}>
          <h2 style={{alignSelf:'start', paddingLeft:'2.2rem', fontWeight:600}}>Create Account</h2>
          <div style={DivStyles}>
            <label htmlFor="name" style={{fontWeight:600, fontSize:'small' }}>Your Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} style={InputStyles}/>
          </div>

          <div style={DivStyles}>
            <label htmlFor="mobile" style={{fontWeight:600, fontSize:'small'}}>Mobile number</label>
            <input type="text" name="mobile" value={user.mobile} onChange={handleChange} style={InputStyles} />
          </div>

          <div style={DivStyles}>
            <label htmlFor="email" style={{fontWeight:600, fontSize:'small'}}>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} style={InputStyles}/>
          </div>

          
          <div style={DivStyles}>
            <label htmlFor="password" style={{fontWeight:600, fontSize:'small'}}>Password</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} style={InputStyles} />
          </div>
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <p style={{width:'85%', textAlign:'left', fontWeight:600,fontSize:'small', marginTop:0}}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.
          </p>
        </div>

        <span style={{color:'red', fontSize:'small', marginBottom:'0.6rem'}}>{error}</span>
        
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <button className={styles.buttonStyles} type="submit" style={{ cursor:'pointer'}} onClick={signup}>Continue</button>
        </div>

        <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'1rem'}}>
          <p style={{width:'85%', textAlign:'left',fontSize:'small',  marginTop:0}}>By continuing, you agree to Musicart privacy notice and conditions of use.
          </p>
        </div>

      </form>
      <span style={{fontWeight:'bold', marginTop:'1rem'}}>Already have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={()=>{navigate('/login')}}>Sign in</button></span>

      <footer style={{ backgroundColor:'#2E0052', width:'100%', padding:'0.8rem 0 0.8rem 0', color:'white'}}>
          Musicart | All rights reserved
      </footer>
      
    </div>
  )
}

export default Register