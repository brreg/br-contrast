import { APCA } from '@/data/apcaTable';
import { green, red } from '@/data/colors';
import { WCAG } from '@/data/wcagTable';
import { calcAPCA } from 'apca-w3';
// @ts-ignore
import { colorParsley } from 'colorparsley';
import { hex } from 'wcag-contrast'

export interface ColorData {
  textColor: string,
  backgroundColor: string,
  fontSize: number,
  fontWeight: number,
}

export interface ScorecardColors {
  textAndBorderColor: string,
  backgroundColor: string,
}

export enum ColorStandards {
  APCA,
  WCAG_AAA,
  WCAG_AA,
}


export function CalculateAPCA_value(colorData: ColorData) {
  if (!colorData.textColor || !colorData.backgroundColor) {
    return ""
  } else {
    const apca = +calcAPCA( colorParsley(colorData.textColor), colorParsley(colorData.backgroundColor))
    return Math.abs(apca).toFixed(0)
  }
}

export function CalculateWCAG_value(colorData: ColorData) : string {
  if (colorData.textColor === '' || colorData.backgroundColor === '') {
    return ""
  }
  return hex(colorData.textColor, colorData.backgroundColor).toFixed(1)
}

export function IsAPCAvalid(colorData: ColorData) : boolean {
  const contrast = +CalculateAPCA_value(colorData)
  const minContrast = GetMinimumAllowedLcValue(colorData)

  if (minContrast === false) {
    return false
  }
  if (contrast > (minContrast as number)) {
    return true
  }
  return false
}

export function IsAAA_valid(colorData: ColorData) : boolean {
  const contrast = +CalculateWCAG_value(colorData)
  const minContrast = GetMinimumAllowed_AAA_Value(colorData)

  if (minContrast === false) {
    return false
  }
  if (contrast > (minContrast as number)) {
    return true
  }
  return false
}

export function IsAA_valid(colorData: ColorData) : boolean {
  const contrast = +CalculateWCAG_value(colorData)
  const minContrast = GetMinimumAllowed_AA_Value(colorData)

  if (minContrast === false) {
    return false
  }
  if (contrast > (minContrast as number)) {
    return true
  }
  return false
}

export function GetMinimumAllowedLcValue(colorData: ColorData) : number | boolean | undefined {
  const fontWeightObj = APCA.find( (i) => i.value === colorData.fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === colorData.fontSize)
  return obj?.minimumValidLc
}

export function GetMinimumAllowed_AAA_Value(colorData: ColorData) : number | boolean | undefined {
  const fontWeightObj = WCAG.find( (i) => i.value === colorData.fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === colorData.fontSize)
  return obj?.AAA_minimumValidContrast
}

export function GetMinimumAllowed_AA_Value(colorData: ColorData) : number | boolean | undefined {
  const fontWeightObj = WCAG.find( (i) => i.value === colorData.fontWeight)
  const obj = fontWeightObj?.array.find( (i) => i.fontSize === colorData.fontSize)
  return obj?.AA_minimumValidContrast
}

function isScoreValid(colorData: ColorData, standard: ColorStandards) : boolean {
  if (standard === ColorStandards.APCA) {
    return IsAPCAvalid(colorData)
  } else if (standard === ColorStandards.WCAG_AAA) {
    return IsAAA_valid(colorData)
  } else if (standard === ColorStandards.WCAG_AA) {
    return IsAA_valid(colorData)
  } else {
    return false
  }
}

export function LightColor(colorData: ColorData, standard: ColorStandards) : string {
  const valid = isScoreValid(colorData, standard)
  if (valid) {
    return green[1].value
  } else {
    return red[0].value
  }
}

export function HeavyColor(colorData: ColorData, standard: ColorStandards) : string {
  const valid = isScoreValid(colorData, standard)
  if (valid) {
    return green[7].value
    } else {
    return red[6].value
  }
}
