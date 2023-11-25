import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { APIbackend } from "../../../../APIbackendurl";
import { getDataAPI, postDataAPI } from "../../../AxiosAPI/FetchData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Normalinput from "../../utilies/Normalinput";
import { putDataAPI } from "../../../AxiosAPI/FetchData";
import DeleteProduct from "../../utilies/Axiosuiltils/DeleteProduct";
import { AlertState } from "../../GolbalState/AlertState";
import { InputText } from "primereact/inputtext";
const SingleCreationComponent = ({
  getDataname,
  getDatalink,
  productSelectById,
  productSelectByName,
}) => {
  const [allData, setAllData] = useState([]);
  const [products, setProducts] = useState(
    useMemo(() => {
      return allData;
    }, [allData])
  );
  const [emptyProduct, setEmpyproduct] = useState({
    moduleName: "",
  });
  const [product, setProduct] = useState(emptyProduct);
  const [formShowing, setFormShowing] = useState(false);
  const [formEditState, setFormeditState] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);

  const { dispatchalert } = useContext(AlertState);

  const { APIbackendURl } = useContext(APIbackend);

  const toast = useRef(null);
  //form

  const handleSearch = (event) => {
    console.log(event.target.value);
    const value = event.target.value.toLowerCase();
    const result = allData.filter((item) => {
      return item["moduleName"].toLowerCase().indexOf(value) !== -1;
    });
    setProducts(result);
  };

  const schema = yup.object().shape({
    moduleName: yup.string().required("Please fill this field"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return product;
    }, [product]),
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = async (data) => {
    console.log(data);
    const data1 = {
      moduleId: data.moduleId,
      moduleName: data.moduleName,
    };
    try {
      formEditState
        ? await putDataAPI(
            `${APIbackendURl.basePointUrl}applicationservice/moduleMaster/updateModule`,
            data1
          )
            .then((res) => {
              if (res.status === 200) {
                dispatchalert({ type: "success" });
                setProduct(res.data);
                const result = products.map((item) => {
                  if (item["moduleId"] === res.data.moduleId) {
                    return (item = res.data);
                  }
                  return item;
                });
                setProducts(result);
              }
            })
            .catch((error) => {
              console.log(error.response.data.error);
              dispatchalert({ type: "failed" });
              // seteditstate(true);
            })
        : await postDataAPI(
            `${APIbackendURl.basePointUrl}applicationservice/moduleMaster/createModule`,
            data
          )
            .then((res) => {
              dispatchalert({ type: "success" });

              setProducts([res.data, ...products]);
              dispatchalert({ type: "success" });
            })
            .catch((error) => {
              dispatchalert({ type: "failed" });
            });
    } catch (err) {
      dispatchalert({ type: "failed" });
      console.log(err);
    }
    reset();
  };
  const hideDialog = () => {
    setFormShowing(false);
    setFormeditState(false);
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setFormShowing(true);
    setFormeditState(false);
  };
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const actionTablerow = useMemo(() => {
    const editProduct = (product) => {
      const result = allData.filter((item) => {
        return item["moduleId"] === product;
      });
      setProduct(result[0]);
      setFormShowing(true);
      setFormeditState(true);
    };
    return (
      products.length > 0 &&
      products.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.moduleName}</td>

            <td
              className="crudbtn maximum-widthedit  text-2xl justify-content-end  align-items-center pt-1  text-indigo-500  hover:text-indigo-600"
              onClick={() => editProduct(item["moduleId"])}
            >
              <i className="mdi mdi-border-color"></i>
            </td>
            <td
              className="crudbtn maximum-widthedit  text-2xl text-indigo-500 hover:text-indigo-600 align-items-center"
              onClick={() => confirmDeleteProduct(item["moduleId"])}
            >
              <i className="mdi mdi-delete"></i>
            </td>
          </tr>
        );
      })
    );
  }, [products, allData]);

  const dataofheader = [
    {
      field: "moduleName",
      header: "Module Name",
      style: "12rem",
    },
  ];
  useEffect(() => {
    const getAllModule = async () => {
      try {
        await getDataAPI(`${APIbackendURl.basePointUrl}${getDatalink}`)
          .then((res) => {
            if (res.status === 200) {
              setAllData(res.data[getDataname]);
              setProducts(res.data[getDataname]);
            }
          })
          .catch((error) => {
            dispatchalert({ type: "failed" });
          });
      } catch (err) {
        dispatchalert({ type: "failed" });
        console.log(err.message);
      }
    };
    getAllModule();
  }, [APIbackendURl, dispatchalert, setEmpyproduct, getDatalink, getDataname]);

  useEffect(() => {
    reset(product);
  }, [product, setProduct, reset]);

  console.log(products);

  return (
    <div>
      <div className="flex flex-row align-items-center justify-content-between mb-2">
        <div className="m-1">
          <span className="p-input-icon-right">
            <i className="pi pi-search" />
            <InputText
              placeholder="Module Name"
              name="empNo"
              autoComplete="off"
              onChange={(event) => handleSearch(event)}
            />
          </span>
        </div>
        <Button
          label="New"
          icon="pi pi-plus"
          className="bg-indigo-500 mr-2"
          onClick={openNew}
        />
      </div>

      <div>
        <Dialog
          visible={formShowing}
          style={{ width: "50vw" }}
          header=""
          onHide={hideDialog}
        >
          <div className="form-demo">
            <div className="flex justify-content-center">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <Normalinput
                        control={control}
                        name="moduleName"
                        errors={errors}
                        labelname="Module Name"
                        errorsName={errors.moduleName}
                      />
                    </div>
                    <div className=" col-md-4 mt-2">
                      <Button
                        type="submit"
                        label={formEditState ? "Update" : "submit"}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      <div className="datatable-crud-demo ">
        <Toast ref={toast} />

        {/* <div className=" overflow-auto max-h-10rem max-w-screen useshadow-table"> */}

        <div>
          <table className="CrudTable w-12 ">
            <thead>
              <tr className="">
                {dataofheader.map((item, index) => {
                  return (
                    <th key={index} className="max-w-20rem">
                      {item.header}
                    </th>
                  );
                })}

                <th className="min-w-4rem crudbtn maximum-widthedit justify-content-end text-sm text-indigo-500 hover:text-indigo-600 align-items-center">
                  edit
                </th>
                <th className="min-w-4rem  crudbtn maximum-widthedit text-sm text-indigo-500 hover:text-indigo-600 align-items-center">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>{actionTablerow}</tbody>
          </table>
        </div>
        <DeleteProduct
          product={product}
          deleteProductDialog={deleteProductDialog}
          setDeleteProductDialog={setDeleteProductDialog}
          allData={allData}
          const
          DeleteData={{ moduleId: product }}
          deletelink={`applicationservice/moduleMaster/deleteByModuleId`}
          APIbackendURl={APIbackendURl}
          setAllData={setAllData}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
};

export default React.memo(SingleCreationComponent);
