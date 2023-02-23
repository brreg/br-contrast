import { brColors, green, red } from '@/data/colors'
import { GetSettingsProps } from '@/pages';
import styles from './ColorCards.module.css'
import { GetContrast, GetMinimumAllowedLcValue } from './contrast-calculator';

export default function ColorCards({
  selectedColor,
  selectedColorIsBackground,
  failedContrastPairIsHidden,
  fontSize,
  fontWeight,
  testForWCAG2,
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
                <div className={styles.scorecard} style={{ backgroundColor: lightColor(cardColor.value), color: heavyColor(cardColor.value), borderColor: heavyColor(cardColor.value)}}>
                  <p>APCA Lc-{findLcValue(cardColor.value)}</p>
                </div>
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

  function isAPCAvalid(cardColor: string) : boolean {
    const Lc = findLcValue(cardColor)
    const minLc = GetMinimumAllowedLcValue(fontWeight, fontSize)

    if (+Lc > (minLc as number)) {
      return true
    } else {
      return false
    }
  }

  function lightColor(cardColor: string) : string {
    const i = isAPCAvalid(cardColor)

    if (i) {
      return green[1].value
    } else {
      return red[0].value
    }
  }

  function heavyColor(cardColor: string) : string {
    const i = isAPCAvalid(cardColor)

    if (i) {
      return green[7].value
    } else {
      return red[6].value
    }
  }

  function showFailedContrastPairs(cardColor: string) : boolean{
    const contrastPair = isAPCAvalid(cardColor)

    if (!failedContrastPairIsHidden) {
      return true
    } else {
      return contrastPair
    }
  }
}