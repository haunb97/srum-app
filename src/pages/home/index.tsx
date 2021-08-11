import React, {useState} from 'react';
import BigCard from '../../components/BigCards'

function Home () {
const [isShowTwelfthCard, setIsShowTwelfthCard] = useState(false);
const [number, setNumber] = useState();
    const onClick = (value: any) => {
        console.log('%c value', 'color: green', value)
        setNumber(value);
       setIsShowTwelfthCard(!isShowTwelfthCard);
    }
    const renderTwelfthCard = () => {
        let listCart: any = [] ;
        for(let a = 0 ; a < 12; a++) {
        listCart.push(
            <div
                onClick={() => onClick(a)}
                className='bg-red-400 w-20 h-28 rounded-xl text-white text-4xl flex items-center justify-center'
            >
                {a}
            </div>)
        }
        return listCart;
    }
    return (
        <div className="flip-container">
           <div  className={`flipper  ${isShowTwelfthCard ? 'rotate-block' : '' }`}>
               <div className={` font grid grid-flow-col grid-cols-3 grid-rows-4 gap-6 h-full p-10`}>
                   {renderTwelfthCard()}
               </div>
               <div className='back'>
                   <BigCard backToListCard={onClick} number={number} />
               </div>
           </div>
        </div>
    )
}

export default Home;