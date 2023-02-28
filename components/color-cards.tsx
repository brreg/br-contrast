import { brColors } from '@/data/colors'
import { ColorCardsProps } from '@/pages';
import styles from '@/styles/color-cards.module.css'
import { CalculateAPCA_value, CalculateWCAG_value, ColorData, ColorStandards, HeavyColor, IsAAA_valid, IsAA_valid, IsAPCAvalid, LightColor } from './contrast-calculator';

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
                  <div className='scorecard' style={{ backgroundColor: lightColor(cardColor.value, ColorStandards.APCA), color: heavyColor(cardColor.value, ColorStandards.APCA), borderColor: heavyColor(cardColor.value, ColorStandards.APCA)}}>
                    <p>APCA Lc-{findLcValue(cardColor.value)}</p>
                  </div>
                }
                {
                  testForWCAG_AAA &&
                  <div className='scorecard' style={{ backgroundColor: lightColor(cardColor.value, ColorStandards.WCAG_AAA), color: heavyColor(cardColor.value, ColorStandards.WCAG_AAA), borderColor: heavyColor(cardColor.value, ColorStandards.WCAG_AAA)}}>
                    <p>{findWCAGValue(cardColor.value)} AAA</p>
                  </div>
                }
                {
                  testForWCAG_AA &&
                  <div className='scorecard' style={{ backgroundColor: lightColor(cardColor.value, ColorStandards.WCAG_AA), color: heavyColor(cardColor.value, ColorStandards.WCAG_AA), borderColor: heavyColor(cardColor.value, ColorStandards.WCAG_AA)}}>
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
    const data = getColorData(cardColor)
    return CalculateAPCA_value(data)
  }

  function findWCAGValue(cardColor: string) : string {
    const colorData = getColorData(cardColor)
    return CalculateWCAG_value(colorData)
  }

  function lightColor(cardColor: string, standard: ColorStandards) : string {
    const colorData = getColorData(cardColor)
    return LightColor(colorData, standard)
  }

  function heavyColor(cardColor: string, standard: ColorStandards) : string {
    const colorData = getColorData(cardColor)
    return HeavyColor(colorData, standard)
  }

  function showFailedContrastPairs(cardColor: string) : boolean{
    const colorData = getColorData(cardColor)
    const APCA = IsAPCAvalid(colorData)
    const AA = IsAA_valid(colorData)
    const AAA = IsAAA_valid(colorData)

    if (!failedContrastPairIsHidden) {
      return true
    } else {
      return APCA || AA || AAA
    }
  }

  function getColorData(cardColor: string) : ColorData {
    if (dropdownColorIsBackground) {
      return {
        textColor: cardColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }
    } else {
      return {
        textColor: textColor,
        backgroundColor: cardColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }
    }
  }
}