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
  testForWCAG_AA: boolean
  setTestForWCAG_AA: (param: boolean) => void
  testForWCAG_AAA: boolean
  setTestForWCAG_AAA: (param: boolean) => void
  testForAPCA: boolean
  setTestForAPCA: (param: boolean) => void
}

export interface GetSettingsProps {
  selectedColor: string
  selectedColorIsBackground: boolean
  failedContrastPairIsHidden: boolean
  fontSize: number
  fontWeight: number
  testForWCAG_AA: boolean
  testForWCAG_AAA: boolean
  testForAPCA: boolean
}

export default function Home() {
  const [color, setColor] = useState('');
  const [colorIsBackground, setColorIsBackground] = useState(false);
  const [failedContrastPairIsHidden, setFailedContrastPairIsHidden] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [testForWCAG_AA, setTestForWCAG_AA] = useState(false);
  const [testForWCAG_AAA, setTestForWCAG_AAA] = useState(false);
  const [testForAPCA, setTestForAPCA] = useState(true);

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
        testForWCAG_AA={testForWCAG_AA}
        setTestForWCAG_AA={setTestForWCAG_AA}
        testForWCAG_AAA={testForWCAG_AAA}
        setTestForWCAG_AAA={setTestForWCAG_AAA}
        testForAPCA={testForAPCA}
        setTestForAPCA={setTestForAPCA}
      />
      <ColorCards 
        selectedColor={color}
        selectedColorIsBackground={colorIsBackground}
        failedContrastPairIsHidden={failedContrastPairIsHidden}
        fontSize={fontSize}
        fontWeight={fontWeight}
        testForWCAG_AA={testForWCAG_AA}
        testForWCAG_AAA={testForWCAG_AAA}
        testForAPCA={testForAPCA}
      />
    </div>
    
  )
}
