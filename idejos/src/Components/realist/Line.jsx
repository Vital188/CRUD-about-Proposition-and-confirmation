import { useContext } from 'react';
import Realist from '../../Contexts/Realist';

function Line({ ideas }) {

    const { setIdeas } = useContext(Realist);

    const remove = id => {
        setIdeas({id});
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                        <h2>{ideas[0]} <small>({ideas[1].length})</small></h2>
                        {ideas[1][0].image ? <div className='img-bin'>
                            <img src={ideas[1][0].image} alt={ideas[0]}>
                            </img>
                        </div> : null}
                        <div className="home__content__imfo">
                        {ideas[1][0].post} 
                    </div>
                    </div>

                    <div className="home__content__price">
                        {ideas[1][0].price} Eur
                    </div>
                </div>
            </div>
            <div className="comments">
                <ul className="list-group">
                    {
                        ideas[1]?.map(i => i.rid !== null ? <li key={i.rid} className="list-group-item">
                            <p>{i.post}</p>
                            <div className="home__buttons">
                                <button onClick={() => remove(i.rid)} type="button" className="btn btn-outline-danger">Delete</button>
                            </div>
                        </li> : null)
                    }
                </ul>
            </div>
        </li>
    )
}

export default Line;
