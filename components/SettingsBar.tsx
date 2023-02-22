import { AllSettingsProps } from '@/pages';
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
import styles from './SettingsBar.module.css';
import { AllColorOptionsInFlatArray } from '@/data/colors';
import { ACPA, FontWeight200 } from '@/data/acpaTable';
import { FontWeightAndSizeIsValid, GetMinimumAllowedLcValue } from './contrast-calculator';

export default function SettingsBar({
  color,
  setColor,
  colorIsBackground,
  setColorIsBackground,
  failedContrastPairIsHidden,
  setFailedContrastPairIsHidden,
  fontSize,
  setFontSize,
  fontWeight,
  setFontWeight,
  testForWCAG2,
  setTestForWCAG2
}: AllSettingsProps) {

  const setColorValue = (event: SelectChangeEvent) => {
    setColor(event.target.value);
  };
  const setColorIsBackgroundValue = (event: SelectChangeEvent) => {
    setColorIsBackground(JSON.parse(event.target.value));
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
  const setTestForWCAG2Value = () => {
    setTestForWCAG2(!testForWCAG2);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="select-color-label">Color</InputLabel>
        <Select
          labelId="select-color-label"
          id="select-color"
          value={color}
          onChange={setColorValue}
          label="Color"
        >
          <MenuItem key={"0"} value="">
            <em>None</em>
          </MenuItem>
          {
            AllColorOptionsInFlatArray.map((color) => <MenuItem key={color.value} value={color.value}><div className={styles.colorbox} style={{ backgroundColor: color.value }} />{color.label} - {color.value}</MenuItem>)
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
            ACPA.map((i) => <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>)
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
              <Checkbox checked={testForWCAG2} onChange={setTestForWCAG2Value} name="WCAG 2" />
            }
            label="WCAG 2"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
