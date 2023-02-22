// @ts-ignore
import { calcAPCA, fontLookupAPCA } from 'apca-w3';
// @ts-ignore
import { colorParsley } from 'colorparsley';

export function GetContrast(textColor: string, backgroundColor: string, fontSize: number, fontWeight: number) {
  if (!textColor || !backgroundColor) {
    return ""
  } else {
    const apac = calcAPCA( colorParsley(textColor), colorParsley(backgroundColor))
    return Math.abs(apac).toFixed(1)
  }
}

// export function getFontSize(textColor, backgroundColor, weightIndex) {
//   const contrast = getContrast(textColor, backgroundColor)
//   const fontArray = fontLookupAPCA(parseFloat(contrast))
//   return fontArray[weightIndex]
// }