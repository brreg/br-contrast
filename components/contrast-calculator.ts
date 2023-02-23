import { APCA } from '@/data/apcaTable';
import { AllColorOptionsInFlatArray } from '@/data/colors';
import { calcAPCA } from 'apca-w3';
// @ts-ignore
import { colorParsley } from 'colorparsley';

export function GetContrast(textColor: string, backgroundColor: string) {
  if (!textColor || !backgroundColor) {
    return ""
  } else {
    const apca = +calcAPCA( colorParsley(textColor), colorParsley(backgroundColor))
    return Math.abs(apca).toFixed(0)
  }
}

export function GetMinimumAllowedLcValue(fontWeight: number, fontSize: number) {
  const fontWeightObj = APCA.find( (i) => i.value === fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === fontSize)
  return obj?.minimumValidLc
}

export function FontWeightAndSizeIsValid(fontWeight: number, fontSize: number) {
  const fontWeightObj = APCA.find( (i) => i.value === fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === fontSize)
  return obj?.valid
}

export function FindBackgroundColorWithHighestContrast(textColor: string) {
  let colorWithHighestContrast = ""
  let highestLcValue = 0

  AllColorOptionsInFlatArray.map( (color) => {
    let Lc = Math.abs(+calcAPCA( colorParsley(textColor), colorParsley(color.value)))
    if (Lc > highestLcValue) {
      highestLcValue = Lc
      colorWithHighestContrast = color.value
    }
  })

  return colorWithHighestContrast
}

export function FindTextColorWithHighestContrast(backgroundColor: string) {
  let colorWithHighestContrast = ""
  let highestLcValue = 0

  AllColorOptionsInFlatArray.map( (color) => {
    let Lc = Math.abs(+calcAPCA( colorParsley(color.value), colorParsley(backgroundColor)))
    if (Lc > highestLcValue) {
      highestLcValue = Lc
      colorWithHighestContrast = color.value
    }
  })
  return colorWithHighestContrast
}

// export function getFontSize(textColor, backgroundColor, weightIndex) {
//   const contrast = getContrast(textColor, backgroundColor)
//   const fontArray = fontLookupAPCA(parseFloat(contrast))
//   return fontArray[weightIndex]
// }