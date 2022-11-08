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
    console.log(ideas)
    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/home/prop', authConfig())
            .then(res => {
                setIdeas(reList(res.data));
            })
    }, [lastUpdate]);

    // useEffect(() => {
    //     if (null === real) {
    //         return;
    //     }
    //     axios.delete('http://localhost:3003/server/reals/' + real.id, authConfig())
    //         .then(res => {
    //             setLastUpdate(Date.now());
    //             makeMsg(res.data.text, res.data.type);
    //         })
    // }, [real, makeMsg]);

    return (
        <Prop.Provider value={{
            setReal,
            ideas
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