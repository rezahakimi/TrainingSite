import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  Checkbox,
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
  FormGroup,
} from "@mui/material";
import {
  useRegisterUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetAllRolesQuery,
} from "../../slices/userApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";

const initialFormState = {
  id: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  roles: [
    {
      id: "",
      name: "",
      selected: false,
    },
  ],
};

const UsermanagerDialog =
  //forwardRef(
  ({ openModalProp, modalModeProp, handleCloseModalProp, idProp }) =>
    //, ref
    {
      //const [isUser, setIsUser] = useState(true);

      const [registerUser] = useRegisterUserMutation();
      const [updateUser] = useUpdateUserMutation();
      const { data: qroles = [] } = useGetAllRolesQuery();

      const {
        data: user,
        isLoading: isGetLoading,
        isSuccess: isGetSuccess,
        isError: isGetError,
        error: getError,
        isFetching: isGetFetching,
      } = useGetUserByIdQuery(idProp, { pollingInterval: 3000 }); // ?? skipToken);

      const [userDisplayModal, setDisplayUserModal] =
        useState(initialFormState);

      /*       setTimeout(() => {
        setIsUser(false);
      }, 5000); */

      useEffect(() => {
        //console.log(isUser);
        if (modalModeProp === "update" && user && user.roles) {
          setDisplayUserModal({
            id: user.id,
            password: user.password,
            firstName: user.firstname,
            lastName: user.lastname,
            phone: user.phone,
            email: user.email,
            roles: qroles.map((role) => ({
              id: role.id,
              name: role.name,
              selected: user.roles.some((r) => r.id === role.id),
            })),
          });
        } else {
          initialFormState.roles = qroles.map((role) => ({
            id: role.id,
            name: role.name,
            selected: false,
          }));
          setDisplayUserModal(initialFormState);
        }
        //if (user) console.log(user.roles[0].id);
      }, [user, modalModeProp, qroles]);

      //useImperativeHandle(ref, () => ({
      //   handleSetDisplayUserModal() {
      //setDisplayUserModal({});

      //  },
      //}));

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
          const res = await updateUser({
            id: user.id,
            firstname: userDisplayModal.firstName,
            lastname: userDisplayModal.lastName,
            phone: userDisplayModal.phone,
            roles: userDisplayModal.roles
              .filter((i) => i.selected)
              .map((i) => i.name),
          }).unwrap();

          if (res) {
            setDisplayUserModal(initialFormState);
            handleCloseModalProp();
          }
        } else if (modalModeProp === "add") {
          //console.log(userDisplayModal);
          const res = await registerUser({
            firstname: userDisplayModal.firstName,
            lastname: userDisplayModal.lastName,
            email: userDisplayModal.email,
            phone: userDisplayModal.phone,
            password: userDisplayModal.password,
            roles: userDisplayModal.roles
              .filter((i) => i.selected)
              .map((i) => i.name),
          }).unwrap();

          if (res) {
            setDisplayUserModal(initialFormState);
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

      const handleChange = (event) => {
        setDisplayUserModal((prevUser) => {
          // return { ...prevUser, roles: [...prevUser.roles, {selected: event.target.checked}] };
          return {
            ...prevUser,
            roles: prevUser.roles.map((role) => {
              return role.id === event.target.value
                ? { ...role, selected: event.target.checked }
                : role;
            }),
          };
        });
      };

      let CheckBoxRender = "";
      if (userDisplayModal) {
        CheckBoxRender = userDisplayModal.roles.map((role) => {
          // if (user && user.roles) {
          //const even = user.roles.find((r) => r.id === role.id);
          // console.log(userDisplayModal);

          //console.log(user);
          // if (even)
          return (
            <FormControlLabel
              key={role.id}
              control={
                <Checkbox checked={role.selected} onChange={handleChange} />
              }
              label={role.name}
              value={role.id}
            />
          );
        });
      }
      console.log(isGetLoading)
      if (isGetLoading && !user) return <Button variant="text">Text</Button>
      return (
        <>
          <Dialog open={openModalProp} onClose={handleCloseModalProp}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here.
              </DialogContentText>
              <FormGroup>{CheckBoxRender}</FormGroup>

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
                value={userDisplayModal.firstName || ""}
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
                value={userDisplayModal.lastName || ""}
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
                value={userDisplayModal.phone || ""}
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
                value={userDisplayModal.email || ""}
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
        </>
      );
    };
//);

export default UsermanagerDialog;
