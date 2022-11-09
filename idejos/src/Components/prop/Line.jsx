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

console.log(ideas[1])
    return (
      <>
        <li className="list-group-item" style={{
        border: '2px solid black',
        marginBottom: '30px' 
        }}>
            <div className="home" style={{
                    border: '1px solid',
                    borderRadius: '10px',
                    padding: '5px'
                   }}>
                <div className="home__content">
                     {ideas[1][0].image ? <div className='img-bin'>
                            <img src={ideas[1][0].image} alt={ideas[0]}>
                            </img>
                        </div> : null}
                    <div className="home__content__info"
                    style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                      <div>
                      <b> Title:</b> {ideas[0]} 
                        </div><div >
                       <b>Project price:</b> {ideas[1][0].price} Eur
                    </div>
                    <div >
                      <b>Raised funds: </b>  
                    </div>
                    <div >
                      <b>Left to start project:</b> 
                    </div></div>
                        <div className="home__content__info">
                      <b>Project description:</b>  {ideas[1][0].post} 
                    </div>
                    
                               
                </div>
            </div>
                
                   <div style={{
                    border: '1px solid',
                    borderRadius: '10px',
                    padding: '5px'
                   }}>
                    <h5> If you like this project, you can make donations!</h5>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginBottom: '20px'
                    }}>
                    <label>
                      <b style={{
                        marginRight: '10px'
                      }}> Your name:</b>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
                    </label>
                    <label>
                        <b style={{
                        marginRight: '10px'
                      }}>Donation amount:</b> 
                    <input type="number" value={don} onChange={e => setDon(e.target.value)}></input>
           </label></div>
           
           <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
           }}>
                <button onClick={add} className="btn btn-outline-danger" style={{
                    width: '200px'
                }} >Make your donation</button>
                </div></div>
                <div style={{
                    border: '1px solid',
                    borderRadius: '10px',
                    padding: '5px'
                   }}>
           <h2>Performed donations </h2>
           {
               ideas[1].map(r => r.id !== null ? <li key={r.id} className="list-group-item">
                            
               <b>Donator name:  </b>  {r.name}; 
               <b>Donation:  </b>  {r.sum} (Eur);
           
       </li> : null) 
           }</div>
       </li>     
                    </>
    )
}

export default Line;
