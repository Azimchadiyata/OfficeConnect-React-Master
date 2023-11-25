import React, { useEffect, useContext } from "react";
import { postDataAPI } from "../../../AxiosAPI/FetchData";
import Progressbar from "../progressbar/Progressbar";
import { AlertState } from "../../GolbalState/AlertState";
const Fileshowingview = ({
  datamap,
  setDatamap,
  Id,
  deleteurl,
  folderName,
  editing,
}) => {
  const { dispatchalert } = useContext(AlertState);

  const DeleteUploading = async (data, data2) => {
    if (editing) {
      if (data === undefined) {
        const filterdata = datamap.filter((item) => {
          return item["fileName"] !== data2;
        });
        setDatamap(filterdata);
      } else {
        const filterdata = datamap.filter((item) => {
          delete item["base64"];
          delete item["documentExt"];
          // delete item[`${deleteData}`];
          return item[`${Id}`] === data;
        });

        const datavalue = {
          fileName: filterdata[0]["fileName"],
          fileNameType: filterdata[0]["documentType"],
          folderName: Number(folderName),
          [Id]: filterdata[0][`${Id}`],
        };

        try {
          await postDataAPI(
            `${deleteurl}/${filterdata[0].fileName}&${
              filterdata[0].documentType
            }&${folderName}&${filterdata[0][`${Id}`]}`,
            datavalue
          )
            .then((res) => {
              if (res.status === 200) {
                dispatchalert({ type: "success" });

                const filterdata = datamap.filter((item) => {
                  return item[`${Id}`] !== data;
                });
                setDatamap(filterdata);
              }
            })
            .catch((error) => {
              console.log(error);
              dispatchalert({ type: "failed" });
            });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      const filterdata = datamap.filter((item) => {
        return item["fileName"] !== data;
      });
      setDatamap(filterdata);
    }
  };

  useEffect(() => {}, [datamap, setDatamap]);

  //   <Fileshowingview
  //   datamap={DocumentFile}
  //   setDatamap={setDocumentFile}
  //   Id="quldocId"
  //   deleteurl={`${APIbackendURl.basePointUrl}employeeservice/empQualification/deleteQualificationDocs`}
  //   folderName={`${HREmpId.product[0]}`}
  //   editing={`${formEditState}`}
  //   deleteData="eduQualificationId"
  // />

  return (
    <div className=" m-1 mr-2 flex flex-row flex-wrap align-items-center justify-content-center">
      {datamap.length > 0 &&
        datamap.map((item, index) => {
          return (
            <div key={index} className=" m-1 mr-2 pdfcolorcolor p-1">
              <p>
                <span className="mx-1  ">
                  <i
                    className="mdi mdi-file-document text-xl"
                    style={{ color: "#6990f2" }}
                  ></i>
                </span>

                <span className="pdfFontSize">
                  {item.fileName.split(".")[0]}
                </span>

                {editing ? (
                  <i
                    className="pdfnamemargin mdi mdi-close-circle-outline text-base hover:text-red-500"
                    onClick={() =>
                      DeleteUploading(item[`${Id}`], item.fileName)
                    }
                  ></i>
                ) : (
                  <i
                    className="pdfnamemargin mdi mdi-close-circle-outline text-base hover:text-red-500"
                    onClick={() => DeleteUploading(item.fileName)}
                  ></i>
                )}
              </p>
              <Progressbar
                bgcolor={"#6990f2"}
                completed={0}
                height={5}
              ></Progressbar>
            </div>
          );
        })}
    </div>
  );
};

export default Fileshowingview;
