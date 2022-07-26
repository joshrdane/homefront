import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardTitle, Pagination, PaginationItem, PaginationLink, Spinner
} from "reactstrap";
import EntryModal from "./EntryModal";

class VisitorLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        }
    }

    componentDidMount() {
        this.load()
    }

    load = () => {
        fetch('http://localhost:8080/rest/visitor-log')
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
        const { pageNumber, pageSize, totalPages } = this.state.pageable
        const half = this.state.data.pageable.totalPages / 2
        const start = Math.max(1, this.state.data.pageable.pageNumber + 1 - half)
        const end = Math.min(this.state.totalPages, this.state.page + half + (this.state.totalPages % 2))
        console.log("start")
        console.log(this.state.totalPages)
        console.log(half.toString())
        console.log(start.toString())
        console.log(end.toString())
        return Array.from({length: Math.min(end - start + 1, size === null ? 5 : size)}, (start, i) => i + 1).map(i => (
            <PaginationItem>
                <PaginationLink key={"page" + i} active={(this.state.page === i).toString()}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        ))
    }

    render = () => {
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
                                <CardBody>{entry.message}</CardBody>
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


export default VisitorLog