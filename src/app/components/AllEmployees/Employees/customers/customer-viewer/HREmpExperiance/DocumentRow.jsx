// DocumentRow.js
import React from 'react';
import { TableRow, TableCell, Chip, IconButton } from '@mui/material';
import { AttachmentOutlined, CloudUpload } from '@mui/icons-material';

const DocumentRow = ({ documentType, selectedFileName, handleRemoveFile, handleFileSelect }) => {
    return (
        <TableRow>
            <TableCell>{documentType}</TableCell>
            <TableCell>
                {selectedFileName && (
                    <Chip
                        label={selectedFileName}
                        onDelete={() => handleRemoveFile(selectedFileName)}
                        icon={<AttachmentOutlined />}
                    />
                )}
            </TableCell>
            <TableCell>
                <input
                    accept="application/pdf"
                    multiple
                    type="file"
                    id={`fileInput-${documentType}`} // Unique identifier
                    name={documentType}
                    onChange={(e) => handleFileSelect(e, documentType)}
                    style={{ display: 'none' }}
                />
                <label htmlFor={`fileInput-${documentType}`}> {/* Unique identifier */}
                    <IconButton component="span">
                        <CloudUpload />
                    </IconButton>
                </label>
            </TableCell>
        </TableRow>
    );
};

export default DocumentRow;
