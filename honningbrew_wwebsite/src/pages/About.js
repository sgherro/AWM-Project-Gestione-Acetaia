import React from 'react'
import { Row, Col } from 'reactstrap';

export function About() {

    return (

        <div className="m-5">
            <Row className="text-title"> <h2> Chi siamo ? </h2></Row>
            <Row>
                <Col xs={3}>
                    <Row className="text-title"> <h4 className="text-normal">Simone Ferrari </h4></Row>
                    <Row className="text-title">
                        <img className="text-normal" src="https://avatars1.githubusercontent.com/u/44051210?s=400&u=30860722e37ce4d0e28a7abe2f456d7a17bfcb86&v=4" height="300px" weight="300px" alt="Simone" /> </Row>
                    <Row className="text-title"> <h5 className="text-title"> Studente Unimore</h5></Row>
                    <Row className="text-title"> <h5 className="text-normal"> "Un aceto buono vale più di un sorriso" </h5></Row>
                </Col>

                <Col xs={3}>
                    <Row className="text-title"> <h4 className="text-normal"> Tommaso Miana</h4></Row><Row className="text-title">
                        <img className="text-normal" src="https://avatars2.githubusercontent.com/u/45394060?s=400&u=2b50b988834d43ae0f24be1dba697c6638936f84&v=4" height="300px" weight="300px" alt="Tommaso" /> </Row>
                    <Row className="text-title"> <h5 className="text-title"> Studente Unimore</h5></Row>
                    <Row className="text-title"> <h5 className="text-normal"> "L'aceto è la mia passione sin da quando ero un piccolo grappolo" </h5></Row>

                </Col>
            </Row>
        </div>
    );
}


export default About;