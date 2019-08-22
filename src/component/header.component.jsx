import React from 'react';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';


class HeaderComponent extends React.Component {
  
  /**
   * Render Component
   */
  render() {
    const {title} = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
          <IconButton edge="start" color="inherit" href="/home" aria-label="ArrowBack">
                    <ArrowBack />
                  </IconButton>
            <Typography variant="h6">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default HeaderComponent;