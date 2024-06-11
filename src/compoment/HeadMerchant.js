import React from 'react'
import '../css/cs.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
export default function HeadMerchant() {

    return (
        <div className='header'>
           <header class="header">
                <div class="header_left">
                    <FontAwesomeIcon icon={faCoffee} />
                    <span class="ms-3">Xem món ăn</span>

                </div>
               
            </header>
        </div>
    )
}
