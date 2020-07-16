import React, {useState} from "react";

import classes from "./add-new-component.module.css";

import ConfirmComponent from "../ConfirmComponent/confirm-component";
import Modal from "../../../../../Modal/modal";

const AddNewComponent = ({closeFunc, addNewComponent, classesList, componentsList}) => {
    const [component] = useState({
        NAME: "", MEASURE: "", CLASS_NAME: "", CLASS_ID: -1
    });
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const toggleDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    };
    const toggleConfirm = () => {
        setDisplayConfirm(!displayConfirm);
    };

    const handleChange = (event) =>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        switch (name) {
            case "name":
                component.NAME = value;
                break;
            case "measure":
                component.MEASURE = value;
                break;
            case "className":
                component.CLASS_NAME = value;
                break;
            default:
        }
    };
    const handleSelect = (el) => {
        component.CLASS_NAME = el.NAME;
        component.CLASS_ID = el.ID;
        toggleDropdown();
    };

    const isValidComponent = () => {
        if (component.CLASS_NAME.toLowerCase() === "cup") {
            if (component.NAME.match(/^cup.([0-9]*\.[0-9]+|[0-9]+)/i) === null) {
                alert("Incorrect name format for cup category (should be \"cup/*number*\")");
                return false;
            }
        }
        for (let i = 0; i < componentsList.length; i++) {
            if (component.NAME.toLowerCase() === componentsList[i].NAME.toLowerCase()) {
                alert("Such component exists!");
                return false;
            }
        }
        return component.NAME !== "" && component.MEASURE !== "" && component.CLASS_NAME !== "";
    };

    const onAdd = () => {
        if (isValidComponent()) {
            toggleConfirm();
        }
    };
    const onConfirm = () => {
        addNewComponent(component);
        toggleConfirm();
        closeFunc();
    };

    const createListElem = (el, id) => {
        return component.CLASS_NAME !== el.NAME &&
            <div className={classes.elem} key={id} onClick={() => handleSelect(el)}>
                {el.NAME}
            </div>;
    };

    return (
        <div className={classes.wrapper}>
            <button className={classes.close_button} onClick={closeFunc}/>
            <div className={classes.title}>INFORMATION ABOUT NEW COMPONENT</div>
            <div className={classes.input_box}>
                <div className={classes.field_wrapper}>
                    <input
                        className={classes.input_component}
                        placeholder={"Component Name"}
                        name={"name"}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.field_wrapper}>
                    <input
                        className={classes.input_component}
                        placeholder={"Component Units"}
                        name={"measure"}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.field_wrapper}>
                    <div className={classes.dropdown}>
                        <div
                            className={displayDropdown ? classes.buttonOpened : classes.buttonClosed}
                            onClick={()=>toggleDropdown(this)}
                            style={{color: (component.CLASS_NAME === "") ? "#959595" : "#000000"}}
                        >
                            {component.CLASS_NAME === "" ? "Сategory" : component.CLASS_NAME}
                        </div>
                        {
                            displayDropdown &&
                            <div className={classes.listWrapper}>
                                {classesList.map((el, id) => createListElem(el, id))}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={classes.buttons_area}>
                <button className={classes.continue_button} onClick={() => onAdd()}>ADD</button>
            </div>
            {
                displayConfirm &&
                <Modal>
                    <ConfirmComponent onCancel={toggleConfirm} onConfirm={onConfirm}/>
                </Modal>
            }
        </div>
    );
};

export default AddNewComponent;
