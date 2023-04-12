import React, { useEffect, useEffect, useState } from 'react'
import {ImCheckboxUnchecked ,ImCheckboxChecked} from 'react-icons/im'

function Archiveselection({item , handleselected}) {

  

  return (
    <li className=' flex  padding12' onClick={()=>{handleselected(!item.selected, item);}}> 

    <div > {item.item.selected ? < ImCheckboxChecked />: <ImCheckboxUnchecked /> }</div>
    <div>{item !== undefined  && item.itemselect.sub_name}</div>
    <p> { item !== undefined  && item.itemselect.yearlvl}{ item !== undefined  && item.itemselect.sec_name}</p>
 
    <div  className='marginleft12'> 
    <div>{item.itemselect.sub_name}</div>
    <p> {item.itemselect.yearlvl}{item.itemselect.sec_name}</p>
    </div>

    
  </li>
  )
}

export default Archiveselection