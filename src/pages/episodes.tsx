import React from 'react';
import HeaderComponent from '../component/header.component';
import EpisodesComponent from '../component/episodes.component';
import { CssBaseline, Container } from '@material-ui/core';

/**
 * Load Header and Templates
 * @param match obtain query-params
 */
const Episodes = ( match:any ) => {
    console.log(match);
        return (
            <React.Fragment>
                <HeaderComponent title={`Episodios de ${match.match.params.name}`} />
                <CssBaseline />
                <Container maxWidth="lg">
                    <EpisodesComponent uri={`/episode/${match.match.params.id}`} />
                </Container>
            </React.Fragment>
        )
}

export default Episodes;