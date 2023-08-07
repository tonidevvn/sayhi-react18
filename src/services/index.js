import axios from "axios";

export async function getUsers(page) {
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

export async function getCovid19Stat() {
  let result = { can: null, regions: [] };
  try {
    let res = await axios.get(
      "https://api.opencovid.ca/summary?geo=pt&fill=true&version=true&pt_names=canonical&hr_names=canonical&fmt=json"
    );
    result.regions = res.data.data;

    res = await axios.get(
      "https://api.opencovid.ca/summary?geo=can&fill=true&version=true&hr_names=hruid&fmt=json"
    );
    result.can = res.data.data[0];

    console.log(result);
  } catch (err) {
    console.log("🚀 ~ file: index.js:23 ~ getCovid19Stat ~ err:", err);
  }
  return result;
}
