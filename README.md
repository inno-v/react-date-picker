react-date-picker
=================

> Date picker for React

## Install

```sh
$ npm install react-date-picker
```

## Usage

##### NOTE: Don't forget to include index.css or index.styl! ( require('react-date-picker/index.css') )

```jsx
var date = '2014-10-10' //or Date.now()

function onChange(moment, dateString){
    //...
}
<DatePicker
        minDate='2014-04-04'
        maxDate='2015-10-10'
        date={date}
        onChange={onChange}
/>
```

## Options

 * hideFooter: Boolean - by default footer is shown, so specify this to true if you don't want the footer
 * date    : Date / String / Moment / Number
 * viewDate: Date / String / Moment / Number
 * minDate : Date / String / Moment / Number
 * maxDate : Date / String / Moment / Number
 * onChange: Function

## Other

`react-date-picker` uses the awesome `moment.js` library ( Big thanks!)

If you don't use npm you can include any of the following:

 * `dist/react-color-picker.js` - the full sources. NOTE: You'll need to include `React` separately
 * `dist/react-color-picker.min.js` - minified & optimized version. NOTE: You'll need to include `React` separately
 * `dist/react-color-picker.nomoment.js` - the full sources. NOTE: You'll need to include `React` AND `moment.js` separately
 * `dist/react-color-picker.nomoment.min.js` - minified & optimized version. NOTE: You'll need to include `React` AND `moment.js` separately

