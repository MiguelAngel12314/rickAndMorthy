import React from 'react';
import {Container, CssBaseline} from '@material-ui/core'
import HeaderComponent from '../component/header.component';
import CharacterComponent from '../component/characters.component';

/**
 * Load Header and Templates
 */
const Home = () => {
    return (
        <React.Fragment>
            <HeaderComponent title="Personajes de Rick and Morthy" showBack="false" />
            <CssBaseline />
            <Container maxWidth="lg">
                <CharacterComponent uri="character" />
            </Container>
        </React.Fragment>
    )
}

export default Home;