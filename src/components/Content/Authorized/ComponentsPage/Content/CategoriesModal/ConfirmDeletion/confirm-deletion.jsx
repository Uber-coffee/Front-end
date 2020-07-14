import React from "react";

import classes from "./confirm-deletion.module.css";

const ConfirmDeletion = ({onCancel, onConfirm}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.text_wrapper}>
                Confirm the deletion of a category.
            </div>
            <button className={classes.cancel} onClick={onCancel}>
                cancel
            </button>
            <button className={classes.confirm} onClick={onConfirm}>
                confirm
            </button>
        </div>
    );
};

export default ConfirmDeletion;