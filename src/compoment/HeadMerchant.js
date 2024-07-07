import React from 'react'
import '../css/cs.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
export default function HeadMerchant() {

    return (
        <Link to={`/HomeMerchant`}>
          <div className='header'>
           <header class="header">
                <div class="header_left">
                    <FontAwesomeIcon icon={faCoffee} />
                    <span class="ms-3">Quán của tôi </span>
                </div>
            </header>
        </div>
        </Link>
      
    )
}
