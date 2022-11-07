import { useContext, useState } from 'react';
import axios from 'axios';
import Realist from '../../Contexts/Realist';
import { authConfig } from '../../Functions/auth';

function Line({ ideas }) {

    const { setIdeas, setReals } = useContext(Realist);
    const [color, setColor] = useState('white');
    const [tit, setTit] = useState('Confirmation')

    const remove = id => {
        setIdeas({id});
    }

        const add = () => {
            setReals({
                ideas_id: ideas[1][0].iid
            });
 }
console.log(ideas[1])
    return (
        <li className="list-group-item" style={{
            display: 'flex',
    alignItems: 'center'
        }}>
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                       
                        {ideas[1][0].image ? <div className='img-bin'>
                            <img src={ideas[1][0].image} alt={ideas[0]}>
                            </img>
                        </div> : null}
                        <div>TITLE: {ideas[0]}. </div>
                        <div className="home__content__info">
                       Description: {ideas[1][0].post}. 
                    </div>
                    <div className="home__content__info">
                      Price:  {ideas[1][0].price} Eur
                    </div>

                    
                    </div>
                </div>
            </div>
            <div className="home__buttons">
                                
                                 <button onClick={add} type="button" style={{
                                    backgroundColor: color,      
                                    color: 'black'
                                }} className="btn btn-outline-success">{tit}</button> 
    
                <ul className="list-group">
                    {
                        ideas[1]?.map(i => i.iid !== null ? <li key={i.iid} className="list-group-item">
                           
                                <button onClick={() => remove(i.iid)} type="button" className="btn btn-outline-danger">Delete</button>
                            
                        </li> : null)
                    }
                </ul>
            </div>
        </li>
    )
}

export default Line;
