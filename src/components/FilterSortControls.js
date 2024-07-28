import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import IosShareSharpIcon from '@mui/icons-material/IosShareSharp';
import { exportToExcel } from './exportToExcel';
import { useSelector } from 'react-redux';
import '../css/FilterSortControls.css';
import { Tooltip } from 'react-tooltip';

/**
 * FilterSortControls Component
 * 
 * This component provides UI controls for filtering and sorting data.
 * It includes buttons to show/hide filtering and sorting options,
 * and input fields for specifying filter values and sort criteria.
 * 
 * Props:
 * - onFilterChange: Function to call when filter values change.
 * - onSortChange: Function to call when sort values change.
 * - filterValues: Object containing current filter values (min and max).
 * - sortValues: Object containing current sort values (key and order).
 */

const FilterSortControls = ({ onFilterChange, onSortChange, filterValues, sortValues }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const expenses = useSelector(state => state.expenses);
  const incomes = useSelector(state => state.incomes);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      setShowSort(false);
      setShowExportOptions(false);
    }
  };

  const toggleSort = () => {
    setShowSort(!showSort);
    if (!showSort) {
      setShowFilter(false);
      setShowExportOptions(false);
    }
  };

  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
    if (!showExportOptions) {
      setShowFilter(false);
      setShowSort(false);
    }
  };

  // Handle changes to the minimum filter value
  const handleFilterMinChange = (e) => {
    onFilterChange({ ...filterValues, min: e.target.value });
  };

  // Handle changes to the maximum filter value
  const handleFilterMaxChange = (e) => {
    onFilterChange({ ...filterValues, max: e.target.value });
  };

  // Handle changes to the sort key
  const handleSortKeyChange = (e) => {
    onSortChange({ ...sortValues, key: e.target.value });
  };

  // Handle changes to the sort order
  const handleSortOrderChange = (e) => {
    onSortChange({ ...sortValues, order: e.target.value });
  };

  const handleExport = (type) => {
    exportToExcel(expenses, incomes, type);
    setShowExportOptions(false);
  };

  return (
    <div className="filter-sort-controls">
      <div className="actions">
        <button className="filter-button" onClick={toggleFilter} data-tooltip-id="filterTooltip">
          {showFilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
        </button>
        <Tooltip id="filterTooltip" place="bottom-end" effect="solid">
          Filter
        </Tooltip>
        <button className="sort-button" onClick={toggleSort} data-tooltip-id="sortTooltip">
          <SortIcon style={{ opacity: showSort ? 1 : 0.5 }} />
        </button>
        <Tooltip id="sortTooltip" place="bottom-end" effect="solid">
          Sort
        </Tooltip>
        <button className="export-button" onClick={toggleExportOptions} data-tooltip-id="exportTooltip">
          {showExportOptions ? <IosShareSharpIcon /> : <IosShareSharpIcon />}
        </button>
        <Tooltip id="exportTooltip" place="bottom-end" effect="solid">
          Export
        </Tooltip>
      </div>
      {showFilter && (
        <div className="filters">
          <input 
            type="number" 
            placeholder="Min Amount" 
            value={filterValues.min}
            onChange={handleFilterMinChange}
          />
          <input 
            type="number" 
            placeholder="Max Amount" 
            value={filterValues.max}
            onChange={handleFilterMaxChange}
          />
        </div>
      )}
      {showSort && (
        <div className="sort-options">
          <select value={sortValues.key} onChange={handleSortKeyChange}>
            <option value="id">Newest</option>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <select value={sortValues.order} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      )}
      {showExportOptions && (
        <div className="export-options">
          <button onClick={() => handleExport('Incomes')}>Export Incomes</button>
          <button onClick={() => handleExport('Expenses')}>Export Expenses</button>
          <button onClick={() => handleExport('Both')}>Export Both</button>
        </div>
      )}
    </div>
  );
};

export default FilterSortControls;
