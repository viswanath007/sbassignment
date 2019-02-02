import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const rows = [
  { id: 'productName', numeric: false, disablePadding: false, label: 'Product Name' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
];

class EnhancedTableHead extends React.Component {
  render() {

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                // align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                {row.label}
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Products
          </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={props.toggleForm}
        >
          Add
        </Button>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    // width: '100%',
    maxWidth: `800px`,
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 600,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

// const data = [
//   { productName: 'Cupcake', quantity: 305 },
//   { productName: 'Donut', quantity: 452 },
//   { productName: 'Eclair', quantity: 262 },
//   { productName: 'Frozen yoghurt', quantity: 159 },
//   { productName: 'Gingerbread', quantity: 356 },
//   { productName: 'Honeycomb', quantity: 408 },
//   { productName: 'Ice cream sandwich', quantity: 237 },
//   { productName: 'Jelly Bean', quantity: 375 },
//   { productName: 'KitKat', quantity: 518 },
//   { productName: 'Lollipop', quantity: 392 },
//   { productName: 'Nougat', quantity: 360 },
//   { productName: 'Oreo', quantity: 437 },
//     ];

class EnhancedTable extends React.Component {
  state = {
    data: [],
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, data } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar toggleForm={this.props.toggleForm} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, i) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={i}
                    >
                      <TableCell component="th" scope="row">
                        {n.productName}
                      </TableCell>
                      <TableCell>{n.quantity}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);