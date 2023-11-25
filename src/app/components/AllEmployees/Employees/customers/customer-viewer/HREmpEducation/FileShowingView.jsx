import React, { useEffect, useContext } from "react";
import { postDataAPI } from "../../../../../../AxiosAPI/FetchData";
import Progressbar from "../../../../../utilies/progressbar/Progressbar";
import { AlertState } from "../../../../../GlobalState/AlertState";
import {
  Typography,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import { DeleteOutline, InsertDriveFile } from "@mui/icons-material";

const Fileshowingview = ({
  datamap,
  setDatamap,
  Id,
  deleteurl,
  folderName,
  editing,
}) => {
  // const { dispatchalert } = useContext(AlertState);

  const handleDeleteUploading = async (data, data2) => {
    if (editing) {
      if (data === undefined) {
        const filterdata = datamap.filter((item) => item["fileName"] !== data2);
        setDatamap(filterdata);
      } else {
        const filterdata = datamap.filter((item) => {
          delete item["base64"];
          delete item["documentExt"];
          return item[Id] === data;
        });

        const datavalue = {
          fileName: filterdata[0]["fileName"],
          fileNameType: filterdata[0]["documentType"],
          folderName: Number(folderName),
          [Id]: filterdata[0][Id],
        };

        try {
          await postDataAPI(
            `${deleteurl}/${filterdata[0].fileName}&${filterdata[0].documentType
            }&${folderName}&${filterdata[0][Id]}`,
            datavalue
          )
            .then((res) => {
              if (res.status === 200) {
                // dispatchalert({ type: "success" });

                const filterdata = datamap.filter((item) => item[Id] !== data);
                setDatamap(filterdata);
              }
            })
            .catch((error) => {
              console.log(error);
              // dispatchalert({ type: "failed" });
            });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      const filterdata = datamap.filter((item) => item["fileName"] !== data);
      setDatamap(filterdata);
    }
  };

  useEffect(() => { }, [datamap, setDatamap]);

  return (
    <div className="m-1 mr-2 flex flex-row flex-wrap align-items-center justify-content-center">
      <Collapse in={datamap.length > 0}>
        <Paper className="m-1 mr-2 flex flex-row flex-wrap align-items-center justify-content-center">
          {datamap.map((item, index) => (
            <div key={index} className="m-1 mr-2 pdfcolorcolor p-1">
              <Typography>
                <span className="mx-1">
                  <InsertDriveFile
                    className="mdi mdi-file-document text-xl"
                    style={{ color: "#6990f2" }}
                  />
                </span>
                <span className="pdfFontSize">
                  {item.fileName.split(".")[0]}
                </span>
                <IconButton
                  onClick={() =>
                    editing
                      ? handleDeleteUploading(item[Id], item.fileName)
                      : handleDeleteUploading(item.fileName)
                  }
                >
                  <DeleteOutline
                    className="pdfnamemargin"
                    style={{ color: "#f44336" }}
                  />
                </IconButton>
              </Typography>
              <Progressbar
                bgcolor={"#6990f2"}
                completed={0}
                height={5}
              ></Progressbar>
            </div>
          ))}
        </Paper>
      </Collapse>
    </div>
  );
};

export default Fileshowingview;
