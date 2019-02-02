import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import {
  addUser,
  authenticateUser,
  checkUserNameAvailability 
} from '../store/actions/user'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  pos: {
    marginTop: theme.spacing.unit * 2,
    // marginBottom: theme.spacing.unit * 2,
  }
});

class SignIn extends Component {

  state = {
    userName: null,
    password: null,
    isNewUser: true,
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    if(this.state.isNewUser){
      this.props.addUser(this.state);
    } else {
      this.props.authenticateUser(this.state);
    }    
  }

  handleChange = name => e => {
    // console.log(name,e.target.value);
    this.setState({
      [name]: e.target.value
    });
  }

  checkAvailability = () => {
    const {userName} = this.state;
    if(userName){
      this.props.checkUserNameAvailability({userName});
    }
  }

  toggleUserStatus = () => {
    this.setState({
      isNewUser: !this.state.isNewUser
    })
  }

  render(){
    const { classes, isAvailable } = this.props;
    const {isNewUser} = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isNewUser ? "Sign Up" : "Sign in"}
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">UserName</InputLabel>
              <Input id="userName" onBlur={this.checkAvailability} onChange={this.handleChange('userName')} name="userName" autoComplete="userName" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" onChange={this.handleChange('password')} type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button
              disabled={!isAvailable && isNewUser}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
          </Button>
            <Typography className={classes.pos}  color="textSecondary">
              {isNewUser ? "Already a member ?" : "not have an account ?"}
            </Typography>
            <Button
              color="primary"
              size="small"
              onClick={this.toggleUserStatus}
            >
              {isNewUser ? "sign in" : "sign up"}
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { userName, isAutherised, isAvailable } = state.user;
  return {
    userName,
    isAutherised,
    isAvailable
  };
}

const dispatchToProps = (dispatch) => ({
  addUser: (data) => dispatch(addUser(data)),
  authenticateUser: (data) => dispatch(authenticateUser(data)),
  checkUserNameAvailability: (data) => dispatch(checkUserNameAvailability(data))
})

export default connect(mapStateToProps, dispatchToProps)(withStyles(styles)(SignIn));