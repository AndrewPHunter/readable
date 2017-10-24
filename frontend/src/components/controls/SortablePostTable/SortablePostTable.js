import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper} from 'react-md/lib/Papers';
import {DataTable, TableHeader, TableBody, TableRow, TableColumn} from 'react-md/lib/DataTables';
import predicate from 'sort-by';

import './SortablePostTable.css';

export default class SortablePostTable extends Component{

  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rowSelected: PropTypes.func,
    sortBy: PropTypes.string,
    ascending: PropTypes.bool
  };

  static defaultProps = {
    rowSelected: ()=>{}, //no-op
    sortBy: 'title',
    ascending: true
  };

  constructor(props){
    super(props);

    this.state = {
      rows: this.props.rows,
      sortBy:this.props.sortBy,
      ascending: this.props.ascending
    };
  }

  componentDidMount = ()=>{
    this.sortPosts(this.state.sortBy, true);
  };

  componentWillReceiveProps = ({rows, sortBy, ascending})=>{

    this.setState({rows, sortBy, ascending}, () => {
      this.sortPosts(this.state.sortBy, true);
    });

  };

  sortPosts = (by, fromProps)=>{
    const {rows, sortBy, ascending} = this.state;
    let order, sortTerm;

    if(by === sortBy.replace('-','')){
      order = (fromProps) ? true : !ascending;
      sortTerm = (order) ? `${by}`:`-${by}`
    }else{
      sortTerm = `${by}`;
    }

    const sortedRows = rows.sort(predicate(sortTerm));

    this.setState({
      rows: sortedRows,
      sortBy: sortTerm,
      ascending: order
    })

  };

  buildTableHeader = ({by, ascending})=>(
    <TableHeader>
      <TableRow selectable={false}>
        <TableColumn sorted={(by==='title') ? ascending : null} grow role="button" onClick={this.sortPosts.bind(null,'title', false)}>
          Title
        </TableColumn>
        <TableColumn sorted={(by==='author') ? ascending : null} grow role="button" onClick={this.sortPosts.bind(null,'author', false)}>
          Author
        </TableColumn>
        <TableColumn sorted={(by==='category') ? ascending : null} role="button" onClick={this.sortPosts.bind(null,'category', false)}>
          Category
        </TableColumn>
        <TableColumn sorted={(by==='timestamp') ? ascending : null} role="button" onClick={this.sortPosts.bind(null,'timestamp', false)}>
          Date
        </TableColumn>
        <TableColumn sorted={(by==='voteScore') ? ascending : null} numeric role="button" onClick={this.sortPosts.bind(null, 'voteScore', false)}>
          Vote Score
        </TableColumn>
      </TableRow>
    </TableHeader>
  );

  mapRowsToTableRows = (rows)=>(
    rows.map(row=>(
      <TableRow key={row.id} selectable={false} onClick={this.props.rowSelected.bind(null, row)}>
        <TableColumn>
          {row.title}
        </TableColumn>
        <TableColumn>
          {row.author}
        </TableColumn>
        <TableColumn>
          {row.category}
        </TableColumn>
        <TableColumn>
          {new Date(row.timestamp).toLocaleDateString()}
        </TableColumn>
        <TableColumn>
          {row.voteScore}
        </TableColumn>
      </TableRow>
    ))
  );

  render(){

    const {id} = this.props;
    const {rows, sortBy, ascending} = this.state;
    const tableHeader = this.buildTableHeader({by: sortBy.replace('-',''), ascending});
    const tableRows = this.mapRowsToTableRows(rows);


    return(
      <Paper zDepth={1} className="postTable">
        <DataTable baseId={id}>
          {tableHeader}
          <TableBody>
            {tableRows}
          </TableBody>
        </DataTable>
      </Paper>
    );
  }
}
