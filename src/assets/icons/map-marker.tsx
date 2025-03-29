import { createSvgIcon } from '@mui/material'

export const MapMarker = createSvgIcon(
  <svg viewBox='0 0 38 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_d_606_12824)'>
      <path
        d='M34 15.1852C34 23.5717 27.2843 40 19 40C10.7157 40 4 23.5717 4 15.1852C4 6.79864 10.7157 0 19 0C27.2843 0 34 6.79864 34 15.1852Z'
        fill='currentColor'
      />
    </g>
    <g filter='url(#filter1_d_606_12824)'>
      <circle cx='19' cy='15' r='7' fill='white' />
    </g>
    <defs>
      <filter
        id='filter0_d_606_12824'
        x='0'
        y='0'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_606_12824' />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_606_12824'
          result='shape'
        />
      </filter>
      <filter
        id='filter1_d_606_12824'
        x='8'
        y='8'
        width='22'
        height='22'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_606_12824' />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_606_12824'
          result='shape'
        />
      </filter>
    </defs>
  </svg>,
  'MapMarker'
)
