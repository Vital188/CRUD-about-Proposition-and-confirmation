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
            <div className="home" style={{
                alighItems: "center",
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div className="home__content" style={{
                    display: 'contents'
                }}> <div className="home__content__info">TITLE: {ideas[0]} </div>
                    <div className="home__content__info">
                       
                        {ideas[1][0].image ? <div className='img-bin'>
                            <img src={ideas[1][0].image} alt={ideas[0]}>
                            </img>
                        </div> : null}
                       
                        <div className="line__content__info" style={{
                            width: '250px',
                            height: 'auto'
                        }}>
                   <b> Description: </b>
                    {ideas[1][0].post}.   
                    </div>
                    <div className="home__content__info">
                      Price:  {ideas[1][0].price} Eur
                    </div>

                    
                    </div>
                
            </div>
            
                { ideas[1][0].orderis === 0 ?   
                            <button onClick={() => remove(ideas[1][0].id)} type="button" style={{
                                marginBottom: '10px'
                            }} className="btn btn-outline-danger" >Delete</button> : null
                        }
                            
                           { ideas[1][0].orderis === 0 ?   
                    ( 
                                    
                                <button onClick={add} type="button" className="btn btn-outline-danger">Confirmation</button>                           
                    
                    ) :
                    <button disabled type="button" className="btn btn-outline-danger" style={{
                    backgroundColor: 'WHITE',
                    color: 'green',
                    height: '40px'
                    }}>Confirmed</button>
            }</div> 
        </li>
    )
}

export default Line;
