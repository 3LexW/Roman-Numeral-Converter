import '../css/TextInput.css';
import {useState} from 'react';

function TextInput(){
    const [displayValue, setDisplayValue] = useState('Please enter your number in Roman form or numeric form.');
    const [inputed, setInputValue] = useState('');

    function clearDisplay(element){
        setDisplayValue('Please enter your number in Roman form or numeric form.');
        setInputValue(element.target.value);
    }

    function calculate(){
        //Determine if the input is roman, or numeric, or not
        if (inputed.length === 0){
            setDisplayValue('Empty input, please try again.');
        }
        //Roman form
        else if (inputed.replace(/[IVXLCDM]/g, '').length === 0){
            setDisplayValue('This is Roman form.')

            let inputString = inputed;

            //First, replace the two digit combinations, then the one digit combination
            let numberOrder = [900, 400, 90, 40, 9, 4, 1000, 500, 100, 50, 10, 5, 1];
            let letterOrder = ['CM', 'CD', 'XC', 'XL', 'IX', 'IV', 'M', 'D', 'C', 'L', 'X', 'V', 'I'];
            let finalValue = 0;

            //Replace, find the length difference, and calculate the value
            for (let i = 0; i < letterOrder.length; i++){
                let lengthBefore = inputString.length;
                inputString = inputString.replaceAll(letterOrder[i], '');
                let counts = (lengthBefore - inputString.length) / letterOrder[i].length;
                finalValue += (counts * numberOrder[i]);
            }

            setDisplayValue('Roman -> Numeral: ' + finalValue);

        }
        else if (inputed.replace(/[1234567890]/g, '').length === 0){
            setDisplayValue('This is Numeric form.');

            //From top to down, if the value of the numerical input is higher than the letter's value, append the letter to the string. 
            let value = parseInt(inputed);
            let numberOrder = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            let letterOrder = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
            let finalString = '';

            //Using the order to reach O(1)
            for (let i = 0; i < letterOrder.length; i++){
                let repeat = Math.floor(value / numberOrder[i]);
                finalString += letterOrder[i].repeat(repeat);
                value %= numberOrder[i];
            }

            if (finalString.length === 0){
                setDisplayValue('Numeral -> Roman: 0 cannot be converted.');
            } else{
                setDisplayValue('Numeral -> Roman: ' + finalString);
            }
            
        }
        else{
            setDisplayValue('The input is not in Roman form nor numeric form, please try again.');
        };
    }


    return(
        <div id="textinput">
            <input type="text" onChange={clearDisplay} placeholder="e.g. 3, MMXXI"></input>
            <input type="button" value="Convert" onClick={calculate}></input>
            <div id = "result">{displayValue} </div>
        </div>
    )
}

export default TextInput;