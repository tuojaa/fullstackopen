import React from 'react'
import LoggedInUser from './LoggedInUser'
import { Link } from 'react-router-dom'
import { Button,
  AppBar,
  Toolbar
}  from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1
  }
}))

const AppMenu = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users/">
          Users
        </Button>
        <div className={classes.grow} />
        <LoggedInUser />
      </Toolbar>
    </AppBar>
  )
}

export default AppMenu