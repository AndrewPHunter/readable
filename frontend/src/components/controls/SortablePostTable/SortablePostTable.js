import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper} from 'react-md/lib/Papers';
import {DataTable, TableHeader, TableBody, TableRow, TableColumn} from 'react-md/lib/DataTables';
import {FontIcon} from 'react-md/lib/FontIcons';
import predicate from 'sort-by';

import './SortablePostTable.css';

export default class SortablePostTable extends Component{

  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rowSelected: PropTypes.func,
    sortBy: PropTypes.string,
    ascending: PropTypes.bool,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired
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
        <TableColumn sorted={(by==='commentCount') ? ascending: null} role="button" onClick={this.sortPosts.bind(null, 'commentCount', false)}>
          Comment Count
        </TableColumn>
        <TableColumn sorted={(by==='voteScore') ? ascending : null} role="button" onClick={this.sortPosts.bind(null, 'voteScore', false)}>
          Vote Score
        </TableColumn>
        <TableColumn>
          Vote
        </TableColumn>
      </TableRow>
    </TableHeader>
  );

  mapRowsToTableRows = (rows, upVote, downVote)=>(
    rows.map(row=>(
      <TableRow key={row.id} selectable={false}>
        <TableColumn onClick={this.props.rowSelected.bind(null, row)} className='md-pointer--hover'>
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
        <TableColumn numeric>
          {row.commentCount}
        </TableColumn>
        <TableColumn numeric>
          {row.voteScore}
        </TableColumn>
        <TableColumn>
          <div className='post-table--vote'>
            <FontIcon className="thumbUp md-pointer--hover" onClick={upVote.bind(null, row.id)}>thumb_up</FontIcon>
            <FontIcon className="thumbDown md-pointer--hover" onClick={downVote.bind(null, row.id)}>thumb_down</FontIcon>
          </div>
        </TableColumn>
      </TableRow>
    ))
  );

  render(){

    const {id, upVote, downVote} = this.props;
    const {rows, sortBy, ascending} = this.state;
    const tableHeader = this.buildTableHeader({by: sortBy.replace('-',''), ascending});
    const tableRows = this.mapRowsToTableRows(rows, upVote, downVote);


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
