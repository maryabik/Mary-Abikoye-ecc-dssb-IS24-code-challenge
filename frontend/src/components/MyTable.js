import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import  {FaTrashAlt} from "react-icons/fa";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import EditForm from "./EditForm";
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import {Link} from "@mui/material";

const MyTable = ({data}) => {


    const columns = [
        {
            id: 'productId',
            label: 'Product Id',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'productName',
            label: 'Product Name',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'productOwnerName',
            label: 'Product Owner',
            minWidth: 80,
            align: 'right',

        },
        {
            id: 'Developers',
            label: 'Developer Names',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'scrumMasterName',
            label: 'Scrum Master',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'startDate',
            label: 'Start Date',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'methodology',
            label: 'Methodology',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'location',
            label: 'Location',
            minWidth: 80,
            align: 'right',
        },
        {
            id: 'action',
            label: 'Actions',
            minWidth: 80,
            align: 'right',
        }

    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    return (
        <>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{minWidth: column.minWidth}}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): data)
                        .map((product) => (

                                <TableRow
                                    key={product.id}
                                    hover role="checkbox"
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell id="idValue" className="item"
                                               align="right">{product.productId}
                                    </TableCell>
                                    <TableCell className="item" align="right">{product.productName}</TableCell>
                                    <TableCell className="item" align="right">{product.productOwnerName}</TableCell>
                                    <TableCell className="item" align="right">
                                        {product.Developers.map((person) =>
                                             <TableRow>{person.value}</TableRow>
                                        )}
                                    </TableCell>
                                    <TableCell className="item" align="right">{product.scrumMasterName}</TableCell>
                                    <TableCell className="item" align="right">{product.startDate}</TableCell>
                                    <TableCell className="item" align="right">{product.methodology}</TableCell>
                                    <TableCell className="item" align="right">
                                        <Link href={product.location} color="primary" underline="hover">{product.location}</Link>
                                    </TableCell>
                                    <TableCell className="item" align="right">
                                        <EditForm
                                            prodId={product.id}
                                            data={product}
                                        />

                                    </TableCell>
                                </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100, { label: 'All', value: -1 }]}
                component="div"
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}
export  default MyTable;
