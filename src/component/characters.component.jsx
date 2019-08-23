import React from 'react';

// Importar Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Grid, 
        Card,
        CardMedia, 
        CardContent, 
        CardActions,
        CardActionArea, 
        Typography, 
        InputBase,
        Divider,
        Button,
        Paper,
        Fab} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// HttP
import axios from 'axios';

// Assets
import image1 from '../shared/img/default.jpg'

// Styles
import './styles.css';

const theme = createMuiTheme();

export default class CharacterComponent extends React.Component {
  
  state = {
    episodes: [],
    paginator: {},
    page: 0,
    offset: 0,
    search: ''
  }

  search = '';
  
  useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    fab: {
      margin: theme.spacing(1)
    },
    card: {
      height: 400
    },
    media: {
      height: 340,
    },
  }));

  /**
   * Init
   */
  componentDidMount() {
    this.handleClick(1);
  }

  /**
   * Initalization APi
   * @param offset items per page
   */
  handleClick(offset) {
    const search = document.getElementById('search');

    const page = this.state.episodes.length > 0 ? (offset / 20) + 1 : offset;
    const params = search.value ? `page=${page}&name=${search.value}` : `page=${page}`;
    console.log(offset);
    axios.get(`https://rickandmortyapi.com/api/${this.props.uri}/?${params}`).then( res => {
      const episodes = res.data.results;
      const paginator = res.data.info;
      const search = '';
      console.log(res.data);
      this.setState({episodes, paginator, page, offset, search});
    }, 
    error => {
      const episodes = [];
      const paginator = 1;
      this.setState({episodes, paginator, page, offset, search});
      console.log('Error');
    });
    
  }

  handleReset() {
    const search = document.getElementById('search');
    search.value = '';
    this.handleClick(0);
  }

  /**
   * Render Component
   */
  render() {
    const classes = this.useStyles;
    return (
      <div className={classes.root}>
        <Paper>
          <InputBase
              className={classes.input}
              placeholder="Buscar"
              id="search"
              inputProps={{ 'aria-label': 'search' }}
            />
          <Fab color="primary" className={classes.fab} aria-label="search" onClick={(e) => this.handleClick(1)} >
            <SearchIcon />
          </Fab>
          <Fab color="default" aria-label="search" onClick={(e) => this.handleReset()} className={classes.fab}>
            <ThreeSixtyIcon />
          </Fab>
          <Divider className={classes.divider} />
        </Paper>
        <Grid container spacing={3}>
            {
                this.state.episodes.map(episode => (
                  <Grid item xs={12} sm={4} key={episode.id}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className='styleCardMedia'
                            image={episode.image ? episode.image: image1 }
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {episode.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              <b>Genero:</b> {episode.gender}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              <b>Especie:</b> {episode.species}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              <b>Estatus:</b> {episode.status}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions style={{
                          display: this.props.uri === 'episode' ? 'none' : 'block'
                        }}>
                          <Button href={`#/episode/${episode.name}/${episode.episode.map(x => x.split('/')[5]).join()}`} 
                          size="small" color="primary">
                            Capitulos
                          </Button>
                        </CardActions>
                      </Card>
                  </Grid>
                ))
            }
        </Grid>
        <Grid item xs={12} sm={12}>
        {
          this.state.episodes.length === 0 &&
          <Card>
            <CardContent>
              <h2>No hay resultados</h2>
            </CardContent>
          </Card>
          
        }
        </Grid>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={20}
          offset={this.state.offset}
          total={this.state.paginator.count}
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </MuiThemeProvider>
      </div>
      )
  }
}
  