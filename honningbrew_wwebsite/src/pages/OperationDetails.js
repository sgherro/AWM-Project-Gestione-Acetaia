import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import {FormatDate} from './SetDetails'

function OpDescription(operation) {

    const op = operation.operation


    // TODO: da mettere a posto posizione del barile
    return (
        <div>
            
            <h5 className = "text-normal">
                Barile nella posizione {op.barrel.pos}
        </h5> 
        <h5 class="text-title"> Data </h5> 
            <h5 className = "text-normal">    
            <FormatDate datetime = {op.datetime}/>
        </h5>
        <h5 class="text-title"> Quantità </h5> 
            <h5 className = "text-normal">    
            {op.quantity} litri
        </h5>
                {op.name === "Rabbocco" ?
                <div>
                   <h5 className="text-title"> Barile di destinazione</h5>
                    <h5 className="text-normal">{op.barrel_destination}</h5>
                </div> : null}   
                {op.name === "Misurazione" ?
                <div>
                   <h5 className="text-title"> Tipologia di misurazione</h5>
                    <h5 className="text-normal">{op.type_measure}</h5>
                </div> : null}   
                {op.name === "Degustazione" ?
                <div>
                   <h5 className="text-title"> Descrizione</h5>
                    <h5 className="text-normal">{op.description}</h5>
                </div> : null}   
                {op.name === "Aggiunta mosto" ?
                <div>
                   <h5 className="text-title"> Tipologia di mosto</h5>
                    <h5 className="text-normal">{op.type_mosto}</h5>
                </div> : null}   
        </div>
    )
}

export function OperationDetails({ match }) {

    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/' + match.params.id + '/ops/' + match.params.pos)
            .then(res => res.json())
            .then((result) => {
                setItem(result);
                console.log(result)
                console.log(item)
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
                <div className="text-title">
                    ERRORE: errore nel database più elementi con lo stesso ID
                    </div>
            )
        } else {
            return (

                <div class="App">
                    <ul class="m-3">
                        {item.map(op => <li class="list-unstyled">

                            <Row class="text-title"> <h3>Operazione di {op.name} </h3>
                                <p class="text-title"><button type="button" class="btn btn-light">Modifica </button> </p>
                                <p class="text-title"><button type="button" class="btn btn-light">Elimina</button> </p>
                                <Col>
                                    <h2 class="text-white">Batteria {match.params.id} </h2>
                                </Col>
                            </Row>
                            <div class="text-normal">
                                <OpDescription operation={op} />

                            </div>
                        </li>
                        )}
                    </ul>
                </div>
            );
        }
    }
}

export default OperationDetails;