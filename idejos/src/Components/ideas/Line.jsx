import { useContext } from 'react';
import Ideas from '../../Contexts/Ideas';

function Line({ ideas }) {

  
    return (
        <>
        
        <li className="list-group-item">
            <div className="line__content__info">
                        {ideas.image ? <div className='img-bin'>
                            <img src={ideas.image} alt={ideas.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
            <div className="line" style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                flexWrap: 'wrap'
            }}>
                <div className="line__content" style={{
                    flexDirection: 'column'
                }}>
                    
                    <div className="line__content__title">
                      TITLE:  {ideas.title}
                    </div>
                    <div className="line__content__info">
                      Description:  {ideas.post}
                    </div>
                    <div className="line__content__info">
                    Price (eur):  {ideas.price}
                    </div>
                     </div>
               
            </div>
        </li></>
    )
}

export default Line;