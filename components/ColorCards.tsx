import { brColors } from '@/data/colors'
import styles from './ColorCards.module.css'

export default function ColorCards() {
  return (
    <ul className={styles.list}>
      {
        brColors.map( colorCategory => (
          <div key={colorCategory.name} className={styles.row}>
          {
            colorCategory.colorArray.map( color => (
              <button key={color.value} className={styles.card} style={{ backgroundColor: color.value }}>
                <p>{color.name}</p>
                <p>{color.value}</p>
              </button>
            ))
          }
          </div>
        ))
      }
    </ul>
  )
}