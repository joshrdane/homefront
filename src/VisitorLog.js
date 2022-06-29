import React from "react";
import {Card, CardBody, CardTitle} from "reactstrap";

class VisitorLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            entries: []
        }
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