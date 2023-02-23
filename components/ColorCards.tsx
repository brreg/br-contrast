import { brColors, green, red } from '@/data/colors'
import { GetSettingsProps } from '@/pages';
import styles from './ColorCards.module.css'
import { GetContrast, GetMinimumAllowedLcValue, GetMinimumAllowed_AAA_Value, GetMinimumAllowed_AA_Value } from './contrast-calculator';
import { hex } from 'wcag-contrast'

export default function ColorCards({
  selectedColor,
  selectedColorIsBackground,
  failedContrastPairIsHidden,
  fontSize,
  fontWeight,
  testForWCAG_AA,
  testForWCAG_AAA,
  testForAPCA,
}: GetSettingsProps) {
  return (
    <ul className={styles.list}>
      {
        brColors.map( colorCategory => (
          <li key={colorCategory.label} className={styles.row}>
          {
           colorCategory.colorArray.map( cardColor => showFailedContrastPairs(cardColor.value) && (
              <div key={cardColor.value} className={styles.card} style={{ backgroundColor: cardColor.value, color: cardColor.labelTextColor }}>
                <div className={styles.cardLabelText}>
                  <p>{cardColor.label}</p>
                  <p>{cardColor.value}</p>
                </div>
                {
                  testForAPCA &&
                  <div className={styles.scorecard} style={{ backgroundColor: lightColor_APCA(cardColor.value), color: heavyColor_APCA(cardColor.value), borderColor: heavyColor_APCA(cardColor.value)}}>
                    <p>APCA Lc-{findLcValue(cardColor.value)}</p>
                  </div>
                }
                {
                  testForWCAG_AAA &&
                  <div className={styles.scorecard} style={{ backgroundColor: lightColor_AAA(cardColor.value), color: heavyColor_AAA(cardColor.value), borderColor: heavyColor_AAA(cardColor.value)}}>
                    <p>{findWCAGValue(cardColor.value)} AAA</p>
                  </div>
                }
                {
                  testForWCAG_AA &&
                  <div className={styles.scorecard} style={{ backgroundColor: lightColor_AA(cardColor.value), color: heavyColor_AA(cardColor.value), borderColor: heavyColor_AA(cardColor.value)}}>
                    <p>{findWCAGValue(cardColor.value)} AA</p>
                  </div>
                }
              </div>
            ))
          }
          </li>
        ))
      }
    </ul>
  )

  function findLcValue(cardColor: string) : string {
    if (selectedColorIsBackground) {
      return GetContrast(cardColor, selectedColor)
    } else {
      return GetContrast(selectedColor, cardColor)
    }
  }

  function findWCAGValue(cardColor: string) : string {
    if (selectedColor === '') {
      return ""
    } else {
      return hex(cardColor, selectedColor).toFixed(1).toString()
    }
  }

  function isAPCAvalid(cardColor: string) : boolean {
    const Lc = findLcValue(cardColor)
    const minLc = GetMinimumAllowedLcValue(fontWeight, fontSize)

    if (+Lc > (minLc as number)) {
      return true
    } else {
      return false
    }
  }

  function is_AAA_valid(cardColor: string) : boolean {
    const contrast = +findWCAGValue(cardColor)
    const minContrast = GetMinimumAllowed_AAA_Value(fontWeight, fontSize)

    if (contrast > (minContrast as number)) {
      return true
    } else {
      return false
    }
  }

  function is_AA_valid(cardColor: string) : boolean {
    const contrast = +findWCAGValue(cardColor)
    const minContrast = GetMinimumAllowed_AA_Value(fontWeight, fontSize)

    if (contrast > (minContrast as number)) {
      return true
    } else {
      return false
    }
  }

  function lightColor_APCA(cardColor: string) : string {
    const i = isAPCAvalid(cardColor)

    if (i) {
      return green[1].value
    } else {
      return red[0].value
    }
  }

  function heavyColor_APCA(cardColor: string) : string {
    const i = isAPCAvalid(cardColor)

    if (i) {
      return green[7].value
    } else {
      return red[6].value
    }
  }
  function lightColor_AA(cardColor: string) : string {
    const i = is_AA_valid(cardColor)

    if (i) {
      return green[1].value
    } else {
      return red[0].value
    }
  }

  function heavyColor_AA(cardColor: string) : string {
    const i = is_AA_valid(cardColor)

    if (i) {
      return green[7].value
    } else {
      return red[6].value
    }
  }
  function lightColor_AAA(cardColor: string) : string {
    const i = is_AAA_valid(cardColor)

    if (i) {
      return green[1].value
    } else {
      return red[0].value
    }
  }

  function heavyColor_AAA(cardColor: string) : string {
    const i = is_AAA_valid(cardColor)

    if (i) {
      return green[7].value
    } else {
      return red[6].value
    }
  }

  function showFailedContrastPairs(cardColor: string) : boolean{
    const APCA = isAPCAvalid(cardColor)
    const AA = is_AA_valid(cardColor)
    const AAA = is_AAA_valid(cardColor)

    if (!failedContrastPairIsHidden) {
      return true
    } else {
      return APCA || AA || AAA
    }
  }
}