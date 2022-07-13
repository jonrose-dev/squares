import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

const rowOffset = ({ rowIdx, sqrt }) => rowIdx * sqrt;
const isEmptyRow = ({ rowIdx, itemCount, sqrt }) => rowOffset({ rowIdx, sqrt }) >= itemCount;
const itemNumber = ({ rowIdx, sqrt, colIdx }) => rowOffset({ rowIdx, sqrt }) + colIdx + 1;
const isEmptyItem = ({ colIdx, itemCount, sqrt, rowIdx }) => itemNumber({ rowIdx, sqrt, colIdx }) > itemCount;
const fillArray = (count) => [...Array(count).keys()];

export const App = () => {
  const [itemCount, setItemCount] = useState(3);
  const sqrt = itemCount > 2 ? Math.ceil(Math.sqrt(itemCount)) : 1;
  const columnCount = sqrt < 2 ? itemCount : sqrt;
  const onChange = (e) => setItemCount(Number(e.target.value));

  return (
    <div>
      <label htmlFor="number">Number of items</label>
      <input value={itemCount} onChange={onChange} id="number" type="number" />
      <div className="container">
        {fillArray(sqrt).map((rowIdx) => (
            <div className={classNames('row', { empty: isEmptyRow({ rowIdx, itemCount, sqrt }) })} key={`row${rowIdx}`}>
              {fillArray(columnCount).map((colIdx) => 
                isEmptyItem({ colIdx, itemCount, sqrt, rowIdx }) ? (
                  <div key={`col${colIdx}`} className="placeholder" />
                ) : (
                  <div key={`col${colIdx}`} className="item">
                    item {itemNumber({ rowIdx, sqrt, colIdx })}
                  </div>
                ))
              }
            </div>
          ))}
      </div>
    </div>
  );
}
