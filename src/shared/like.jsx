import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';

const Like = (props) => {
    return (
        <FontAwesomeIcon className="cursor-pointer" title={props.liked ? 'Unlike' : 'Like'} onClick={() => props.onClick()} icon={props.liked ? faHeartSolid : faHeartReg} />
    );
}

export default Like;