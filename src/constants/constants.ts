import { TransformFactor } from "../components/interfaces/interfaces"

/*
Size XS screen: Up to 420 pixels
Size S screen: Between 421 pixels and 520 pixels
*/
export const ScreenSizeBreakpoint = {
  XS: 420,
  S: 520,
}

/*
Tiles XS Translation Factor: translates with factor 72.6
Tiles S Translation Factor: translates with factor 96.8
Tiles M Translation Factor: translates with factor 121
*/
export const TilesScreenTransformFactor: {[key: string]: TransformFactor} = {
  XS: 73,
  S: 97,
  M: 121
}