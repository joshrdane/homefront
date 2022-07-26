import React from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText, Modal, ModalBody, ModalFooter,
    ModalHeader
} from "reactstrap";

class EntryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            name: '',
            message: ''
        }
    }

    handleSubmit = () => {
        fetch("http://localhost:8080/rest/visitor-log", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                message: this.state.message
            })
        }).catch(error => console.log(error))
        this.toggle()
        window.location.reload()
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    toggle = () => {
        this.setState({ visible: !this.state.visible })
    }

    render = () => {
        return (
            <div>
                <Button color={"primary"} onClick={this.toggle}>New Entry</Button>
                <Modal isOpen={this.state.visible} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <InputGroup>
                                    <InputGroupText>Name</InputGroupText>
                                    <Input name={"name"} onChange={this.handleChange} placeholder={"Johnathan Doe"}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup row>
                                <InputGroup>
                                    <InputGroupText>Message</InputGroupText>
                                    <Input name={"message"} onChange={this.handleChange} type={"textarea"} placeholder={"J0hn D03 w@z h3r3!"}/>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type={"submit"} color={"primary"} onClick={this.handleSubmit}>Submit</Button>{' '}
                        <Button color={"secondary"} onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default EntryModal