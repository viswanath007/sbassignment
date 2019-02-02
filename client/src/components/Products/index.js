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

import Table from './Table';
import Form from './Form';
import {
  addProduct,
  getProducts,
} from '../../store/actions/product'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding:`50px`,
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

class Product extends Component {

  state = {
    showForm: false,
  };

  componentDidMount(){
    let { userName } = this.props;
    this.props.getProducts({userName});
  }

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

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  render(){
    const { classes, userName, products } = this.props;
    const { showForm} = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        {showForm ?
          <Form
            addProduct={this.props.addProduct}
            toggleForm={this.toggleForm}
            userName={userName} /> :
          <Table data={products || []} toggleForm={this.toggleForm} />}
      </main>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { product, products } = state.product;
  return {
    product,
    products,
    userName: state.user.userName
  };
}

const dispatchToProps = (dispatch) => ({
  addProduct: (data) => dispatch(addProduct(data)),
  getProducts: (data) => dispatch(getProducts(data)),
})

export default connect(mapStateToProps, dispatchToProps)(withStyles(styles)(Product));