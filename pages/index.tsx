import ColorCards from '@/components/ColorCards';
import SettingsBar from '@/components/SettingsBar';
import { useState } from 'react';

export interface AllSettingsProps {
  color: string
  setColor: (param: string) => void
  colorIsBackground: boolean
  setColorIsBackground: (param: boolean) => void
  failedContrastPairIsHidden: boolean
  setFailedContrastPairIsHidden: (param: boolean) => void
  fontSize: number
  setFontSize: (param: number) => void
  fontWeight: number
  setFontWeight: (param: number) => void
  testForWCAG2: boolean
  setTestForWCAG2: (param: boolean) => void
}

export interface GetSettingsProps {
  selectedColor: string
  selectedColorIsBackground: boolean
  failedContrastPairIsHidden: boolean
  fontSize: number
  fontWeight: number
  testForWCAG2: boolean
}

export default function Home() {
  const [color, setColor] = useState('');
  const [colorIsBackground, setColorIsBackground] = useState(false);
  const [failedContrastPairIsHidden, setFailedContrastPairIsHidden] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [testForWCAG2, setTestForWCAG2] = useState(true);

  return (
    <div>
      <SettingsBar 
        color={color}
        setColor={setColor}
        colorIsBackground={colorIsBackground}
        setColorIsBackground={setColorIsBackground}
        failedContrastPairIsHidden={failedContrastPairIsHidden}
        setFailedContrastPairIsHidden={setFailedContrastPairIsHidden}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        testForWCAG2={testForWCAG2}
        setTestForWCAG2={setTestForWCAG2}
      />
      <ColorCards 
        selectedColor={color}
        selectedColorIsBackground={colorIsBackground}
        failedContrastPairIsHidden={failedContrastPairIsHidden}
        fontSize={fontSize}
        fontWeight={fontWeight}
        testForWCAG2={testForWCAG2}
      />
    </div>
    
  )
}
