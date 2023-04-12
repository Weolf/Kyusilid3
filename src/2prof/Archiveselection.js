import React, { useEffect, useState } from 'react'
import {ImCheckboxUnchecked ,ImCheckboxChecked} from 'react-icons/im'



function Archiveselection({item , handleselected}) {

 
  

  return (
    <li className=' flex  padding12' onClick={()=>{handleselected(!item.selected, item);}}> 

    <div > {item.selected ? < ImCheckboxChecked />: <ImCheckboxUnchecked /> }</div>
    <div>{item !== undefined  && item.itemselect.sub_name}</div>
    <p> { item !== undefined  && item.itemselect.yearlvl}{ item !== undefined  && item.itemselect.sec_name}</p>
 
    <div  className='marginleft12'> 
    </div>

    
  </li>
  )
}

export default Archiveselection