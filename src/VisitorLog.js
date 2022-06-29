import React from "react";
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input, InputGroup, InputGroupText, Label} from "reactstrap";

class VisitorLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            entries: [],

            name: '',
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/rest/visitor-log')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    entries: data
                })
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }


    handleSubmit(event) {
        event.preventDefault()
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
        })
    }

    render() {
        const { error, isLoaded, entries } = this.state;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else if (!isLoaded) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div>
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
                                <Button type={"submit"}>Submit</Button>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    {
                        entries.map(entry => (
                            <Card key={entry.id} >
                                <CardTitle>{entry.name}</CardTitle>
                                <CardBody>{entry.message}</CardBody>
                            </Card>
                        ))
                    }
                </div>
            )
        }
    }
}

export default VisitorLog;