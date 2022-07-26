import React from "react";
import {
    Button,
    Card,
    CardBody, CardFooter, CardHeader,
    CardTitle,
    Spinner
} from "reactstrap";
import EntryModal from "./EntryModal";
import PaginationComponent from "../util/PaginationComponent";

export default class VisitorLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,

            pageNumber: 1,
            pageSize: 10,
            pageTotal: 0
        }
    }

    componentDidMount() {
        this.load()
    }

    load() {
        this.setState({ isLoaded: false })
        fetch('http://localhost:8080/rest/visitor-log')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    data: data,
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
        const { error, isLoaded, data, pageNumber, pageSize } = this.state;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else if (!isLoaded) {
            return (
                <div>
                    <Button color="primary" disabled>
                        <Spinner size="sm">
                            Loading...
                        </Spinner>
                        <span>
                            {' '}Loading
                        </span>
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className={"m-1"}>Visitor Log</h1>
                    <div className={"m-1"}>
                        <EntryModal/>
                    </div>
                    {
                        data.content.map(entry => (
                            <Card className={"m-1"} key={entry.id}>
                                <CardHeader>Name: {entry.name}</CardHeader>
                                <CardBody>Message: {entry.message}</CardBody>
                                <CardFooter>{new Date(entry.date).toLocaleString()}</CardFooter>
                            </Card>
                        ))
                    }
                    <div className={"m-1"}>
                        <PaginationComponent/>
                    </div>
                </div>
            )
        }
    }
}
