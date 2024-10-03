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
  useCreateArticleCatMutation,
  useGetArticleCatByIdQuery,
  useUpdateArticleCatMutation,
} from "../../../slices/articleCatApiSlice";
import { useSelector } from "react-redux";

const initialArticleCatState = {
  id: "",
  title: "",
 };

const ArticleCatmanagerDialog = ({
  openModalProp,
  modalModeProp,
  handleCloseModalProp,
  idProp,
  fetchArticleCat,
}) => {
  const [createArticleCat] = useCreateArticleCatMutation();
  const [updateArticleCat] = useUpdateArticleCatMutation();

  const {
    data: articleCat,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
    isFetching: isGetFetching,
  } = useGetArticleCatByIdQuery(idProp, { skip: fetchArticleCat });

  const [articleCatDisplayModal, setDisplayArticleCatModal] =
    useState(initialArticleCatState);

  useEffect(() => {
    if (modalModeProp === "update" && articleCat) {
      const x = {
        id: articleCat.id,
        title: articleCat.title,
      };
      setDisplayArticleCatModal(
        x
      );
    } else {
      setDisplayArticleCatModal(initialArticleCatState);
    }
  }, [articleCat, modalModeProp, fetchArticleCat]);

  const handleSubmmit = async () => {
    if (modalModeProp === "update") {
      const res = await updateArticleCat({
        id: articleCatDisplayModal.id,
        title: articleCatDisplayModal.title,
      }).unwrap();
      console.log(articleCatDisplayModal);

      if (res) {
        setDisplayArticleCatModal(initialArticleCatState);
        handleCloseModalProp();
      }
    } else if (modalModeProp === "add") {
      const res = await createArticleCat({
        title: articleCatDisplayModal.title,
      }).unwrap();

      if (res) {
        setDisplayArticleCatModal(initialArticleCatState);
        handleCloseModalProp();
      }
    }
  };

  if (isGetLoading && !articleCat)
    return <Button variant="text">loading -----------</Button>;
  return (
    <>
      <Dialog open={openModalProp} onClose={handleCloseModalProp}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            label="عنوان"
            margin="dense"
            id="title"
            type="title"
            fullWidth
            variant="standard"
            value={articleCatDisplayModal.title || ""}
            onChange={(e) =>
              setDisplayArticleCatModal({
                ...articleCatDisplayModal,
                title: e.target.value,
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

export default ArticleCatmanagerDialog;
