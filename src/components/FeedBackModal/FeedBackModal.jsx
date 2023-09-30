import React, { useState } from "react";
import styles from "./FeedBackModal.module.css";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { ReactComponent as CrossBtn } from "../../assets/crossBtn.svg";
// import { errorHandler } from "../../config/helper-methods";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FeedBackModal = ({isOpen,  onDismiss }) => {
  const [formFields, setFormFields] = useState({
    fullName: "",
    emailId: "",
    subject: "",
    description: "",
  });
  const _resetState = () => {
		const newFormFields = { ...formFields };
		Object.keys(newFormFields).forEach((key) => (newFormFields[key] = ""));
		setFormFields(newFormFields);
	};

  const handleClose = () => {
    _resetState()
    onDismiss();
  };

  const _onSuccess=()=>{
    handleClose()
    toast.success("Feedback Submitted", "success", {
      position: toast.POSITION.TOP_CENTER,
    });
    // onSuccess()
    // "Feedback Submitted", "success"
  }
  const handleChange = (name, e) => {
    const value = e.target.value;
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
  };

  const handleSubmit=()=>{
    if(!fullName || !emailId || !subject || !description){
      toast.warn("Please fill in all required fields.", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      return;
    }
    _onSuccess()
  }

  const { fullName, emailId, subject, description } = formFields;
  return (
    <div>
      <Modal
        className={styles.modalWrapper}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.wrapper}>
          <div className={styles.header}>
            <h3>Feedback</h3>
            <h4 onClick={handleClose}>{<CrossBtn />}</h4>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Full name"
              value={fullName}
              name="fullName"
              onChange={(e) => {
                handleChange("fullName", e);
              }}
            />
            <input
              type="email"
              className={styles.input}
              placeholder="Email ID"
              value={emailId}
              name="emailId"
              onChange={(e) => {
                handleChange("emailId", e);
              }}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Subject"
              value={subject}
              name="subject"
              onChange={(e) => {
                handleChange("subject", e);
              }}
            />
            <textarea
             
              className={styles.description}
              placeholder="Description"
              value={description}
              name="description"
              onChange={(e) => {
                handleChange("description", e);
              }}
            />
          </div>
          <div>
            <div className={styles.btnContainer} onClick={handleSubmit}>
              Submit Feedback
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedBackModal;
