import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import {ModBarrel} from './../components/ModBarrel'
export function BarrelDetails({ match }) {

    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);
    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/v1/' + match.params.id + '/' + match.params.pos)
            .then(res => res.json())
            .then((result) => {
                setItem(result);
                console.log(result);
                console.log(item);
                console.log(setItem(result));
            },
                (error) => {
                    setError(error);

                }
            )

    }, [])
    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        if (item.length != 1) {
            return (
                <div className="text-white">Error: errore nel database più elementi con lo stesso ID</div>
            )
        } else {
            return (
                <div className="App">

                    <Col>
                        <ul  className="m-3">

                            {item.map(barrel => <li className="list-unstyled" key={barrel.id}>
                                <Row>
                                    <h3 className="text-title">Dettagli barile</h3>
                                    <ModBarrel match={match.params} className="text-title"/> 
                                    <p className="text-title"><button type="button" className="btn btn-light"> Elimina </button> </p>

                                    <Col>
                                        <h2 className="text-white">Batteria {match.params.id} </h2>
                                    </Col>
                                </Row>

                                <div className="text-normal">
                                    <h5>
                                        <Row className="m-2">Posizione numero {barrel.pos}</Row>
                                        <Row className="m-2">   Tipo di legno: {barrel.type_wood} </Row>
                                        <Row className="m-2">  Capacità: {barrel.capacity} L </Row>
                                    </h5>
                                </div>
                            </li>
                            )}
                        </ul>
                    </Col>
                </div>
            );
        }
    }
}

export default BarrelDetails;