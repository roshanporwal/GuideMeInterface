import React, {  useState, useEffect } from "react";
import { MdArrowDownward } from "react-icons/md";
import AddFamily from "./AddFamily";
import * as auth_service from "../../service/auth_service";
import { Form } from "react-bootstrap";

function ForFamily(props) {
    const [familyshow, setAddFamilyShow] = useState(false);
    const handleFamilyClose = async () => {
        setAddFamilyShow(false);
        if (data !== null) {
            const familyInfo = await auth_service.getFamilyMembers(data._id);
            setFamily(familyInfo.payload);
        }
    };
    const handleFamilyShow = () => setAddFamilyShow(true);
    const [family, setFamily] = useState();
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
            let data = localStorage.getItem("login_patient");
            if (data !== null) {
                data = JSON.parse(data);
                setData(data);
                const familyInfo = await auth_service.getFamilyMembers(
                    data._id
                );
                setFamily(familyInfo.payload);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <AddFamily
                modalshow={familyshow}
                handleFamilyClose={handleFamilyClose}
            />
            <div className="col-11">
                <Form.Group>
                    <div className="prepend-icon">
                        <MdArrowDownward />
                    </div>
                    <Form.Control
                        as="select"
                        name="family"
                        onChange={(e) =>
                            props.setSelectedMember(family[e.target.value])
                        }
                        // value={props.formValues.family}
                        className="global-inputs dropdown-toggle"
                    >
                        <option key={99}>Select Family Member</option>
                        {family ? family.map((target, index) => (
                            <option key={index} value={index}>
                                {target.first_name} {target.last_name}
                            </option>
                        )):null}
                    </Form.Control>
                </Form.Group>
            </div>
            <div className="text-center mt-4 col-7">
                <input
                    className="add-family-button"
                    type="button"
                    onClick={handleFamilyShow}
                    value="Add Family Member"
                />
            </div>
        </>
    );
}

export default ForFamily;
