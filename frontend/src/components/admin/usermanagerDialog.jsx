import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRegisterUserMutation } from "../../slices/userApiSlice";

const UsermanagerDialog = forwardRef(
  ({ openModalProp, modalModeProp, handleCloseModalProp }, ref) => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const [userDisplayModal, setDisplayUserModal] = useState({
      nationalId: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      age: "",
      gender: "",
    });

    useImperativeHandle(ref, () => ({
      handleSetDisplayUserModal() {
        setDisplayUserModal({});
      },
    }));

    const handleSubmmit = async () => {
      if (modalModeProp === "update") {
        /*  userService
            .update(userDisplayModal.id, {
              firstName: userDisplayModal.firstName,
              lastName: userDisplayModal.lastName,
              mobile: userDisplayModal.mobile,
              email: userDisplayModal.email,
              age: userDisplayModal.age,
              gender: userDisplayModal.gender,
            })
            .then((response) => {
              let user = response.data.userData;
              //setUsers((prevState)=>[...prevState, user]);
              const newUpdatedUsers = users.map((obj) => {
                if (obj._id === userDisplayModal.id) {
                  return {
                    ...obj,
                    firstName: userDisplayModal.firstName,
                    lastName: userDisplayModal.lastName,
                    mobile: userDisplayModal.mobile,
                    email: userDisplayModal.email,
                    age: userDisplayModal.age,
                    gender: userDisplayModal.gender,
                  };
                }
                return obj;
              });
              setUsers(newUpdatedUsers);
              setAlertMessageSnackBar("با موفقیت ثبت شد.");
              setOpenSnackBar(true);
              setOpenModal(false);
            })
            .catch(function (error) {
              console.log(error);
            }); */
      } else if (modalModeProp === "add") {
        console.log(userDisplayModal);
        const res = await registerUser({
          firstname: userDisplayModal.firstName,
          lastname: userDisplayModal.lastName,
          email: userDisplayModal.email,
          phone: userDisplayModal.phone,
          password: userDisplayModal.password,
        }).unwrap();

        if (res) {
          handleCloseModalProp();
        }
        /*           userService
            .create({
              password: ,
              firstname: ,
              lastname: ,
              email: ,
              phone: ,
            })
            .then((response) => {
              let user = response.data.userData;
              setUsers((prevState) => [...prevState, user]);
              setOpenModal(false);
            })
            .catch(function (error) {
              console.log(error);
            }); */
      }
    };
    return (
      <Dialog open={openModalProp} onClose={handleCloseModalProp}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
          </DialogContentText>
          {modalModeProp === "add" && (
            <>
              {/*  <TextField
                label="کد ملی"
                margin="dense"
                id="nationalId"
                type="nationalId"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setDisplayUserModal({
                    ...userDisplayModal,
                    nationalId: e.target.value,
                  })
                }
              /> */}
              <TextField
                label="کلمه رمز"
                margin="dense"
                id="password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setDisplayUserModal({
                    ...userDisplayModal,
                    password: e.target.value,
                  })
                }
              />
            </>
          )}
          <TextField
            autoFocus
            label="نام"
            margin="dense"
            id="firstName"
            type="firstName"
            fullWidth
            variant="standard"
            defaultValue={userDisplayModal.firstName || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            label="نام خانوادگی"
            margin="dense"
            id="lastName"
            type="lastName"
            fullWidth
            variant="standard"
            defaultValue={userDisplayModal.lastName || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                lastName: e.target.value,
              })
            }
          />
          <TextField
            label="موبایل"
            margin="dense"
            id="phone"
            type="phone"
            fullWidth
            variant="standard"
            defaultValue={userDisplayModal.phone || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                phone: e.target.value,
              })
            }
          />
          <TextField
            label="پست الکترونیکی"
            margin="dense"
            id="email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={userDisplayModal.email || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                email: e.target.value,
              })
            }
          />
          {/*  <TextField
            label="سن"
            margin="dense"
            id="age"
            type="age"
            fullWidth
            variant="standard"
            defaultValue={userDisplayModal.age || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                age: e.target.value,
              })
            }
          />
          <RadioGroup
            row
            label="جنسیت"
            aria-labelledby="demo-radio-buttons-group-label"
            value={userDisplayModal.gender || ""}
            name="radio-buttons-group"
            onChange={(e) => {
              setDisplayUserModal({
                ...userDisplayModal,
                gender: e.target.value,
              });
            }}
          >
            <FormControlLabel value="مرد" control={<Radio />} label="مرد" />
            <FormControlLabel value="زن" control={<Radio />} label="زن" />
          </RadioGroup> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalProp}>Cancel</Button>
          <Button onClick={handleSubmmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default UsermanagerDialog;
