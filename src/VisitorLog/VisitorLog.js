import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle, Pagination, PaginationItem, PaginationLink, Spinner
} from "reactstrap";
import EntryModal from "./EntryModal";

export default class VisitorLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,

            page: 1,
            size: 10,

            data: {
                content: null,
                pageable: {
                    pageNumber: null
                },
                totalPages: null
            }
        }
    }

    componentDidMount() {
        this.load()
    }

    load() {
        this.setState({ isLoaded: false })
        fetch(`http://localhost:8080/rest/visitor-log?page=${this.state.page}&size=${this.state.size}`)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    data: data
                })
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    getPagination(size) {
        const pageNumber = this.state.data.pageable.pageNumber
        const totalPages = this.state.data.totalPages
        const half = Math.floor(totalPages / 2)
        const start = Math.max(0, pageNumber - half)
        const end = Math.max(totalPages, pageNumber + half)
        return Array.from({length: Math.min(end - start, size === null ? 5 : size)}, (start, i) => i + 1).map(i => (
            <PaginationItem key={"page" + i}>
                <PaginationLink active={(pageNumber === i - 1).toString()} disabled={pageNumber === i - 1} onClick={function () {
                    this.setState({page: i})

                }}>
                    {'' + i}
                </PaginationLink>
            </PaginationItem>
        ))
    }

    render() {
        const { error, isLoaded, data } = this.state;
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

                    <EntryModal/>
                    {
                        data.content.map(entry => (
                            <Card key={entry.id} >
                                <CardTitle>{entry.name}</CardTitle>
                                <CardBody>{entry.date}: {entry.message}</CardBody>
                            </Card>
                        ))
                    }
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                first
                                href="#"
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                previous
                            />
                        </PaginationItem>
                        {
                            this.getPagination(5)
                        }
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                next
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                last
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
            )
        }
    }
}