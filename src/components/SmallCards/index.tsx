import React from 'react';
interface Props {
    number: number;
}

export default function SmallCards(props: Props) {
    return (
        <div className="bg-face bg-top bg-no-repeat w-64 h-96 rounded-xl">
            <span className='text-number text-blue-400'>
                {props.number}
            </span>
        </div>
    )
}
