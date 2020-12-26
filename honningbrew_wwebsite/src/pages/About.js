import React from 'react'
import { Row, Col} from 'reactstrap';

// TODO da completare

export function About() {

        return (

            <div className="m-5">
                <Row className="text-title"> <h2> Chi siamo ? </h2></Row>
               
                <Col>
                <Row className="text-title"> <h4 className="text-normal">Simone Ferrari </h4></Row>
                <Row className="text-title"> <h5 className="text-normal"> IMMAGINE DA METTERE </h5></Row>
                <Row className="text-title"> <h5 className="text-normal"> Studente Unimore (matricola 137080)</h5></Row>
                <Row className="text-title"> <h5 className="text-normal"> Molto bello </h5></Row>
                </Col>
                
                <Col>
                <Row className="text-title"> <h4 className="text-normal"> Tommaso Miana</h4></Row>
                <Row className="text-title"> <h5 className="text-normal"> IMMAGINE DA METTERE</h5></Row>
                <Row className="text-title"> <h5 className="text-normal"> Studente Unimore (matricola 000000)</h5></Row>
                <Row className="text-title"> <h5 className="text-normal"> Molto pelato </h5></Row>
                
                </Col>
            </div>
        );
    }


export default About;