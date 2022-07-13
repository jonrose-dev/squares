import React, {useState} from 'react';
import './App.css';

export const App = () => {
  const [itemCount, setItemCount] = useState(3);
  const sqrt = itemCount > 2 ? Math.ceil(Math.sqrt(itemCount)) : 1;
  const columnCount = sqrt < 2 ? itemCount : sqrt;
  return (
    <div className='App'>
      <label htmlFor="number">Number of items</label>
      <input value={itemCount} onChange={(e) => setItemCount(e.target.value)} id="number" type="number" />
      <div className="container">
        {Array.from({ length: sqrt }, (_, rowIdx) => {
          const isEmpty = (rowIdx * sqrt) >= itemCount;
          return (
            <div className={`row${isEmpty ? ' empty' : ''}`} key={`row${rowIdx}`}>
            {Array.from({ length: columnCount }, (_, colIdx) => {
              const itemNumber = (rowIdx * sqrt) + colIdx + 1;
              if (itemNumber > itemCount) {
                return <div key={`col${colIdx}`} className="item placeholder" />
              }
              return (
                <div key={`col${colIdx}`} className="item">item {(rowIdx * sqrt) + colIdx + 1}</div>
              )})
            }
            </div>
          )})}
      </div>
    </div>
  );
}