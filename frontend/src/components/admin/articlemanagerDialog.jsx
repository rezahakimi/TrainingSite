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
  OutlinedInput,
  Select,
  InputLabel,
  MenuItem,
  Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTheme } from '@mui/material/styles';
import {
  useCreateArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
} from "../../slices/articleApiSlice";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";
import { useGetAllArticleCatsQuery } from "../../slices/articleCatApiSlice";
import CustomizedHook from "../common/tagautocomplete";


const initialArticleState = {
  id: "",
  title: "",
  content: "",
  createdDate: "",
  lastModifyDate: "",
  createdUserId: "",
  createdUser: "",
  categories: []
};

const ArticlemanagerDialog = ({
  openModalProp,
  modalModeProp,
  handleCloseModalProp,
  idProp,
  fetchArticle,
}) => {
  const theme = useTheme();
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { data: users = [] } = useGetAllUsersQuery();

  const { data: articleCats = [], isLoading: isArticleCatLoading } =
    useGetAllArticleCatsQuery();

  const {
    data: article,
    isLoading: isArticleLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
    isFetching: isGetFetching,
  } = useGetArticleByIdQuery(idProp, { skip: fetchArticle });

  const [articleDisplayModal, setDisplayArticleModal] =
    useState(initialArticleState);

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
        categories: article.categories
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
  //console.log(articleDisplayModal);

  const handleSubmmit = async () => {
    console.log(articleDisplayModal)

    if (modalModeProp === "update") {
      // console.log(articleDisplayModal);

      const res = await updateArticle({
        id: articleDisplayModal.id,
        title: articleDisplayModal.title,
        content: articleDisplayModal.content,
        userid: articleDisplayModal.createdUserId,
        categories: articleDisplayModal.categories
      }).unwrap();
      //console.log(articleDisplayModal);

      if (res) {
        setDisplayArticleModal(initialArticleState);
        handleCloseModalProp();
      }
    } else if (modalModeProp === "add") {
      const res = await createArticle({
        title: articleDisplayModal.title,
        content: articleDisplayModal.content,
        userid: articleDisplayModal.createdUserId,
        categories: articleDisplayModal.categories
      }).unwrap();

      if (res) {
        setDisplayArticleModal(initialArticleState);
        handleCloseModalProp();
      }
    }
  };

  if (isArticleLoading && !article)
    return <Button variant="isArticleLoading">loading -----------</Button>;
  if (isArticleCatLoading)
    return <Button variant="isArticleCatLoading">loading -----------</Button>;
    //console.log(articleCats.filter(ac => articleDisplayModal.categories.some(item => item === ac.id)).map(i=>i.id))
    let selectedArticleCats = articleCats.filter(ac => articleDisplayModal.categories.some(item => item === ac.id)
    );
    //.map(i=>i.id);
    let renderSelectedArticleCats;

    //if (selectedArticleCats?.length > 0) {
      renderSelectedArticleCats = <Autocomplete
        multiple
        id="tags-filled"
        options={articleCats}
        value ={selectedArticleCats} 
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.title} {...getTagProps({ index })} />
          ))
        }
        getOptionLabel={(option) =>
          option.title || ""
        }
        onChange={(event, newValue) => {
          setDisplayArticleModal((prevPostsData) => {
            return {
              ...prevPostsData,
              categories: newValue.map(nv=>nv.id),
            };
          }); 
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      />
   // }

  return (
    <>
      <Dialog open={openModalProp} onClose={handleCloseModalProp}>
        <DialogTitle>Article Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert article details.
          </DialogContentText>

{renderSelectedArticleCats}

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
                {option.firstname + " "} {option.lastname}
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
