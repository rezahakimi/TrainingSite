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
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { green } from "@mui/material/colors";
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
import MyButton from "../myBase/myButton";

const initialArticleState = {
  id: "",
  title: "",
  abstract: "",
  content: "",
  createdDate: "",
  lastModifyDate: "",
  createdUserId: "",
  //createdUser: "",
  categories: [],
};

const ArticlemanagerDialog = ({
  openModalProp,
  modalModeProp,
  handleCloseModalProp,
  idProp,
  userInfo,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  //isAllowed={!!user && user.roles.includes("ROLE_ADMIN")}

  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { data: users = [] } = useGetAllUsersQuery();

  const {
    data: articleCats = [],
    isLoading: isArticleCatLoading,
    isFetching: isArticleCatFetching,
  } = useGetAllArticleCatsQuery();

  const {
    data: article,
    isLoading: isArticleLoading,
    isFetching: isArticleFetching,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetArticleByIdQuery(
    idProp /* {
    skip: !openModalProp,
  } */,
    { refetchOnMountOrArgChange: true }
  ); //, { skip: fetchArticle });
  //console.log(idProp);
  //console.log(article);
  const [articleDisplayModal, setDisplayArticleModal] =
    useState(initialArticleState);

  const [editorAbstract, setEditorAbstract] = useState("");
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (modalModeProp === "update" && article) {
      // console.log(article);
      const x = {
        id: article.id,
        title: article.title,
        abstract: article.abstract,
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
      setDisplayArticleModal({
        id: article.id,
        title: article.title,
        createdDate: article.createdDate,
        lastModifyDate: article.lastModifyDate,
        createdUserId: article.createdUserId,
        //createdUser: article.createdUser,
        categories: article.categories,
      });
      setEditorAbstract(article.abstract);
      setEditorContent(article.content);
      //console.log(article);
    } else {
      initialArticleState.createdUserId = userInfo.id;
      setDisplayArticleModal(initialArticleState);
      setEditorAbstract("");
      setEditorContent("");
    }
  }, [article, modalModeProp]);
  // [article, modalModeProp, fetchArticle]);

  const handleSubmmit = async () => {
    if (modalModeProp === "update") {
      let xx = {
        id: articleDisplayModal.id,
        title: articleDisplayModal.title,
        abstract: editorAbstract,
        content: editorContent,
        userid: articleDisplayModal.createdUserId,
        categories: articleDisplayModal.categories.map((c) => {
          return c.id;
        }),
      };
      //console.log(xx);
      const res = await updateArticle(xx).unwrap();
      //console.log(articleDisplayModal);

      if (res) {
        setDisplayArticleModal(initialArticleState);
        setEditorAbstract("");
        setEditorContent("");
        handleCloseModalProp();
      }
    } else if (modalModeProp === "add") {
      let xxx = {
        title: articleDisplayModal.title,
        abstract: editorAbstract,
        content: editorContent,
        userid: articleDisplayModal.createdUserId,
        categories: articleDisplayModal.categories.map((c) => {
          return c.id;
        }),
      };
      //console.log(xxx);
      const res = await createArticle(xxx).unwrap();

      if (res) {
        setDisplayArticleModal(initialArticleState);
        setEditorAbstract("");
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
  if (isArticleFetching)
    return <Button variant="text">isArticleFetching -----------</Button>;
  if (isArticleCatFetching)
    return <Button variant="text">isArticleCatFetching -----------</Button>;

  let renderSelectedArticleCats;
  //let selectedArticleCats = [];
  //console.log(articleDisplayModal?.categories);

  /*  if (
    articleDisplayModal.categories !== undefined &&
    articleDisplayModal.categories.length > 0
  ) {
    selectedArticleCats = articleCats.filter((ac) =>
      articleDisplayModal.categories.some((item) => item.id === ac.id)
    ); */
  //.map(i=>i.id);
  //console.log(selectedArticleCats);
  //}

  //if (selectedArticleCats?.length > 0) {
  //console.log(articleDisplayModal);
  //console.log(articleCats);
  //  console.log(selectedArticleCats);

  renderSelectedArticleCats = (
    <Autocomplete
      sx={{ mt: 2 }}
      multiple
      id="tags-filled"
      options={articleCats}
      value={articleDisplayModal.categories || []}
      freeSolo
      isOptionEqualToValue={(option, val) => option.id === val.id}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.title}
            {...getTagProps({ index })}
          />
        ));
      }}
      getOptionLabel={(option) => option.title || ""}
      onChange={(event, newValue) => {
        //console.log(newValue);
        setDisplayArticleModal((prevPostsData) => {
          return {
            ...prevPostsData,
            categories: newValue.map((nv) => nv),
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

  let renderSelectedUser = null;
  if (!!userInfo && userInfo.roles.includes("ROLE_ADMIN")) {
    renderSelectedUser = (
      <Autocomplete
        id="user-select"
        sx={{ mt: 2 }}
        value={
          users.find((u) => u.id === articleDisplayModal.createdUserId) || {}
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
        getOptionLabel={(option) => option.firstname + option.lastname || ""}
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
    );
  }
  return (
    <>
      <Dialog open={openModalProp} onClose={handleCloseModalProp} fullScreen>
        <DialogTitle>Article Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Insert article details.</DialogContentText>

          {renderSelectedArticleCats}
          {renderSelectedUser}

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
            data={editorAbstract || ""}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorAbstract(data);
              /* setDisplayArticleModal({
                ...articleDisplayModal,
                content: editor.getData(),
              });
              console.log({ event, editor, data }); */
            }}
          />

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
          <MyButton onClick={handleCloseModalProp}>Cancel</MyButton>
          <MyButton onClick={handleSubmmit}>Save</MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
//);

export default ArticlemanagerDialog;
