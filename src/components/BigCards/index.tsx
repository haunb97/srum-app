import React, {useState} from 'react'

interface Props {
    backToListCard: (value: boolean) => void;
    number?: number;
}
export default function BigCart(props: Props) {
    const {backToListCard, number} = props;
    const [isShowTwelfthCard, setIsShowTwelfthCard] = useState(true);
    const onClick = () => {
        setIsShowTwelfthCard(!isShowTwelfthCard);
    }

    const onClickBack = () => {
        setIsShowTwelfthCard(true);
        backToListCard(false)
    }
    return (
        <div className='bg-white w-full h-full flip-container'>
            <div className={`flipper w-full h-full flex items-stretch ${isShowTwelfthCard ? 'rotate-block' : '' }`}>
                <div className="font bg-blue-200 w-60 h-80 mx-auto text-4xl flex items-center justify-center self-center text-white z-50" onClick={onClick}>
                    {number}
                </div>
                <div className='back' onClick={onClick}>
                    <div className='bg-white w-full h-full flex'>
                        <div className="bg-red-200 w-60 h-80 mx-auto items-center self-center z-50" onClick={() => onClick()}>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className='bg-blue-700 px-10 py-2 rounded-xl text-white' onClick={onClickBack}>back</button>
            </div>
        </div>
    )
}
