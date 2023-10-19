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
  createdUserId: "",
  createdUser: "",
};

const ArticlemanagerDialog = ({
  openModalProp,
  modalModeProp,
  handleCloseModalProp,
  idProp,
  fetchArticle,
}) => {
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { data: users = [] } = useGetAllUsersQuery();

  const {
    data: article,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
    isFetching: isGetFetching,
  } = useGetArticleByIdQuery(idProp, { skip: fetchArticle });

  const [articleDisplayModal, setDisplayArticleModal] =
    useState(initialArticleState);
  //console.log(article)
  //console.log(idProp)
  //console.log(fetchArticle)

  useEffect(() => {
    if (modalModeProp === "update" && article) {
      const x = {
        id: article.id,
        title: article.title,
        content: article.content,
        createdDate: article.createdDate,
        lastModifyDate: article.lastModifyDate,
        createdUserId: article.createdUserId,
        createdUser: article.createdUser,
      };
      setDisplayArticleModal(
        /* prevV => {
        const x = {
          id: article.id,
          title: article.title,
          content: article.content,
          createdDate: article.createdDate,
          lastModifyDate: article.lastModifyDate,
          createdUserId: article.createdUserId,
          createdUser: article.createdUser,
        };
        return [ ...prevV, x ];
      } */
        x
      );
    } else {
      setDisplayArticleModal(initialArticleState);
    }
  }, [article, modalModeProp, fetchArticle]);

  const handleSubmmit = async () => {
    if (modalModeProp === "update") {

      console.log(articleDisplayModal);

      const res = await updateArticle({
        id: articleDisplayModal.id,
        title: articleDisplayModal.title,
        content: articleDisplayModal.content,
        userid: articleDisplayModal.createdUserId
      }).unwrap();
      console.log(articleDisplayModal);

      if (res) {
        setDisplayArticleModal(initialArticleState);
        handleCloseModalProp();
      }
    } else if (modalModeProp === "add") {
      const res = await createArticle({
        title: articleDisplayModal.title,
        content: articleDisplayModal.content,
        userid: articleDisplayModal.createdUserId,
      }).unwrap();

      if (res) {
        setDisplayArticleModal(initialArticleState);
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
            value={
              users.find((u) => u.id === articleDisplayModal.createdUserId) ||
            {}
            }
            freeSolo={true}
            onChange={(event, newValue) => {
              setDisplayArticleModal((prevPostsData) => {
                return {
                  ...prevPostsData,
                  createdUserId: newValue.id,
                };
              });
            }}
            options={users}
            autoHighlight
            getOptionLabel={(option) =>
              option.firstname + option.lastname || ""
            }
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
                {option.firstname+ ' '} {option.lastname}
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
            value={articleDisplayModal.title || ""}
            onChange={(e) =>
              setDisplayArticleModal({
                ...articleDisplayModal,
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
            value={articleDisplayModal.content || ""}
            onChange={(e) =>
              setDisplayArticleModal({
                ...articleDisplayModal,
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
