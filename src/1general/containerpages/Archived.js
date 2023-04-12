import React, { useContext, useEffect, useState } from "react";
import Classpanel from "../components/Classpanel";
import {
  myArchivedContext,
  myClasesContext,
  userInfoContext,
} from "../../Globalcontext";
import Archiveselection from "../../2prof/Archiveselection";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Archived() {
  const { setmyarchive, myarchive } = useContext(myArchivedContext);
  const { userinfo } = useContext(userInfoContext);
  const { setmyclasses, myclasses } = useContext(myClasesContext);

  const [selectclasses, setselectclasses] = useState(false);
  const [classselection, setclassselection] = useState();
  const [merged, setmerged] = useState(myclasses);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (myarchive !== undefined && myclasses !== undefined) {
      setmerged([...myclasses, ...myarchive]);
    }
  }, [myclasses, myarchive]);

  useEffect(() => {
    // Save the current page URL to localStorage before refresh
    localStorage.setItem("lastPage", location.pathname);
  }, [location]);

  useEffect(() => {
    if (merged !== undefined) {
      setclassselection(
        merged.map((item) => ({
          selected: item.isarchived,
          itemselect: item,
        }))
      );
    }
  }, [merged]);

  const handleselected = (selected, ee) => {
    setclassselection(
      classselection.map((item) => ({
        selected:
          item.itemselect.sec_name + item.itemselect.sub_name ===
          ee.itemselect.sec_name + ee.itemselect.sub_name
            ? selected
            : item.selected,
        itemselect: item.itemselect,
      }))
    );
  };

  const updateclasslist = async () => {
    console.log(JSON.stringify(classselection));
    await axios
      .post("https://api.kyusillid.online/api/updateclasslist", classselection)
      .then(navigate("/"))
      .catch();

    await axios
      .get(
        "https://api.kyusillid.online/api/getclasslist_archived/" +
          userinfo.user.acc_id
      )
      .then((response) => {
        setmyarchive(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(
        "https://api.kyusillid.online/api/getclasslist/" + userinfo.user.acc_id
      )
      .then((response) => {
        setmyclasses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex ">
      <div
        className={`archiveselection borderradius-lg tertiary  ${
          selectclasses && "archiveselectionactive"
        }`}
      >
        <ul>
          {classselection !== undefined &&
            classselection.map((item, key) => (
              <Archiveselection
                key={key}
                item={item}
                handleselected={handleselected}
              />
            ))}
        </ul>

        <button
          className="commonbutton lighttext secondary "
          onClick={updateclasslist}
        >
          {" "}
          Update Archived
        </button>
      </div>

      <div className="width100">
        <div className="classcontainer ">
          <div className="flex ">
            <h4> Archived classes</h4>
            <div className="marginleftauto">
              {userinfo.user.usertype === "prof" && (
                <div>
                  {!selectclasses ? (
                    <button
                      className="commonbutton secondary lighttext"
                      onClick={() => setselectclasses(true)}
                    >
                      {" "}
                      <h4>select classes </h4>
                    </button>
                  ) : (
                    <button
                      className="commonbutton secondary lighttext"
                      onClick={() => {
                        setselectclasses(false);
                      }}
                    >
                      {" "}
                      <h4> Cancel </h4>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            {myarchive !== undefined &&
              myarchive.map((element, key) => (
                <Classpanel key={key} classitem={element} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Archived;
