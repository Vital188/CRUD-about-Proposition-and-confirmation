import { useState, useContext } from "react";
import Prop from '../../Contexts/Prop/Prop'

function Line({ ideas }) {

const [don, setDon] = useState('')
const [name, setName] = useState('')
const { setCreate } = useContext(Prop);

const add = () => {
    setCreate({
            prop_id: ideas[1][0].id,
            name: name,
            sum: don,
        })
        setDon('');
        setName(''); 
    }

console.log(ideas[1][0])
    return (
      <>
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                        
                        {ideas[1][0].image ? <div className='img-bin'>
                            <img src={ideas[1][0].image} alt={ideas[0]}>
                            </img>
                        </div> : null}
                        Title: <h2>{ideas[0]} <small>({ideas[1].length})</small></h2>
                        <div className="home__content__imfo">
                      Project description:  {ideas[1][0].post} 
                    </div>
                    

                    <div className="home__content__price">
                       Project price {ideas[1][0].price} Eur
                    </div>
               </div>       
                    
                     
                </div>
            </div>
            <div className="home__buttons">
           
                            {/* {ideas[1][0].orderis === 0 ?
                                <button  style={{
                                    backgroundColor: 'skyblue'
                                }} type="button" className="btn btn-outline-danger">Waiting confirmation</button> : */}
                                <button style={{
                                    backgroundColor: 'orange'
                                }} type="button" className="btn btn-outline-danger">Confirmed</button>
                            {/* } */}
                            </div>
                   </li>         
                   
                    <h2> Donations:</h2>
                    <label>
                        Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
                    </label>
                    <label>Amount: 
                    <input type="number" value={don} onChange={e => setDon(e.target.value)}></input>
           </label>


           <h2>Performed donations:</h2>
           <button onClick={add}>Add your donation</button>
                    </>
    )
}

export default Line;
