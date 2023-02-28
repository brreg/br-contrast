import { SidebarProps } from '@/pages';
import styles from '@/styles/sidebar.module.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function Sidebar({
  showSidebar,
  setShowSidebar,
  fontSize,
  fontWeight,
  textColor,
  backgroundColor
}: SidebarProps) : JSX.Element {
  return (
    <div>
      {
        showSidebar &&
        <div className={styles.sidebar}>
          <Button variant='contained' endIcon={<CloseIcon />} onClick={() => setShowSidebar(false)} />
          <div>
            <div />
            <p>Text Color</p>
          </div>
          <div>
            <div />
            <p>Background color</p>
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
        </div>
      }
    </div>
  )
}