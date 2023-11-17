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
  Chip,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTheme } from "@mui/material/styles";
import {
  useCreateArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
} from "../../slices/articleApiSlice";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";
import { useGetAllArticleCatsQuery } from "../../slices/articleCatApiSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const initialArticleState = {
  id: "",
  title: "",
  content: "",
  createdDate: "",
  lastModifyDate: "",
  createdUserId: "",
  createdUser: "",
  categories: [],
};

const ArticlemanagerDialog = ({
  openModalProp,
  modalModeProp,
  handleCloseModalProp,
  idProp,
  //fetchArticle,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

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
  } = useGetArticleByIdQuery(idProp, { pollingInterval: 3000 }); //, { skip: fetchArticle });

  const [articleDisplayModal, setDisplayArticleModal] =
    useState(initialArticleState);
  const [editorContent, setEditorContent] = useState("");

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
        categories: article.categories,
      };
      /* setDisplayArticleModal(
          (existingValues) => ({
            ...existingValues,
            id: article.id,
            title: article.title,
            content: article.content,
            createdDate: article.createdDate,
            lastModifyDate: article.lastModifyDate,
            createdUserId: article.createdUserId,
            createdUser: article.createdUser,
            categories: article.categories,
          })
        ); */
      // console.log(article.categories);
      setDisplayArticleModal({
        id: article.id,
        title: article.title,
        createdDate: article.createdDate,
        lastModifyDate: article.lastModifyDate,
        createdUserId: article.createdUserId,
        createdUser: article.createdUser,
        categories: article.categories,
      });
      setEditorContent(article.content);
      //console.log(article);
    } else {
      setDisplayArticleModal(initialArticleState);
      setEditorContent("");
    }
  }, [article, modalModeProp]);
  // [article, modalModeProp, fetchArticle]);

  const handleSubmmit = async () => {
    if (modalModeProp === "update") {
      // console.log(articleDisplayModal);

      const res = await updateArticle({
        id: articleDisplayModal.id,
        title: articleDisplayModal.title,
        content: editorContent,
        userid: articleDisplayModal.createdUserId,
        categories: articleDisplayModal.categories,
      }).unwrap();
      //console.log(articleDisplayModal);

      if (res) {
        setDisplayArticleModal(initialArticleState);
        setEditorContent("");
        handleCloseModalProp();
      }
    } else if (modalModeProp === "add") {
      const res = await createArticle({
        title: articleDisplayModal.title,
        content: editorContent,
        userid: articleDisplayModal.createdUserId,
        categories: articleDisplayModal.categories,
      }).unwrap();

      if (res) {
        setDisplayArticleModal(initialArticleState);
        setEditorContent("");
        handleCloseModalProp();
      }
    }
  };

  if (isArticleLoading)
    return <Button variant="text">isArticleLoading -----------</Button>;
  if (isArticleCatLoading)
    return <Button variant="text">isArticleCatLoading -----------</Button>;
  if (!article) return <Button variant="text">Article -----------</Button>;

  let renderSelectedArticleCats;
  let selectedArticleCats = [];
  //console.log(articleDisplayModal?.categories);

  if (
    articleDisplayModal.categories !== undefined &&
    articleDisplayModal.categories.length > 0
  ) {
    selectedArticleCats = articleCats.filter((ac) =>
      articleDisplayModal.categories.some((item) => item === ac.id)
    );
    //.map(i=>i.id);
    console.log(selectedArticleCats);
  }

  //if (selectedArticleCats?.length > 0) {
  renderSelectedArticleCats = (
    <Autocomplete
      sx={{ mt: 2 }}
      multiple
      id="tags-filled"
      options={articleCats}
      value={selectedArticleCats || null}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      getOptionLabel={(option) => option.title || ""}
      onChange={(event, newValue) => {
        setDisplayArticleModal((prevPostsData) => {
          return {
            ...prevPostsData,
            categories: newValue.map((nv) => nv.id),
          };
        });
      }}
      renderInput={(params) => (
        <TextField {...params} label="freeSolo" placeholder="Tags" />
      )}
    />
  );
  // }

  // console.log(articleDisplayModal.createdUser);
  // console.log(articleDisplayModal.title);
  // console.log(articleDisplayModal);

  return (
    <>
      <Dialog open={openModalProp} onClose={handleCloseModalProp} fullScreen>
        <DialogTitle>Article Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert article details.</DialogContentText>

          {renderSelectedArticleCats}

          <Autocomplete
            id="user-select"
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
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
          {/*    <TextField
          sx={{ mt: 2}}
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
            multiline
            rows={8}
          /> */}

          {/* <ReactQuill
            value={articleDisplayModal.content || ""}
            modules={modules}
            onChange={(v) =>
              setDisplayArticleModal({
                ...articleDisplayModal,
                content: v,
              })
            }
            theme="snow"
          /> */}

          <CKEditor
            editor={ClassicEditor}
            data={editorContent || ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
              /* setDisplayArticleModal({
                ...articleDisplayModal,
                content: editor.getData(),
              });
              console.log({ event, editor, data }); */
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalProp}>Cancel</Button>
          <Button onClick={handleSubmmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
//);

export default ArticlemanagerDialog;
