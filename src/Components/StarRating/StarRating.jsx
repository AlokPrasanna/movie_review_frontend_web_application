import React, { useState } from 'react';
import {FaStar} from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../../Style/StarRating.scss'

function StarRating({onChange}) {
    const [rate,setRating] = useState(null);
    //const [rateColor,setRateColor] = useState(null);

    const handleStarClick = (currentRate) => {
      Swal.fire({
        title: `Do you want to rate ${currentRate} stars?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            background:'#040514',
            color:'yellow',
            confirmButtonText: 'Yes, rate it!',
            cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            setRating(currentRate);
            onChange(currentRate);
            Swal.fire({
              title: `You rated ${currentRate} stars!`,
              icon: 'success',
              background:'#040514',
              color:'yellow',
              confirmButtonColor: 'green',
              customClass: {
                confirmButton: 'swal-confirm-button'
            }
            });
        }
    });
   }

  return (
    <div className='lable'>
      {[...Array(5)].map((star,index) =>{
        const currentRate = index+1;
        return (
            <label>
                <input type='radio' name='rate' id={`radio-${currentRate}`}
                    value={currentRate}
                    onClick={() => handleStarClick(currentRate)}
                />
                <FaStar size={35}
                    color={currentRate <= rate ? "yellow" : "grey"}
                />
            </label>
        )
      })}
    </div>
  )
}

export default StarRating
