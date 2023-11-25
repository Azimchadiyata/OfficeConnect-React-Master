import React, { useState } from 'react';
import {
    Typography,
    Collapse,
    Paper,
    IconButton,
    Snackbar,
} from '@mui/material';
import axios from 'axios';
import { Alert } from '@mui/material';

import { InsertDriveFile, Download, Delete } from '@mui/icons-material';
import Progressbar from '../../../../../utilies/progressbar/Progressbar';

import { DownloaGetAPI } from '../../../../../../AxiosAPI/FetchData'; // Make sure to import the required Axios functionality

const GovtDocFileDownload = ({ datamap, downloadlink, folderName, Id }) => {
    const [documentViewOpen, setDocumentViewOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleToggleDocumentView = () => {
        setDocumentViewOpen(!documentViewOpen);
    };

    const handleFileDownload = async (data) => {
        const filterdata = datamap.filter((item) => item[Id] === data);

        try {
            const response = await DownloaGetAPI(
                `${downloadlink}/${filterdata[0].fileName}&${filterdata[0].documentType}&${folderName}`
            );

            if (response.status === 200 && response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    `${filterdata[0].documentType}-${filterdata[0].fileName}`
                );
                document.body.appendChild(link);
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);

                setAlert({
                    type: 'success',
                    message: 'Document downloaded successfully.',
                });
            }
        } catch (error) {
            console.log(error);
            setAlert({
                type: 'error',
                message: 'Failed to download document.',
            });
        }
    };

    const handleDeleteFile = async (fileName, fileNameType, folderName, govtDocId) => {
        try {
            const response = await axios.post(
                `${APIbackendURl.basePointUrl}employeeservice/empQualification/deleteQualificationDocs/${fileName}&${fileNameType}&${folderName}&${govtDocId}`
            );
            if (response.status === 200) {
                setAlert({
                    type: 'success',
                    message: 'Document deleted successfully.',
                });
                // Handle successful deletion, such as updating the UI or fetching updated data
            }
        } catch (error) {
            console.error('Error:', error);
            setAlert({
                type: 'error',
                message: 'Failed to delete document.',
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div>
            <div className="divpairedData mx-1">
                <Typography className="profilefontSize minwithforSidelines">
                    Document
                </Typography>
                <div onClick={handleToggleDocumentView}>
                    <Typography className="minwithforSidelines1 flex flex-row flex-wrap text-600 text-primary-500">
                        {documentViewOpen
                            ? 'Close Document view'
                            : 'Click Document details'}
                    </Typography>
                </div>
            </div>
            <Collapse in={documentViewOpen}>
                <Paper className="m-1 mr-2 flex flex-row flex-wrap align-items-center justify-content-start">
                    {datamap.length > 0 &&
                        datamap.map((item, index) => (
                            <div className="m-1 mr-2 pdfcolorcolor p-1" key={index}>
                                <Typography>
                                    <span className="mx-1">
                                        <InsertDriveFile
                                            className="mdi mdi-file-document text-xl"
                                            style={{ color: '#6990f2' }}
                                        />
                                    </span>
                                    <span className="pdfFontSize">
                                        {item.fileName.split('.')[0]}
                                    </span>
                                    <IconButton
                                        className="pdfnamemargin"
                                        onClick={() => handleFileDownload(item[Id])}
                                    >
                                        <Download className="mdi mdi-download text-base hover:text-green-500" />
                                    </IconButton>
                                    <IconButton
                                        className="pdfnamemargin"
                                        onClick={() =>
                                            handleDeleteFile(
                                                item.fileName,
                                                item.documentType,
                                                folderName,
                                                item.govtDocId
                                            )
                                        }
                                    >
                                        <Delete className="mdi mdi-delete text-base hover:text-red-500" />
                                    </IconButton>
                                </Typography>
                                <Progressbar bgcolor={'#6990f2'} completed={0} height={5} />
                            </div>
                        ))}
                </Paper>
            </Collapse>
            <Snackbar
                open={alert !== null}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert ? alert.type : 'success'}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    {alert ? alert.message : ''}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default GovtDocFileDownload;