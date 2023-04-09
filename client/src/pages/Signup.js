import BackgroundImage from './Backgroundimage'
import styled from 'styled-components'
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {firebaseAuth} from '../utils/Firebase-config'
import Header from './Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleSignIn = async() => {
        try{
            const {email, password} = form;
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        }catch(err){
            alert('Ivalid Email or Email already in use! Please try again.')
            console.log(err)
        }
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if(currentUser) navigate("/")
        })
    }, [])
 
    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className='content'>
                <Header/>
                <div className='body flex column a-center j-center'>
                    <div className='text flex column'>
                        <h1>Unlimited movies, TV shows are more</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <div className='form'>
                        <input 
                            type='email' 
                            placeholder='Email Address' 
                            name='email'
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})} />
                        {showPassword && <input 
                                            type='password' 
                                            placeholder='Password' 
                                            name='password'
                                            value={form.password}
                                            onChange={(e) => setForm({...form, password: e.target.value})}/>}
                        {!showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>}
                    </div>
                    <button onClick={handleSignIn}>Sign Up</button>
                </div>
            </div>
        </Container>
    )
}

// adding styles for our signup page
const Container = styled.div`
    position: relative;
    .content{
        position:absolute;
        top:0;
        left:0;
        background-color: rgba(0,0,0,0.5);
        height:100vh;
        width:100vw;
        display:grid;
        grid-template-rows: 15vh 85vh; 

        .body{
            gap: 1rem;
            .text{
                gap: 1rem;
                text-align: center;
                font-size: 1.5rem;
                h1{
                    padding: 0 10rem;
                }
            } 
        }

        .form{
            display: grid;
            grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "2fr 1fr"};
            width: 60%;
            input{
                color: black;
                border-none;
                padding: 1.5rem;
                font-size: 1.2rem;
                border: 1px solid black;
                &:focus{
                    outline: none;
                }
            }
            button{
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border:none;
                cursor: pointer;
                color: #fff;
                font-weight: bolder;
                font-size: 1.05rem;
            } 
        }
        button{
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border:none;
            cursor: pointer;
            color: #fff;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
        }
    }
`;

export default Signup