import { brColors, green, red } from '@/data/colors'
import { ColorCardsProps } from '@/pages';
import styles from '@/styles/color-cards.module.css'
import { GetContrast, GetMinimumAllowedLcValue, GetMinimumAllowed_AAA_Value, GetMinimumAllowed_AA_Value } from './contrast-calculator';
import { hex } from 'wcag-contrast'

export default function ColorCards({
  dropdownColorIsBackground,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
  setShowSidebar,
  failedContrastPairIsHidden,
  fontSize,
  fontWeight,
  testForWCAG_AA,
  testForWCAG_AAA,
  testForAPCA,
}: ColorCardsProps ) {
  return (
    <ul className={styles.list}>
      {
        brColors.map( colorCategory => (
          <li key={colorCategory.label} className={styles.row}>
          {
           colorCategory.colorArray.map( cardColor => showFailedContrastPairs(cardColor.value) && (
              <button key={cardColor.value} className={styles.card} onClick={() => click(cardColor.value)} style={{ backgroundColor: cardColor.value, color: cardColor.labelTextColor }}>
                <div className={styles.cardLabelText}>
                  <p>{cardColor.label}</p>
                  <p>{cardColor.value.toUpperCase()}</p>
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
              </button>
            ))
          }
          </li>
        ))
      }
    </ul>
  )

  function click(color: string) {
    setColor(color)
    setShowSidebar(true)
  }

  function setColor(color: string) {
    if (dropdownColorIsBackground) {
      setTextColor(color)
    } else {
      setBackgroundColor(color)
    }
  }

  function findLcValue(cardColor: string) : string {
    if (dropdownColorIsBackground) {
      return GetContrast(cardColor, backgroundColor)
    } else {
      return GetContrast(textColor, cardColor)
    }
  }

  function findWCAGValue(cardColor: string) : string {
    if (dropdownColorIsBackground && backgroundColor !== '') {
      return hex(cardColor, backgroundColor).toFixed(1).toString()
    } else if (!dropdownColorIsBackground && textColor !== '') {
      return hex(cardColor, textColor).toFixed(1).toString()
    } else {
      return ""
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