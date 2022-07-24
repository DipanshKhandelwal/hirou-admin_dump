import React from 'react';
import { PURPLE } from '.././../constants/colors';

const COLOR = PURPLE;

export default function Recycle({ color = COLOR }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='24'
      viewBox='0 0 28 24'
    >
      <defs>
        <clipPath id='clip-path'>
          <path
            id='Path_1884'
            data-name='Path 1884'
            d='M0,0H28V24H0Z'
            transform='translate(6425 3909)'
            fill='#e0e0e0'
          />
        </clipPath>
      </defs>
      <g
        id='Mask_Group_19'
        data-name='Mask Group 19'
        transform='translate(-6425 -3909)'
        clip-path='url(#clip-path)'
      >
        <g
          id='Group_1073'
          data-name='Group 1073'
          transform='translate(6422.35 3894.722)'
        >
          <g
            id='Group_1072'
            data-name='Group 1072'
            transform='translate(5.001 15.798)'
          >
            <path
              id='パス_1089'
              data-name='パス 1089'
              d='M23.267,42.133l-6.143-5.119,6.143-5.37v2.45h3.2v1h-4.2V33.847L18.665,37l3.6,3V38.717h4.82l2.21-4.2L26.558,29.89l.861-.509,3.024,5.109-2.751,5.228H23.267Z'
              transform='translate(-7.205 -20.728)'
              fill={color}
            />
            <path
              id='パス_1090'
              data-name='パス 1090'
              d='M15.422,40.544H8.661L5.755,35.465l2.2-3.819L5.867,30.438l7.5-2.761,1.579,8.005-2.122-1.225-1.6,2.769-.866-.5,2.1-3.635,1.08.624-.926-4.695-4.4,1.619,1.11.641L6.908,35.467l2.333,4.077h6.181Z'
              transform='translate(-6.331 -20.63)'
              fill={color}
            />
            <path
              id='パス_1091'
              data-name='パス 1091'
              d='M24.66,29.474l-7.722-2.635,2.122-1.225-1.6-2.769.866-.5,2.1,3.635-1.081.624,4.529,1.545.8-4.621-1.089.629L21.226,20.5H16.243l-2.471,4.368-.87-.492L15.66,19.5h6.111l2.138,3.315,2.114-1.22Z'
              transform='translate(-6.861 -20)'
              fill={color}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
