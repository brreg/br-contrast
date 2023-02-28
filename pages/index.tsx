import ColorCards from '@/components/color-cards';
import SettingsBar from '@/components/settings-bar';
import Sidebar from '@/components/sidebar';
import { useState } from 'react';

export interface SettingsProps {
  textColor: string
  setTextColor: (param: string) => void
  backgroundColor: string
  setBackgroundColor: (param: string) => void
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

export interface ColorCardsProps {
  textColor: string
  setTextColor: (param: string) => void
  backgroundColor: string
  setBackgroundColor: (param: string) => void
  setShowSidebar: (param: boolean) => void
  dropdownColorIsBackground: boolean
  failedContrastPairIsHidden: boolean
  fontSize: number
  fontWeight: number
  testForWCAG_AA: boolean
  testForWCAG_AAA: boolean
  testForAPCA: boolean
}

export interface SidebarProps {
  showSidebar: boolean
  setShowSidebar: (param: boolean) => void
  fontSize: number
  fontWeight: number
  textColor: string
  backgroundColor: string
}

export default function Home() {
  const [color, setColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [colorIsBackground, setColorIsBackground] = useState(false);
  const [failedContrastPairIsHidden, setFailedContrastPairIsHidden] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [testForWCAG_AA, setTestForWCAG_AA] = useState(true);
  const [testForWCAG_AAA, setTestForWCAG_AAA] = useState(true);
  const [testForAPCA, setTestForAPCA] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  function changeDarkMode() {
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          }
          
          // if NOT set via local storage previously
        } else {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
  }

  return (
    <div>
      <button id="theme-toggle" onClick={changeDarkMode} type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        Dark
      </button>
      <SettingsBar 
        color={color}
        setColor={setColor}
        colorIsBackground={colorIsBackground}
        textColor={textColor}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
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
        dropdownColorIsBackground={colorIsBackground}
        textColor={textColor}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        setShowSidebar={setShowSidebar}
        failedContrastPairIsHidden={failedContrastPairIsHidden}
        fontSize={fontSize}
        fontWeight={fontWeight}
        testForWCAG_AA={testForWCAG_AA}
        testForWCAG_AAA={testForWCAG_AAA}
        testForAPCA={testForAPCA}
      />
      <Sidebar 
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
    </div>
    
  )
}
