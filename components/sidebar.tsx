import { SidebarProps } from '@/pages';
import styles from '@/styles/sidebar.module.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { CalculateAPCA_value, CalculateWCAG_value, ColorData, ColorStandards, HeavyColor, LightColor } from './contrast-calculator';

export default function Sidebar({
  showSidebar,
  setShowSidebar,
  fontSize,
  fontWeight,
  textColor,
  backgroundColor
}: SidebarProps) : JSX.Element {
  const colorData : ColorData = {
    textColor: textColor,
    backgroundColor: backgroundColor,
    fontSize: fontSize,
    fontWeight: fontWeight
  }

  return (
    <div>
      {
        showSidebar &&
        <div className={styles.sidebar}>
          <Button variant='contained' endIcon={<CloseIcon />} onClick={() => setShowSidebar(false)} />
          <div className={styles.textRow} >
            <div className={styles.colorBox} style={{ backgroundColor: textColor }}/>
            <p>{textColor.toUpperCase()} - Text Color</p>
          </div>
          <div className={styles.textRow} >
            <div className={styles.colorBox} style={{ backgroundColor: backgroundColor }}/>
            <p>{backgroundColor.toUpperCase()} - Background color</p>
          </div>
          <div className={styles.preview} style={{ fontSize: fontSize, fontWeight: fontWeight, color: textColor, backgroundColor: backgroundColor}}>
            <h1>APCA</h1>
            <p>
              The Accessible Perceptual Contrast Algorithm (APCA) is a method for calculating and predicting readability contrast. 
              APCA is a part of the larger S-Luv Accessible Color Appearance Model known as SACAM. These models are specifically 
              related to color appearance on self-illuminated RGB computer displays & devices, and also for modeling accessible user needs, 
              with a focus on readability.
            </p>
            <h2>Lightness contrast (Lc)</h2>
            <p>
              APCA generates a lightness/darkness contrast value based on a minimum font size and color pair, and this value is perceptually based: 
              that is, regardless of how light or dark the two colors are, a contrast value of Lc 60 represents the same perceived readability contrast.
            </p>
          </div>
          <div className='scorecard' style={{ backgroundColor: LightColor(colorData, ColorStandards.APCA), color: HeavyColor(colorData, ColorStandards.APCA), borderColor: HeavyColor(colorData, ColorStandards.APCA)}}>
            <p>APCA Lc-{CalculateAPCA_value(colorData)}</p>
          </div>
          <div className='scorecard' style={{ backgroundColor: LightColor(colorData, ColorStandards.WCAG_AAA), color: HeavyColor(colorData, ColorStandards.WCAG_AAA), borderColor: HeavyColor(colorData, ColorStandards.WCAG_AAA)}}>
            <p>{CalculateWCAG_value(colorData)} AAA</p>
          </div>
          <div className='scorecard' style={{ backgroundColor: LightColor(colorData, ColorStandards.WCAG_AA), color: HeavyColor(colorData, ColorStandards.WCAG_AA), borderColor: HeavyColor(colorData, ColorStandards.WCAG_AA)}}>
            <p>{CalculateWCAG_value(colorData)} AA</p>
          </div>
        </div>
      }
    </div>
  )
}