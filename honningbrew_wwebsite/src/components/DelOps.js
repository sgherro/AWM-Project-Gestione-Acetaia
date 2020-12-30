
import React, { Component} from 'react'

export class DelOps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flagModal: false,
        }
    }

    setFlag = () => {
        this.flagModal = this.setState({ flagModal: !this.state.flagModal })
    }

    submitHandler = () => {
       
        fetch('http://127.0.0.1:8000/api/v1/' + this.props.match.id + '/ops/' + this.props.match.pos, { method: 'DELETE' })
        window.history.back()

    }

    popUpWindow = () => {

        return (
            <div className="modal-wrapper" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminazione operazione</h5>
                        </div>
                        <div className="modal-body">
                            <p className="text-normal">Vuoi davvero eliminare questa operazione ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light"
                                data-bs-dismiss="modal" onClick={() => { this.submitHandler()}}>
                                Ok
                                </button>
                            <button type="button" className="btn btn-danger"
                                onClick={() => { this.setFlag() }}>
                                Cancella
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="text-title"><button type="button"
                    className="btn btn-light" onClick={() => this.setFlag()} >
                    Elimina </button> </div>
                {this.state.flagModal ? <this.popUpWindow /> : null}
            </div>
        )
    }


}

export default DelOps;