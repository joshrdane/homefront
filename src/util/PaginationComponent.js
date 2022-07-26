import React from "react";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

export default class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: undefined,
            pagination: {
                enabled: {
                    first: true,
                    previous: true,
                    next: true,
                    last: true
                },
                visible: {
                    first: true,
                    previous: true,
                    next: true,
                    last: true
                }
            },
            count: 5,
            page: 1,
            pages: 1
        }
    }

    render() {
        const { size, pagination, count, page, pages } = this.state;
        return (
            <Pagination size={size}>
                <PaginationItem disabled={!pagination.enabled.first || page === 1} visible={pagination.visible.first}>
                    <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem disabled={!pagination.enabled.previous || page === 1} visible={pagination.visible.previous}>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {
                    Array.from({ length: Math.min(count, pages)}, (_, i) => Math.min(Math.max(1, page - count / 2)) + i).map(index =>
                        <PaginationItem active={index === page}>
                            <PaginationLink>
                                {index}
                            </PaginationLink>
                        </PaginationItem>
                    )
                }
                <PaginationItem disabled={!pagination.enabled.next || page === pages} visible={pagination.visible.next}>
                    <PaginationLink next href="#" />
                </PaginationItem>
                <PaginationItem disabled={!pagination.enabled.last || page === pages} visible={pagination.visible.last}>
                    <PaginationLink last href="#" />
                </PaginationItem>
            </Pagination>
        )
    }
}