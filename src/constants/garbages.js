import {
  TEAL,
  DARK_GREEN,
  LIGHT_GREEN,
  DARK_BLUE,
  LIGHT_BLUE,
  YELLOW,
  ORANGE,
  PURPLE,
} from './colors';

import Book from '../assets/garbage/Book';
import Bottle from '../assets/garbage/Bottle';
import Box from '../assets/garbage/Box';
import Cloth from '../assets/garbage/Cloth';
import Glass from '../assets/garbage/Glass';
import Newspaper from '../assets/garbage/Newspaper';
import Packages from '../assets/garbage/Packages';
import Recycle from '../assets/garbage/Recycle';

export const GarbageTypes = {
  cardboard: 'Garbage 1',
  petBottle: 'Garbage 2',
  cloth: 'Glass',
  manure: 'Plastic',
  newspaper: 'Cloth',
  carton: 'Electronics',
  cans: 'びん・缶・乾電池',
  magazine: '雑誌',
};

// export const GarbageTypes = {
//   cardboard: 'ダンボール',
//   petBottle: 'ペットボトル',
//   cloth: '古布',
//   manure: 'し尿',
//   newspaper: '新聞紙',
//   carton: '牛乳パック',
//   cans: 'びん・缶・乾電池',
//   magazine: '雑誌',
// };

export const getGarbageIcon = (type, color = 'white') => {
  if (!type) return null;

  switch (type) {
    case GarbageTypes.cardboard:
      return <Box color={color} />;
    case GarbageTypes.petBottle:
      return <Bottle color={color} />;
    case GarbageTypes.cloth:
      return <Cloth color={color} />;
    case GarbageTypes.manure:
      return <Recycle color={color} />;
    case GarbageTypes.newspaper:
      return <Newspaper color={color} />;
    case GarbageTypes.carton:
      return <Packages color={color} />;
    case GarbageTypes.cans:
      return <Glass color={color} />;
    case GarbageTypes.magazine:
      return <Book color={color} />;
    default:
      return <Recycle color={color} />;
  }
};

export const getGarbageColor = (type) => {
  switch (type) {
    case GarbageTypes.cardboard:
      return TEAL;
    case GarbageTypes.petBottle:
      return DARK_BLUE;
    case GarbageTypes.cloth:
      return ORANGE;
    case GarbageTypes.manure:
      return PURPLE;
    case GarbageTypes.newspaper:
      return LIGHT_GREEN;
    case GarbageTypes.carton:
      return LIGHT_BLUE;
    case GarbageTypes.cans:
      return YELLOW;
    case GarbageTypes.magazine:
      return DARK_GREEN;
  }
};
