import { useContext, useCallback } from "react";
import { POSTDataAPIPASSId } from "../../../AxiosAPI/FetchData";
import { APIbackend } from "../../../../APIbackendurl";
const Debouncefilter = (
  arrayDelete,
  filterParameter,
  setAllData,
  setProducts,
  resData,
  url
) => {
  const { APIbackendURl } = useContext(APIbackend);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 600);
    };
  };

  const myFunction11 = async (data) => {
    if (data.empNo === "") {
      delete data.empNo;
    }

    if (data.firstName === "") {
      delete data.firstName;
    }
    try {
      await POSTDataAPIPASSId(`${APIbackendURl.basePointUrl}${url}`, data).then(
        (res) => {
          if (res.status === 200) {
            setAllData(res.data[`${resData}`]);
            setProducts(res.data[`${resData}`]);
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useCallback(debounce(myFunction11({ ...filterParameter })), []);
};

export default Debouncefilter;
