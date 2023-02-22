import { ACPA } from '@/data/acpaTable';
import { AllColorOptionsInFlatArray } from '@/data/colors';
import { calcAPCA } from 'apca-w3';
// @ts-ignore
import { colorParsley } from 'colorparsley';

export function GetContrast(textColor: string, backgroundColor: string) {
  if (!textColor || !backgroundColor) {
    return ""
  } else {
    const apac = +calcAPCA( colorParsley(textColor), colorParsley(backgroundColor))
    return Math.abs(apac).toFixed(0)
  }
}

export function GetMinimumAllowedLcValue(fontWeight: number, fontSize: number) {
  const fontWeightObj = ACPA.find( (i) => i.value === fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === fontSize)
  return obj?.minimumValidLc
}

export function FontWeightAndSizeIsValid(fontWeight: number, fontSize: number) {
  const fontWeightObj = ACPA.find( (i) => i.value === fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === fontSize)
  return obj?.valid
}

export function FindBackgroundColorWithHigestContrast(textColor: string) {
  let colorWithHigestContrast = ""
  let higestLcValue = 0

  AllColorOptionsInFlatArray.map( (color) => {
    let Lc = Math.abs(+calcAPCA( colorParsley(textColor), colorParsley(color.value)))
    if (Lc > higestLcValue) {
      higestLcValue = Lc
      colorWithHigestContrast = color.value
    }
  })

  return colorWithHigestContrast
}

export function FindTextColorWithHigestContrast(backgroundColor: string) {
  let colorWithHigestContrast = ""
  let higestLcValue = 0

  AllColorOptionsInFlatArray.map( (color) => {
    let Lc = Math.abs(+calcAPCA( colorParsley(color.value), colorParsley(backgroundColor)))
    if (Lc > higestLcValue) {
      higestLcValue = Lc
      colorWithHigestContrast = color.value
    }
  })
  return colorWithHigestContrast
}

// export function getFontSize(textColor, backgroundColor, weightIndex) {
//   const contrast = getContrast(textColor, backgroundColor)
//   const fontArray = fontLookupAPCA(parseFloat(contrast))
//   return fontArray[weightIndex]
// }