{/*Неуправляемый\Неконтролируемый компонент*/}
<MyInput
    type='text'
    placeholder='Описание поста'
    ref = {bodyPostInputRef}
/>

const bodyPostInputRef = useRef();


const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref = {ref} className={classes.myInput} {...props}/>
    );
});

console.log(bodyPostInputRef.current.value);