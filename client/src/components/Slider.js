import styled from "styled-components"
import CardSlider from './CardSlider'

const Slider = ({movies}) => {
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to)
    }
    return(
        <Container>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
            <CardSlider title="New Releases" data={getMoviesFromRange(10,20)}/>
            <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20,30)}/>
            <CardSlider title="Popular On Netflix" data={getMoviesFromRange(30,40)}/>
            <CardSlider title="Action Movies" data={getMoviesFromRange(40,50)}/>
            <CardSlider title="Epix" data={getMoviesFromRange(50,60)}/>
        </Container>
    )
}

const Container = styled.div`

`;

export default Slider