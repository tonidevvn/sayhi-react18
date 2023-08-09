import axios from "axios";
import { add, selectUsers } from "../store/reducers/Users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export async function getUsers(page = 1) {
  let result = [];
  try {
    let pageNo = !!page ? page : 1;
    const res = await axios.get(`https://reqres.in/api/users?page=${pageNo}`);
    result = res.data.data;
    console.log(result);
  } catch (error) {
    console.log("🚀 ~ file: index.js:11 ~ getUsers ~ error:", error);
  }
  return result;
}

export async function getCovid19Stat(date = "") {
  let result = { date: "", regions: [] };
  try {
    let url =
      "https://api.opencovid.ca/summary?geo=pt&fill=true&version=true&pt_names=canonical&hr_names=canonical&fmt=json";
    if (!!date) {
      url = url.concat(`&date=${date}`);
    }
    console.log("🚀 ~ file: index.js:27 ~ getCovid19Stat ~ url:", url);
    let res = await axios.get(url);
    result.regions = res.data.data;
    result.date = result.regions[0].date;
    console.log(result);
  } catch (err) {
    console.log("🚀 ~ file: index.js:23 ~ getCovid19Stat ~ err:", err);
  }
  return result;
}

export const useFetchUser = (page = 1) => {
  const dispatch = useDispatch();
  let data = useSelector(selectUsers);

  useEffect(() => {
    async function fetchData() {
      data = await getUsers(page);
      console.log("🚀 ~ file: index.js:45 ~ fetchData ~ data:", data);
      if (!!data) dispatch(add(data)); // trigger to store by redux
    }

    fetchData();
  }, []);

  return data;
};
