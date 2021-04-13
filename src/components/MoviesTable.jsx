import React, { Component } from 'react';
import Table from './common/Table';
import Like from './Like';

class MoviesTable extends Component {
    state = { 
        columns: [
            {path: 'title', label: 'Title'},
            {path: 'genre.name', label: 'Genre'},
            {path: 'numberInStock', label: 'Stock'},
            {path: 'dailyRentalRate', label: 'Rate'},
            {
                key: "like",
                content: movie => (
                  <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
                )
              },
              {
                key: "delete",
                content: movie => (
                  <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                )
              }
        ]
    }
    render() {
        const { movies, onSort, sortColumn } = this.props; 
        
        return (
            <Table data={movies} sortColumn={sortColumn} columns={this.state.columns} onSort={onSort}/>
         );
    }
}
 
export default MoviesTable;