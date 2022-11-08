import Prop from '../../Contexts/Prop/Prop'
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [ideas, setIdeas] = useState(null);
    const [real, setReal] = useState(null);
    const { makeMsg } = useContext(DataContext);
    const [create, setCreate] = useState(null);

    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.title)) {
                d.set(line.title, [...d.get(line.title), line]);
            } else {
                d.set(line.title, [line]);
            }
        });
        return [...d];
    }
  
    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/home/prop', authConfig())
            .then(res => {
                console.log(res.data)
                setIdeas(reList(res.data));
            })
    }, [lastUpdate]);

     useEffect(() => {
        if (null === create) {
            return;
        }
        axios.post('http://localhost:3003/home/donat', create, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            });
    }, [create, makeMsg]);

    return (
        <Prop.Provider value={{
            setReal,
            ideas,
            setCreate
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Prop.Provider>
    );
}

export default Main;