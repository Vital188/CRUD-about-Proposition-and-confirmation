import { useContext } from 'react';
import Ideas from '../../Contexts/Ideas';

function Line({ ideas }) {

    const { setDeleteData, setModalData } = useContext(Ideas);

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__info">
                        {ideas.image ? <div className='img-bin'>
                            <img src={ideas.image} alt={ideas.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                        {ideas.title}
                    </div>
                    <div className="line__content__info">
                        {ideas.post}
                    </div>
                    <div className="line__content__info">
                        {ideas.price}
                    </div>
                    <div className="line__content__info">
                        {ideas.rating ?? 'no rating'}
                    </div>
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(ideas)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(ideas)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;