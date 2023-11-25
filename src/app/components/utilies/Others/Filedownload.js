import React, { useContext, useState } from "react";
import { DownloaGetAPI } from "../../../AxiosAPI/FetchData";
import Progressbar from "../progressbar/Progressbar";
import { AlertState } from "../../GolbalState/AlertState";
const Filedownload = ({ datamap, downloadlink, folderName, Id }) => {
  const { dispatchalert } = useContext(AlertState);

  const [DocumnetView, setDocumnetView] = useState(false);
  const FileDowloader = async (data) => {
    const filterdata = datamap.filter((item) => {
      return item[`${Id}`] === data;
    });

    try {
      await DownloaGetAPI(
        `${downloadlink}/${filterdata[0].fileName}&${filterdata[0].documentType}&${folderName}`
      )
        .then((res) => {
          if (res.status === 200 && res.data) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
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
            dispatchalert({ type: "downloadsuccess" });
          }
        })
        .catch((error) => {
          console.log(error);
          dispatchalert({ type: "failed" });
        });
    } catch (err) {
      console.log(err);
    }
  };

  //   <Filedownload
  //   datamap={DocumentFile}
  //   setDatamap={setDocumentFile}
  //   Id="quldocId"
  //   deleteurl={`${APIbackendURl.basePointUrl}employeeservice/empQualification/deleteQualificationDocs`}
  //   folderName={`${HREmpId.product[0]}`}
  //   editing={`${formEditState}`}
  //
  // />

  return (
    <div>
      <div className="divpairedData mx-1">
        <p className=" profilefontSize minwithforSidelines ">Document</p>
        <div
          onClick={() => {
            setDocumnetView(!DocumnetView);
          }}
        >
          <p className="minwithforSidelines1 flex flex-row flex-wrap text-600 text-primary-500">
            {DocumnetView ? "close Document view" : "Click Document details"}
          </p>
        </div>
      </div>

      {DocumnetView && (
        <div className=" m-1 mr-2 flex flex-row flex-wrap align-items-center justify-content-start">
          {datamap.length > 0 &&
            datamap.map((item, index) => {
              return (
                <div
                  className=" m-1 mr-2 pdfcolorcolor p-1"
                  key={index}
                  onClick={() => FileDowloader(item[`${Id}`])}
                >
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

                    <i className="pdfnamemargin mdi mdi-download text-base hover:text-green-500"></i>
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
      )}
    </div>
  );
};

export default Filedownload;
