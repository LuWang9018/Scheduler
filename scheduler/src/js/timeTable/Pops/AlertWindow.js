import React from "react";
import Modal from 'react-awesome-modal';

export class AlertWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }

    render() {
        console.log("Display Alert Window");
        console.log("Props:" + this.props.visible);
        console.log("Receive: " + this.state.visible);
        return <Modal visible={this.state.visible} className="alertWindow">
            <p className="alertText">
                Do you really want to close without save any change?</p>
            <div className="alertButton">
                <button className="alertYes" name="alertYes"
                        onClick={this.props.changeVisible}>Yes
                </button>
                <button className="alertNo" name="alertNo"
                        onClick={this.props.changeVisible}>Cancel
                </button>
            </div>
        </Modal>
    }
}