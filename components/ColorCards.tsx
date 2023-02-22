import { brColors } from '@/data/colors'
import { GetSettingsProps } from '@/pages';
import styles from './ColorCards.module.css'
import { GetContrast } from './contrast-calculator';

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
          <div key={colorCategory.label} className={styles.row}>
          {
            colorCategory.colorArray.map( cardColor => (
              <div key={cardColor.value} className={styles.card} style={{ backgroundColor: cardColor.value }}>
                <p>{cardColor.label}</p>
                <p>{cardColor.value}</p>
                <div className={styles.scorecard}>
                  ACPA Lc-{findLcValue(cardColor.value, selectedColor, selectedColorIsBackground, fontSize, fontWeight)}
                </div>
              </div>
            ))
          }
          </div>
        ))
      }
    </ul>
  )
}

function findLcValue(cardColor: string, selectedColor: string, selectedColorIsBackground: boolean, fontSize: number, fontWeight: number) : string {
  if (selectedColorIsBackground) {
    return GetContrast(cardColor, selectedColor, fontSize, fontWeight)
  } else {
    return GetContrast(selectedColor, cardColor, fontSize, fontWeight)
  }
}