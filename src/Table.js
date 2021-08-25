import numeral from 'numeral'
import React from 'react'
import './Table.css'

function TableData({ countries }) {
  return (
    <div className='table'>
      <table>
        <tr>
          <th>Flag</th>
          <th>Country</th>
          <th>Cases</th>
        </tr>
        {countries.map(({ name, cases, flag }) => (
          <tr>
            <td className='table__flag'>
              <img src={`${flag}`} alt='flag' className='table__flagImg' />
            </td>
            <td>{name}</td>
            <td className='table__cases'>{numeral(cases).format('0,0')}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default TableData
