import React, {useState} from 'react';

const InputHook = () => {
    const [value, setValue] = useState('Текст в инпуте');

    function changeValue() {
        setValue('change')
    }

    return (
        <div>
            <h1>{value}</h1>
            <input
                type='text'
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <button onClick={changeValue}>Change value</button>
        </div>
    );
};

export default InputHook;