import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';

import { makeStyles } from '@material-ui/core/styles';
import {Grid, 
        Card,
        CardMedia, 
        CardContent, 
        CardActions,
        CardActionArea, 
        Typography, 
        Button,
        Collapse} from '@material-ui/core';
import axios from 'axios';
import image1 from '../shared/img/default.jpg'
import './styles.css';

export default class EpisodesComponent extends React.Component {

  state = {
    episodes: [],
    paginator: {},
    page: 0,
    offset: 0,
    expand: []
  }
  useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {
      height: 400
    },
    media: {
      height: 340,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    }
  }));

  /**
   * Init
   */
  componentDidMount() {
    console.log(this.props.params, 'params');
    this.handleClick(1);
  }

  /**
   * Toggle of list view
   * @param expand episode id
   * @param index Number of item
   */
  handleExpandClick(expand, index) {
    expand[index] = !expand[index];
    console.log(index);
    
    this.setState({expand});
  }

  /**
   * Initalization APi
   * @param offset items per page
   */
  handleClick(offset) {
    const page = this.state.episodes.length > 0 ? (offset / 20) + 1 : offset;
    axios.get(`https://rickandmortyapi.com/api${this.props.uri}/?page=${page}`).then( res => {
      const episodes = res.data.length ? res.data: [res.data]; // verify if ${res.data} is an array if not it is added in an array. 
      const paginator = res.data.info;
      const expand = new Array(episodes.length);
      // const page = Number(res.data.info.next.split('=')[1]);
      console.log(res.data);
      this.setState({episodes, paginator, page, offset, expand});
    });
  }

  /**
   * Render Component
   */
  render() {
    const classes = this.useStyles;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            {
                this.state.episodes.map((episode, index) => (
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
                                <b>Episodio:</b> {episode.episode} 
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions style={{
                          display: this.props.uri === 'episode' ? 'none' : 'block'
                        }}>
                          <Button onClick={() => this.handleExpandClick(this.state.expand, index)} 
                                  aria-expanded={this.state.expand[index]} size="small" color="primary">
                            Información
                          </Button>
                        </CardActions>
                        <Collapse in={this.state.expand[index]} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>
                              <b>Fecha de Creación:</b> <Moment format="LL" >{episode.created}</Moment> 
                            </Typography>
                            <Typography paragraph>
                              <b>Fecha al aire:</b> <Moment format="LL" >{episode.air_date}</Moment> 
                            </Typography>
                          </CardContent>
                        </Collapse>
                      </Card>
                  </Grid>
                ))
            }
        </Grid>
      </div>
      )
  }
}
  