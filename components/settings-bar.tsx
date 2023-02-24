import { SettingsProps } from '@/pages';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import styles from '@/styles/settings-bar.module.css';
import { AllColorOptionsInFlatArray } from '@/data/colors';
import { FontWeight200 } from '@/data/apcaTable';
import { FontWeightAndSizeIsValid, GetMinimumAllowedLcValue } from './contrast-calculator';
import { WCAG } from '@/data/wcagTable';

export default function SettingsBar({
  colorIsBackground,
  setColorIsBackground,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
  failedContrastPairIsHidden,
  setFailedContrastPairIsHidden,
  fontSize,
  setFontSize,
  fontWeight,
  setFontWeight,
  testForWCAG_AA,
  setTestForWCAG_AA,
  testForWCAG_AAA,
  setTestForWCAG_AAA,
  testForAPCA,
  setTestForAPCA,
}: SettingsProps ) {

  const setColorValue = (event: SelectChangeEvent) => {
    // setColor(event.target.value);
    if (colorIsBackground) {
      setBackgroundColor(event.target.value)
    } else {
      setTextColor(event.target.value)
    }
  };
  const setColorIsBackgroundValue = (event: SelectChangeEvent) => {
    const isBackground = JSON.parse(event.target.value)
    setColorIsBackground(isBackground);
    
    const newTextColor = backgroundColor
    const newBackgroundColor = textColor
    setBackgroundColor(newBackgroundColor)
    setTextColor(newTextColor)
  };
  const setFailedContrastPairIsHiddenValue = (event: SelectChangeEvent) => {
    setFailedContrastPairIsHidden(JSON.parse(event.target.value));
  };
  const setFontSizeValue = (event: SelectChangeEvent) => {
    setFontSize(+event.target.value);
  };
  const setFontWeightValue = (event: SelectChangeEvent) => {
    setFontWeight(+event.target.value);
  };
  const setTestForWCAG_AA_Value = () => {
    setTestForWCAG_AA(!testForWCAG_AA);
  };
  const setTestForWCAG_AAA_Value = () => {
    setTestForWCAG_AAA(!testForWCAG_AAA);
  };
  const setTestForAPCAValue = () => {
    setTestForAPCA(!testForAPCA);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="select-color-label">Color</InputLabel>
        <Select
          labelId="select-color-label"
          id="select-color"
          value={getSelectedColor()}
          onChange={setColorValue}
          label="Color"
        >
          <MenuItem key={"0"} value="">
            <em>None</em>
          </MenuItem>
          {
            AllColorOptionsInFlatArray.map((color) => <MenuItem key={color.value} value={color.value}><div className={styles.colorbox} style={{ backgroundColor: color.value }} />{color.label} - {color.value.toUpperCase()}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel id="select-color-is-background">Selected color is</FormLabel>
        <RadioGroup
          row
          aria-labelledby="select-color-is-background"
          name="select-color-is-background"
          value={colorIsBackground}
          onChange={setColorIsBackgroundValue}
        >
          <FormControlLabel value="false" control={<Radio />} label="Text color" />
          <FormControlLabel value="true" control={<Radio />} label="Background color" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="select-failed-contrast-pairs-is-hidden">Failed contrast pairs is</FormLabel>
        <RadioGroup
          row
          aria-labelledby="select-color-is-background"
          name="select-color-is-background"
          value={failedContrastPairIsHidden}
          onChange={setFailedContrastPairIsHiddenValue}
        >
          <FormControlLabel value="false" control={<Radio />} label="Included" />
          <FormControlLabel value="true" control={<Radio />} label="Hidden" />
        </RadioGroup>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="select-font-size">Font-size</InputLabel>
        <Select
          labelId="select-font-size"
          id="select-font-size"
          value={fontSize.toString()}
          onChange={setFontSizeValue}
          label="font-size"
        >
          {
            FontWeight200.map((font) => <MenuItem key={font.fontSize} value={font.fontSize}>{font.fontSize} px</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="select-font-weight">Weight</InputLabel>
        <Select
          labelId="select-font-Weight"
          id="select-font-Weight"
          value={fontWeight.toString()}
          onChange={setFontWeightValue}
          label="font-Weight"
        >
          {
            WCAG.map((i) => <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>)
          }
        </Select>
      </FormControl>
      <div>
        <p>Minimum allowed Lc value: {GetMinimumAllowedLcValue(fontWeight, fontSize)}</p>
        <p>Combination is valid: {String(FontWeightAndSizeIsValid(fontWeight, fontSize))}</p>
      </div>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Test for</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={testForAPCA} onChange={setTestForAPCAValue} name="APCA" />
            }
            label="APCA"
          />
          <FormControlLabel
            control={
              <Checkbox checked={testForWCAG_AAA} onChange={setTestForWCAG_AAA_Value} name="WCAG AAA" />
            }
            label="WCAG AAA"
          />
          <FormControlLabel
            control={
              <Checkbox checked={testForWCAG_AA} onChange={setTestForWCAG_AA_Value} name="WCAG AA" />
            }
            label="WCAG AA"
          />
        </FormGroup>
      </FormControl>
    </div>
  );

  function getSelectedColor() : string {
    if (colorIsBackground) {
      return backgroundColor;
    } else {
      return textColor;
    }
  }
}
