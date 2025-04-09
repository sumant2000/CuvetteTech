import React from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };
  
  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };
  
  const handleSortOrderChange = (e) => {
    onFilterChange({ sortOrder: e.target.value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={filters.sortBy}
          onChange={handleSortChange}
        >
          <option value="appliedDate">Application Date</option>
          <option value="company">Company</option>
          <option value="role">Role</option>
          <option value="status">Status</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-order">Order:</label>
        <select
          id="sort-order"
          value={filters.sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
