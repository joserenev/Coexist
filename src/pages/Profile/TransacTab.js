import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
    { id: "receiptName", label: "Receipt Name", minWidth: 170 },
    {
        id: "createdAt",
        label: "Date Created",
        minWidth: 170,
        format: value => {
            return new Date(value).toDateString();
        }
    },
    { id: "groupName", label: "Group Name", minWidth: 100 },
    {
        id: "receiptAmount",
        label: "Total Amount",
        minWidth: 170,
        align: "right",
        format: value => {
            return "$" + Number(value).toFixed(2);
        }
    },
    {
        id: "userAmount",
        label: "Your share",
        minWidth: 170,
        align: "right",
        format: value => {
            return "$" + Number(value).toFixed(2);
        }
    },
    {
        id: "receiptStatus",
        label: "Receipt Status",
        minWidth: 170
    }
];

function appendData(
    arr,
    receiptName,
    createdAt,
    groupName,
    receiptAmount,
    userAmount,
    receiptStatus
) {
    arr.push({
        receiptName,
        createdAt,
        groupName,
        receiptAmount,
        userAmount,
        receiptStatus
    });

    // return {
    //     receiptName,
    //     groupName,
    //     receiptAmount,
    //     userAmount,
    //     receiptStatus
    // };
}

function filterUndefinedAndNullElements(arr) {
    return arr.filter(element => {
        return element !== null && element !== undefined && element !== null;
    });
}

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    container: {
        maxHeight: 440
    }
});

export default function StickyHeadTable({ data }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createDataUtil = React.useCallback(() => {
        const newRows = [];
        const groupItemsList = filterUndefinedAndNullElements(
            data?.getUser?.groups?.items ?? []
        );

        const groupItems = filterUndefinedAndNullElements(
            groupItemsList.map(item => {
                return item.group;
            })
        );

        const userID = data?.getUser?.id ?? "";
        groupItems.forEach(group => {
            const { name: groupName, receipts: rawReceipts } = group ?? {};
            const receipts = filterUndefinedAndNullElements(
                rawReceipts.items ?? []
            );

            receipts.forEach(receipt => {
                const {
                    name: receiptName,
                    totalAmount: receiptAmount,
                    memberSplit: rawMemberSplit,
                    approvalStatus,
                    createdAt
                } = receipt ?? {};
                const memberSplitMap = new Map(JSON.parse(rawMemberSplit));
                appendData(
                    newRows,
                    receiptName,
                    createdAt,
                    groupName,
                    receiptAmount,
                    memberSplitMap.get(userID),
                    approvalStatus ?? "PENDING"
                );
            });
        });

        setRows(newRows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    }, [data]);

    if (rows === null) {
        createDataUtil();
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows !== null &&
                            rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map(row => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                        >
                                            {columns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format !=
                                                            null &&
                                                        column.format !==
                                                            undefined
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
