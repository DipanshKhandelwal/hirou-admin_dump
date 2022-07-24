import React from 'react';
import { DARK_GREEN } from '.././../constants/colors';

const COLOR = DARK_GREEN;

export default function Book({ color = COLOR }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='24'
      viewBox='0 0 28 24'
    >
      <defs>
        <clipPath id='clip-path'>
          <rect
            id='Rectangle_298'
            data-name='Rectangle 298'
            width='28'
            height='24'
            transform='translate(6356 3767)'
            fill='none'
          />
        </clipPath>
      </defs>
      <g
        id='Mask_Group_10'
        data-name='Mask Group 10'
        transform='translate(-6356 -3767)'
        clip-path='url(#clip-path)'
      >
        <path
          id='Path_1066'
          data-name='Path 1066'
          d='M24.883,1.643H23.574V.726a.5.5,0,0,0-.387-.491A13.807,13.807,0,0,0,12.68,2.722,13.857,13.857,0,0,0,2.181.235a.5.5,0,0,0-.387.491v.917H.485a.493.493,0,0,0-.485.5V19.1a.493.493,0,0,0,.485.5h24.4a.493.493,0,0,0,.485-.5V2.144a.493.493,0,0,0-.485-.5M13.168,3.594a12.959,12.959,0,0,1,4.366-2.123,5.231,5.231,0,0,1,.882-.164A23.873,23.873,0,0,1,20.9,1.06a7.761,7.761,0,0,1,1.085,0q.309.032.617.084v15.03c-3.445-.2-6.617,1.062-9.436,2.2ZM2.763,1.143A13.209,13.209,0,0,1,12.2,3.6v14.77c-2.621-1.054-5.546-2.216-8.712-2.216q-.36,0-.724.021ZM.969,2.645h.824V16.714a.509.509,0,0,0,.159.371.475.475,0,0,0,.373.128A16.858,16.858,0,0,1,10.062,18.6H.969ZM24.4,18.6H15.305a16.86,16.86,0,0,1,7.737-1.387.475.475,0,0,0,.373-.128.509.509,0,0,0,.159-.371V2.645H24.4Z'
          transform='translate(6357.348 3769.199)'
          fill={color}
        />
      </g>
    </svg>
  );
}
