import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

const rowOffset = ({ rowIdx, sqrt }) => rowIdx * sqrt;
const isEmptyRow = ({ rowIdx, itemCount, sqrt }) => rowOffset({ rowIdx, sqrt }) >= itemCount;
const itemNumber = ({ rowIdx, sqrt, colIdx }) => rowOffset({ rowIdx, sqrt }) + colIdx + 1;
const isEmptyItem = ({ colIdx, itemCount, sqrt, rowIdx }) => itemNumber({ rowIdx, sqrt, colIdx }) > itemCount;
const fillArray = (count) => [...Array(count).keys()];


const Grid = ({ itemCount }) => {
  const sqrt = Math.ceil(Math.sqrt(itemCount));
  const arr = fillArray(sqrt);
  return (
    <div className="container">
      {arr.map((rowIdx) => (
        <div className={classNames('row', { empty: isEmptyRow({ rowIdx, itemCount, sqrt }) })} key={`row${rowIdx}`}>
          {arr.map((colIdx) => 
            isEmptyItem({ colIdx, itemCount, sqrt, rowIdx }) ? (
              <div key={`col${colIdx}`} className="item placeholder" />
            ) : (
              <div key={`col${colIdx}`} className="item">
                item {itemNumber({ rowIdx, sqrt, colIdx })}
              </div>
            ))
          }
        </div>
      ))}
  </div>
  )
}

export const App = () => {
  const [itemCount, setItemCount] = useState(1);

  const onChange = (e) => setItemCount(Number(e.target.value));

  return (
    <div>
      <label htmlFor="number">Number of items</label>
      <input value={itemCount} onChange={onChange} id="number" type="number" />
      <Grid itemCount={itemCount} />
    </div>
  );
}
