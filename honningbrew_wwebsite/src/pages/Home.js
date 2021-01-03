import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import acetaia from './../images/acetaia.png'
import prodotti from './../images/prodotti.png'
import casolare from './../images/casolare.png'
import botti from './../images/botti.png'
import acetouva from './../images/acetouva.png'
import acetosingolo from './../images/acetosingolo.png'
import uva from './../images/uva.png'
import versare from './../images/versare.png'
import luogo from './../images/luogo.png'
import { Carousel } from 'react-bootstrap'

// TODO fare i pulsanti
// TODO implemenatare altre funzioni?

export function Home() {

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/v1/')
            .then(res => res.json())
            .then((result) => {
                setItems(result);
            },
                (error) => {
                    setError(error);

                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {

        return (

            <div className="m-3">
                <div className="text-title">
                    <button type="button" className="btn btn-light">Aggiungi batteria</button>
                    <button type="button" className="btn btn-light"> Degustazioni</button>
                    <button type="button" className="btn btn-light"> Elimina batteria</button>
                </div>

                <div className="text-title">
                    <Col>

                        <Row>
                            <h3>
                                Lista batterie
                            </h3>
                        </Row>
                        <Row>
                            <div role="tablist">
                                <ul className="list-unstyled">
                                    {items.map(item => (
                                        <li key={item.id}>
                                            <Link className="list-group-item list-group-item-action" to={"/" + item.name}>
                                                <h5>
                                                    Batteria {item.name}
                                                </h5>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Row>
                    </Col>

                </div>

                <Carousel wrap={true}>
                    <Carousel.Item interval={7000}>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={acetaia}
                                        alt="Card  cap"
                                        height="400px" />
                                </div>
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={botti}
                                        height="400px"
                                        alt="Card  cap" />

                                </div>
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={acetouva}
                                        alt="Card  cap"
                                        height="400px" />
                                </div>
                            </div>
                        </div>
                        <Carousel.Caption>
                            <h3>La nostra acetaia</h3>
                            <p>"Vola bas e schiv i sas" cit. Nonna Lola"</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                                                <div class="row">
                            <div class="col-md-4">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={prodotti}
                                        alt="Card  cap"
                                        height="400px" />
                                </div>
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={acetosingolo}
                                        height="400px"
                                        alt="Card  cap" />

                                </div>
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={versare}
                                        alt="Card  cap"
                                        height="400px" />
                                </div>
                            </div>
                        </div>
                        <Carousel.Caption>
                            <h3>I nostri aceti</h3>
                        </Carousel.Caption>
                    </Carousel.Item >
                    <Carousel.Item interval={5000}>
                    <div class="row">
                            <div class="col-md-4">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={luogo}
                                        alt="Card  cap"
                                        height="400px" />
                                </div>
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={casolare}
                                        height="400px"
                                        alt="Card  cap" />

                                </div>
                            </div>

                            <div class="col-md-4 clearfix d-none d-md-block">
                                <div class="card mb-2">
                                    <img class="card-img-top" src={uva}
                                        alt="Card  cap"
                                        height="400px" />
                                </div>
                            </div>
                        </div>
                        <Carousel.Caption>
                            <h3>Tenuta Honningbrew</h3>
                            <p>Nel cuore della regione di Riften</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Home;