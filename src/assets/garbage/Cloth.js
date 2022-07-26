import React from 'react';
import { ORANGE } from '.././../constants/colors';

const COLOR = ORANGE;

export default function Cloth({ color = COLOR }) {
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
            id='Rectangle_307'
            data-name='Rectangle 307'
            width='28'
            height='24'
            transform='translate(6472 3824)'
            fill={color}
          />
        </clipPath>
        <clipPath id='clip-path-2'>
          <rect
            id='Rectangle_306'
            data-name='Rectangle 306'
            width='26'
            height='20'
            transform='translate(0 -0.146)'
            fill={color}
          />
        </clipPath>
      </defs>
      <g
        id='Mask_Group_14'
        data-name='Mask Group 14'
        transform='translate(-6472 -3824)'
        clip-path='url(#clip-path)'
      >
        <g
          id='Group_1069'
          data-name='Group 1069'
          transform='translate(6473 3826.146)'
          clip-path='url(#clip-path-2)'
        >
          <path
            id='Path_1088'
            data-name='Path 1088'
            d='M24.7,9.817a2.275,2.275,0,0,0,.992-1.853,2.305,2.305,0,0,0-1.207-1.991L24.7,5.8a2.271,2.271,0,0,0,.993-1.852,2.463,2.463,0,0,0-2.3-2.344l.364-.294a.7.7,0,0,0,.223-.828A.826.826,0,0,0,23.2,0H9.046A2.957,2.957,0,0,0,7.191.64L1.18,5.49A2.319,2.319,0,0,0,0,7.46,2.308,2.308,0,0,0,1.266,9.466a2.224,2.224,0,0,0-.013,4.008,2.31,2.31,0,0,0-1.253,2,2.247,2.247,0,0,0,.9,1.767A1.334,1.334,0,0,0,0,18.475a1.459,1.459,0,0,0,1.525,1.379h14.81a2.7,2.7,0,0,0,2.119-.987L24.7,13.818a2.271,2.271,0,0,0,.993-1.852,2.32,2.32,0,0,0-1.2-1.985s.2-.164.2-.163M7.7,1.156A2.145,2.145,0,0,1,9.046.693H23.2a.059.059,0,0,1,.06.038.05.05,0,0,1-.017.064l-4.77,3.852a2.144,2.144,0,0,1-1.346.464H2.8Zm8.633,18H1.525a.726.726,0,0,1-.759-.686.7.7,0,0,1,.759-.653h14.77v-.693H2.611A1.759,1.759,0,0,1,.766,15.477,1.76,1.76,0,0,1,2.611,13.82H16.295v-.693H2.611A1.759,1.759,0,0,1,.766,11.475,1.76,1.76,0,0,1,2.611,9.819H16.295V9.112H2.611A1.759,1.759,0,0,1,.766,7.46,1.76,1.76,0,0,1,2.611,5.8H17.127a2.956,2.956,0,0,0,1.856-.64l3.57-2.883h.529a1.766,1.766,0,0,1,1.845,1.669,1.588,1.588,0,0,1-.579,1.211s-5.405,4.365-5.405,4.365c0-.017,0-.033,0-.05a2.5,2.5,0,0,0-2.611-2.362H2.646v.693H16.335A1.766,1.766,0,0,1,18.18,9.475a1.76,1.76,0,0,1-1.845,1.654H2.646v.693H16.335a1.766,1.766,0,0,1,1.845,1.669,1.76,1.76,0,0,1-1.845,1.654H2.646v.693H16.335a1.76,1.76,0,0,1,1.845,1.654,1.766,1.766,0,0,1-1.845,1.669m8.593-7.195a1.588,1.588,0,0,1-.579,1.211s-5.405,4.364-5.405,4.364c0-.017,0-.033,0-.05a2.308,2.308,0,0,0-1.253-2,2.546,2.546,0,0,0,.739-.608l5.46-4.413a1.663,1.663,0,0,1,1.035,1.5m-.579-2.79s-5.405,4.365-5.405,4.365c0-.017,0-.033,0-.05a2.324,2.324,0,0,0-1.255-2.014,2.549,2.549,0,0,0,.741-.61l5.448-4.4a1.654,1.654,0,0,1,1.048,1.5,1.588,1.588,0,0,1-.579,1.211'
            transform='translate(0 0)'
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
}
