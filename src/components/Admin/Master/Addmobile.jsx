import { React, useState, useEffect } from "react";
import { Db } from "../../../Firebase/Firebase-Config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
function Addmobile() {
  const [Userdata, Setuserdata] = useState([]);
  const [Mobile, Setmobile] = useState(0);
  const [Name, Setname] = useState("hello");
  const [Loading, Setloading] = useState(false);
  const Usercollectionred = collection(Db, "Users");
  const Adduser = async () => {
    Setloading(true);
    await addDoc(Usercollectionred, { Name: Name, mobile: Mobile })
      .then(() => {
        Setloading(false);
        Getusers();
      })
      .catch(() => {
        Setloading(false);
      });
  };
  const Getusers = async () => {
    const Data = await getDocs(Usercollectionred);
    Setuserdata(Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    Getusers();
  }, []);

  if (Loading) {
    return (
      <div class="loader flex justify-center items-center h-screen">
        <div data-glitch="Loading..." class="glitch">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div>
      <input
        placeholder="Mobile"
        onChange={(e) => {
          Setmobile(e.target.value);
        }}
      />
      <input
        placeholder="Name"
        onChange={(e) => {
          Setname(e.target.value);
        }}
      />
      <button onClick={Adduser}>Click</button>
      {Userdata.map((user) => {
        return (
          <div>
            <h1>{user.Name}</h1>
            <h1>{user.mobile}</h1>
          </div>
        );
      })}
    </div>
  );
}
export default Addmobile;
