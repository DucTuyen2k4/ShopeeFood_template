import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(prevCount => (prevCount === 0 ? 1 : 0));
    }

    return (
        <>
            <button
                onClick={handleClick}
                style={{
                    backgroundColor: count === 1 ? '#007bff' : '', // Màu xanh dương nếu count là 1
                    color: count === 1 ? 'white' : 'black' // Màu chữ trắng nếu count là 1
                }}
            >
                <FontAwesomeIcon icon={faThumbsUp} /> {count}
            </button>
        </>
    );
}
 
export default MyButton;
