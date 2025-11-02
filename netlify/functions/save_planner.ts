import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { firestore } from "../../src/utils/firebase_config";
import { type PLANNER_DATA_TYPE } from "../../src/utils/Planner_Data";

export const handler = async () => {
  const snapshot = await getDocs(collection(firestore, "planner"));

  const data: PLANNER_DATA_TYPE[] = [];
  
  snapshot.forEach((doc) => data.push(doc.data() as PLANNER_DATA_TYPE));
  
  const saved = await getDocs(collection(firestore, "saved_planner"));
  
  const failList: number[] = [];
  let successCount = 0;
  data.map((item) => {
    if(item.SchPerformCheck === false) failList.push(item.SchNo);
    else successCount++;
  });

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth()는 0~11
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  await setDoc(doc(firestore, "saved_planner", "saved" + (saved.size + 1)),
  {
    PerSvNo: saved.size + 1,
    PerSvFailScnNoList: failList,
    PerSvSucSchNoCount: successCount,
    PerSvSchCount: data.length,
    PerSvTime: time,
  });

  return { statusCode: 200, body: "success" };
}

export const config = {
  schedule: "6 10 * * *",
}