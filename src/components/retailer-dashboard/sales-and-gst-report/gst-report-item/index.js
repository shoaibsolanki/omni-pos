import React from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";
import { Button, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';

const GstReportItem = () => {
    const { gst_report_item_table_data } = useSelector(state => state.ComponentPropsManagement)
    const columns = [
        {
            name: 'HSN Code',
            selector: row => row.hsn_code,
        },
        {
            name: 'Total',
            selector: row => row.total_value,
        },
        {
            name: "Total Discount",
            selector: row => row.total_discount
        },
        {
            name: 'Tax',
            selector: row => row.tax_value,
        },
        {
            name: 'IGST',
            selector: row => row.igst,
        },
        {
            name: 'CGST',
            selector: row => row.cgst,
        },
        {
            name: 'SGST',
            selector: row => row.sgst,
        },
        {
            name: 'CESS',
            selector: row => row.cess,
        },
        {
            name: 'Additional Cess',
            selector: row => row.additional_cess,
        },
        {
            name: 'Flood Cess',
            selector: row => row.flood_cess,
        },
        {
            name: "Other Taxes",
            selector: row => row.other_taxes
        },


    ];

    const actionsMemo = React.useMemo(() => {
        return (<>
            <CSVLink data={gst_report_item_table_data}>
                <Button className='btn btn-sm' style={{ backgroundColor: "var(--primary1)", border: "none" }}>
                    Export
                </Button>
            </CSVLink>
        </>)
    }, []);

    return (<>

        <Card className='my-3'>
            <CardBody>
                {`GST Report Item | Last 30 Days (Business Date: ${moment(new Date()).format("DD-MMM-Y")})`}
            </CardBody>
        </Card>

        <DataTable
            columns={columns}
            responsive={true}
            data={gst_report_item_table_data}
            // title={`GST Report Item | Last 30 Days (Business Date: ${moment(new Date()).format("DD-MMM-Y")})`}
            actions={actionsMemo}
        />
    </>)
}

export default GstReportItem