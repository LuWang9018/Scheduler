import React from "react";
import Modal from 'react-awesome-modal';

export class AlertWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }

    closeModal() {
        this.setState({
            visible: !this.props.visible
        });
    }

    render() {
        console.log("Display Alert Window");
        console.log("Props:" + this.props.visible);
        console.log("Receive: " + this.state.visible);
        return <Modal visible={this.state.visible} className="alertWindow">
            <p className="alertText">
                Do you really want to close without save any change?</p>
            <div className="alertButton">
                <button className="alertYes" name="alertYes" onClick={() => {
                    this.props.onClick({
                        AddClassWindowOn: false,
                        Action: "Cancel"
                    })
                }}>Yes
                </button>
                <button className="alertNo" name="alertNo" onClick={this.closeModal}>Cancel</button>
            </div>
        </Modal>
    }
}