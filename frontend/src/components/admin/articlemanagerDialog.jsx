import React, { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import {
  useCreateArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
} from "../../slices/articleApiSlice";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";

const initialArticleState = {
  id: "",
  title: "",
  content: "",
  createdDate: "",
  lastModifyDate: "",
  createdUserId:"",
  createdUser: "",
};

const ArticlemanagerDialog = ({
  openModalProp,
  modalModeProp,
  handleCloseModalProp,
  idProp,
}) => {
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { data: users = [] } = useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = React.useState(null);

  const {
    data: article,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
    isFetching: isGetFetching,
  } = useGetArticleByIdQuery(idProp);

  const [userDisplayModal, setDisplayUserModal] = useState(initialArticleState);
  console.log(article)

  useEffect(() => {
    if (modalModeProp === "update" && article) {
      setDisplayUserModal({
        id: article.id,
        title: article.title,
        content: article.content,
        createdDate: article.createdDate,
        lastModifyDate: article.lastModifyDate,
        createdUserId: article.createdUserId,
        createdUser: article.createdUser,
      });
      //setSelectedUser(article.createdUserId);
    } else {
      setDisplayUserModal(initialArticleState);
    }
  }, [article, modalModeProp]);

  const handleSubmmit = async () => {
    if (modalModeProp === "update") {
      const res = await updateArticle({
        id: userDisplayModal.id,
        title: userDisplayModal.title,
        content: userDisplayModal.content,
      }).unwrap();

      if (res) {
        setDisplayUserModal(initialArticleState);
        handleCloseModalProp();
      }
    } else if (modalModeProp === "add") {
      const res = await createArticle({
        title: userDisplayModal.title,
        content: userDisplayModal.content,
        userid: selectedUser.id
      }).unwrap();

      if (res) {
        setDisplayUserModal(initialArticleState);
        handleCloseModalProp();
      }
    }
  };

  if (isGetLoading && !article)
    return <Button variant="text">loading -----------</Button>;
  return (
    <>
      <Dialog open={openModalProp} onClose={handleCloseModalProp}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
          </DialogContentText>
          <Autocomplete
            id="user-select"
            sx={{ width: 300 }}
            value={selectedUser}
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            options={users}
            autoHighlight
            getOptionLabel={(option) => option.firstname + option.lastname}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {/* <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.id.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.id.toLowerCase()}.png`}
                  alt=""
                /> */}
                {option.firstname} {option.lastname}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a user"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            autoFocus
            label="عنوان"
            margin="dense"
            id="title"
            type="title"
            fullWidth
            variant="standard"
            value={userDisplayModal.title || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                title: e.target.value,
              })
            }
          />
          <TextField
            label="متن"
            margin="dense"
            id="content"
            type="content"
            fullWidth
            variant="standard"
            value={userDisplayModal.content || ""}
            onChange={(e) =>
              setDisplayUserModal({
                ...userDisplayModal,
                content: e.target.value,
              })
            }
          />
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

export default ArticlemanagerDialog;
