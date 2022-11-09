import { useContext, useState } from 'react';
import axios from 'axios';
import Realist from '../../Contexts/Realist';
import { authConfig } from '../../Functions/auth';

function Line({ ideas }) {

    const { setIdeas, setReals, setCreateData } = useContext(Realist);
    const [color, setColor] = useState('white');
    const [tit, setTit] = useState(0)

    const remove = id => {
        setReals({id});
    }

        const add = () => {
            setCreateData({
                    id: ideas[1][0].id,
                    title: ideas[1][0].title,
                    price: ideas[1][0].price,
                    post: ideas[1][0].post,
                    image: ideas[1][0].image,
                    snow: 1
                }) 
                axios.put('http://localhost:3003/home/ideas/' + ideas[1][0].id, {confirmed: 1}, authConfig())
          .then(res => {
          console.log('CONFIRMED')
          });
        }
  

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
            
                           
                            <button onClick={() => remove(ideas[1][0].id)} type="button" style={{
                                marginRight: '10px'
                            }} className="btn btn-outline-danger">Delete</button>
                            
                           { ideas[1][0].orderis === 0 ?   
                    ( 
                                     
                                <button onClick={add} type="button" className="btn btn-outline-danger">Confirmation</button>                           
                    
                    ) :
                    <button disabled type="button" className="btn btn-outline-danger" style={{
                    backgroundColor: 'WHITE',
                    color: 'green'
                    }}>Confirmed</button>
            }
        </li>
    )
}

export default Line;
