import { useState, useContext, useRef } from 'react';
import DataContext from '../../Contexts/DataContext';
import Ideas from '../../Contexts/Ideas';
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [post, setPost] = useState('')
    const fileInput = useRef();

    const { setCreateData } = useContext(Ideas);
    const {makeMsg} = useContext(DataContext);

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const add = () => {
        if (title.length === 0 || title.length > 50) {
            makeMsg('Invalid title', 'error');
            return;
        }
        if (price.replace(/[^\d.]/, '') !== price) {
            makeMsg('Invalid price', 'error');
            return;
        }
        if (parseFloat(price) > 999.99) {
            makeMsg('Max price is 999.99', 'error');
            return;
        }



        setCreateData({
            title,
            price: parseFloat(price),
            post,
            image: photoPrint
        });
        setTitle('');
        setPost('')
        setPrice('');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">New Project</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Project title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <label className="form-label">Project description</label>
          <textarea style={{
            marginBottom: '50px',
            height: '300px'
          }}
            className="form-control"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
                
                <div className="mb-3">
                    <label className="form-label">Project image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
                <div className="mb-3">
                    <label className="form-label">Amount required project implement (eur):</label>
                    <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;