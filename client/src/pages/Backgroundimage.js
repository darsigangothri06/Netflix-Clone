import background from '../assets/login.jpg'
import styled from 'styled-components'

const BackgroundImage = (props) => {
    return (
        <Container>
            <img src={background} alt='baclground'/>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    img{
        height:100vh;
        width:100vw;
    }
`;

export default BackgroundImage