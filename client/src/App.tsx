import { motion } from 'framer-motion';

function App() {
  return (
    <div className='App'>
      <svg
        width='691'
        height='121'
        viewBox='0 0 691 121'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.path
          d='M71.3475 9.0597H4V60.1045M4 121V60.1045M4 60.1045H52.4902M138.695 104.881C127.021 116.522 81.0924 116.238 79.4292 76.2239M79.4292 76.2239C79.4292 56.5556 84.817 39.5075 112.654 39.5075C142.107 39.5075 144.168 62.9048 141.389 76.2239H79.4292ZM177.617 47.3492C184.801 43.7671 197.242 39.5075 205.145 39.5075C215.022 39.5075 229.39 43.9851 229.39 54.7313V78.9104M229.39 78.9104C209.934 72.6418 171.74 67.2687 174.614 95.9254C178.206 131.746 225.798 106.672 229.39 104.881M229.39 78.9104V104.881M229.39 104.881V121M262.614 102.194C271.594 112.94 302.484 126.731 314.696 103.09C318.288 92.3433 316.672 83.5672 292.247 77.1194C261.716 69.0597 262.614 39.5075 290.451 39.5075C301.227 39.5075 307.513 43.9851 314.696 49.3582M387.432 112.045C377.554 118.015 357.799 123.149 357.799 95.9254V41.2985M357.799 41.2985V17.1194C357.799 15.6269 358.697 4.58209 357.799 1M357.799 41.2985H335.35M357.799 41.2985H387.432M455.563 59.2305C479.799 59.6459 490.758 66.1403 492.494 85.1791C493.925 100.876 477.228 110.254 469.147 112.045C461.065 113.836 420.657 112.94 420.657 112.94V59.209M455.563 59.2305C454.719 59.2161 453.859 59.209 452.983 59.209M455.563 59.2305C470.199 58.5678 486.208 44.8758 486.208 29.6567C486.208 16.2239 475.432 9.0597 467.351 9.0597H420.657V59.209M455.563 59.2305C454.697 59.2697 453.836 59.2633 452.983 59.209M452.983 59.209H420.657M613.719 112.045C603.842 118.015 584.086 123.149 584.086 95.9254V41.2985M584.086 41.2985V17.1194C584.086 15.6269 584.984 4.58209 584.086 1M584.086 41.2985H561.637M584.086 41.2985H613.719M633.475 103.09C642.454 113.836 673.344 127.627 685.557 103.985C689.149 93.2388 687.532 84.4627 663.108 78.0149C632.577 69.9552 633.475 40.403 661.312 40.403C672.087 40.403 678.373 44.8806 685.557 50.2537M533.8 33.2388V121M536.494 9.0597C536.494 10.5435 535.288 11.7463 533.8 11.7463C532.313 11.7463 531.106 10.5435 531.106 9.0597C531.106 7.57595 532.313 6.37313 533.8 6.37313C535.288 6.37313 536.494 7.57595 536.494 9.0597Z'
          stroke='#F5F5F5'
          strokeWidth='7'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5 }}
        />
      </svg>
    </div>
  );
}

export default App;
