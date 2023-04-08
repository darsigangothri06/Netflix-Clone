import BackgroundImage from './Backgroundimage'
import styled from 'styled-components'
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {firebaseAuth} from '../utils/Firebase-config'
import Header from './Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleLogIn = async() => {
        try{
            const {email, password} = form;
            await signInWithEmailAndPassword(firebaseAuth, email, password)
        }catch(err){
            console.log(err.code)
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/")
    })
 
    return (
        <Container>
            <BackgroundImage/>
            <div className='content'>
                <Header/>
                <div className='form-container flex column a-center j-center'>
                    <div className='form flex column a-center j-center'>
                        <div className='title'>
                            <h3>LogIn</h3>
                        </div>
                        <div className='container flex column'>
                            <input 
                                type='email' 
                                placeholder='Email Address' 
                                name='email'
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value})} />
                            <input 
                                type='password' 
                                placeholder='Password' 
                                name='password'
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}/>
                            <button onClick={handleLogIn}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

// adding styles for our signup page
const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.5);
        grid-template-rows: 15vh 85vh;
        
        .form-container {
            gap: 2rem;
            height: 85vh;
            .form {
                padding: 2rem;
                background-color: #000000b0;
                width: 35vw;
                gap: 2rem;
                color: white;
                .container {
                    gap: 2rem;
                    input {
                        padding: 0.5rem 1rem;
                        width: 20rem;
                        font-size:1rem
                    }
                    button {
                        padding: 0.5rem 1rem;
                        background-color: #e50914;
                        border: none;
                        cursor: pointer;
                        color: white;
                        border-radius: 0.2rem;
                        font-weight: bolder;
                        font-size: 1.05rem;
                    }
                }
            }
        }
    }
`;

export default Login