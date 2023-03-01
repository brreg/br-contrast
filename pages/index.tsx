import ColorCards from '@/components/color-cards';
import SettingsBar from '@/components/settings-bar';
import Sidebar from '@/components/sidebar';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import { createContext, useContext, useMemo, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export interface SettingsProps {
  textColor: string;
  setTextColor: (param: string) => void;
  backgroundColor: string;
  setBackgroundColor: (param: string) => void;
  color: string;
  setColor: (param: string) => void;
  colorIsBackground: boolean;
  setColorIsBackground: (param: boolean) => void;
  failedContrastPairIsHidden: boolean;
  setFailedContrastPairIsHidden: (param: boolean) => void;
  fontSize: number;
  setFontSize: (param: number) => void;
  fontWeight: number;
  setFontWeight: (param: number) => void;
  testForWCAG_AA: boolean;
  setTestForWCAG_AA: (param: boolean) => void;
  testForWCAG_AAA: boolean;
  setTestForWCAG_AAA: (param: boolean) => void;
  testForAPCA: boolean;
  setTestForAPCA: (param: boolean) => void;
}

export interface ColorCardsProps {
  textColor: string;
  setTextColor: (param: string) => void;
  backgroundColor: string;
  setBackgroundColor: (param: string) => void;
  setShowSidebar: (param: boolean) => void;
  dropdownColorIsBackground: boolean;
  failedContrastPairIsHidden: boolean;
  fontSize: number;
  fontWeight: number;
  testForWCAG_AA: boolean;
  testForWCAG_AAA: boolean;
  testForAPCA: boolean;
}

export interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (param: boolean) => void;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  backgroundColor: string;
}

export default function DarkThemeWithCustomPalette() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        // if (localStorage.getItem('color-theme') === 'light') {
        //   document.documentElement.classList.add('dark');
        //   localStorage.setItem('color-theme', 'dark');
        // } else {
        //   document.documentElement.classList.remove('dark');
        //   localStorage.setItem('color-theme', 'light');
        // }
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          body1: {
            "fontFamily": `"Open Sans", Arial, Helvetica, sans-serif`,
            "fontWeight": 500,
          }
        },
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: amber,
              divider: amber[200],
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
            }
            : {
              // palette values for dark mode
              primary: grey,
              divider: grey[700],
              background: {
                default: '#000',
                paper: grey[900],
              },
              text: {
                primary: '#fff',
                secondary: '#eee',
              },
            }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}>
          <Home />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function Home() {
  const [color, setColor] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [colorIsBackground, setColorIsBackground] = useState(false);
  const [failedContrastPairIsHidden, setFailedContrastPairIsHidden] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [testForWCAG_AA, setTestForWCAG_AA] = useState(true);
  const [testForWCAG_AAA, setTestForWCAG_AAA] = useState(true);
  const [testForAPCA, setTestForAPCA] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <div>
      <div className='mainLayout'>
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
        <div className='mainContent'>
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
        </div>
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textColor={textColor}
          backgroundColor={backgroundColor}
        />
      </div>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </div>
  );
}
