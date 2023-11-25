import React, { useContext } from "react";
import { Button } from "primereact/button";
import { postDataAPI } from "../../../AxiosAPI/FetchData";
import { Dialog } from "primereact/dialog";

import { AlertState } from "../../GolbalState/AlertState";
const DeleteProduct = ({
  product,
  DeleteData,
  deleteProductDialog,
  setDeleteProductDialog,
  allData,
  deletelink,
  APIbackendURl,
  setAllData,
  setProducts,
}) => {
  const { dispatchalert } = useContext(AlertState);
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = async () => {
    try {
      await postDataAPI(
        `${APIbackendURl.basePointUrl}${deletelink}`,
        DeleteData
      )
        .then((res) => {
          const data = allData.filter((item) => {
            return item.moduleId !== product;
          });
          setAllData(data);
          setProducts(data);
          setDeleteProductDialog(false);
          dispatchalert({ type: "success" });
        })
        .catch((error) => {
          console.log(error.response.data.error);
          dispatchalert({ type: "failed" });
        });
    } catch (err) {
      console.log(err.message);
      dispatchalert({ type: "failed" });
    }
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  // <DeleteProduct
  //         product={product}
  //         deleteProductDialog={deleteProductDialog}
  //         setDeleteProductDialog={setDeleteProductDialog}
  //         allData={allData}
  //
  //         DeleteData={{ moduleId: product }}
  //         deletelink={`applicationservice/moduleMaster/deleteByModuleId`}
  //         APIbackendURl={APIbackendURl}
  //         setAllData={setAllData}
  //         setProducts={setProducts}
  //       />

  return (
    <div>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3 text-indigo-500"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteProduct;
