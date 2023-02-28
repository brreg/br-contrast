## About

This project calculates the APCA Lc and WCAG 2 values for Brønnøysundregistrenes color scheme

Allows you to choose a color as text or background, and display the Lc and WCAG values for each color in the color scheme, and if the calculated value is within the approved limits for Font-Size and Font-Weight


## Modifications

If you want to try this with your own color scheme, you can change the content of `./data/colors.ts` to add the colors you want.

This projects loops through the `brColors` array in `./data/colors.ts`, so make sure the colors you add are added there.

If you want to change the allowed values for APCA Lc or WCAG, you can do it in `./data/apcaTable.ts` or `./data/wcagTable.ts`



## Getting Involved

Your contributions are more than welcome, feel free to open a ticket or a pull request at any time if you se something that can be improved