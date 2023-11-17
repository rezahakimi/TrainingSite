import React, { useEffect, useRef, useState } from "react";
import {
  useGetAllArticlesQuery,
  useDeleteArticleMutation,
} from "../../slices/articleApiSlice";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArticlemanagerDialog from "./articlemanagerDialog";

const ArticleManager = () => {
  // const childRef = useRef(null);
  const { data: articles = [] } = useGetAllArticlesQuery();
  const [deleteArticle] = useDeleteArticleMutation();
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [id, setId] = useState("");
  //const [fetchArticleMain, setFetchArticleMain] = useState(true);
  //console.log(user)

  const columns = [
    {
      field: "createdUser",
      headerName: "نویسنده",
      width: 150,
    },
    {
      field: "title",
      headerName: "عنوان مقاله",
      width: 250,
    },
    {
      field: "content",
      headerName: "متن",
      width: 550,
    },
    {
      field: "actions2",
      headerName: " ",
      editable: true,
      flex: 1,
      renderCell: (params) => (
        <Typography noWrap>
          <Tooltip title="jbjb" arrow>
            <IconButton
              color="primary"
              onClick={(e) => onDisplayUpdateModalButtonClick(e, params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            color="primary"
            onClick={(e) => onDisplayDeleteModalButtonClick(e, params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
      ),
    },
  ];

  useEffect(() => {}, [id]);

  const onDisplayUpdateModalButtonClick = async (e, row) => {
    e.stopPropagation();
    setModalMode("update");
    setId(row.id);
    setOpenModal(true);
    // setFetchArticleMain(false);
  };

  const onDisplayAddModalButtonClick = (e) => {
    setModalMode("add");
    //childRef.current.handleSetDisplayUserModal({});
    setOpenModal(true);
  };

  const onDisplayDeleteModalButtonClick = async (e, row) => {
    deleteArticle(row.id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div style={{ height: 700, width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={(e) => onDisplayAddModalButtonClick(e)}
            >
              مقاله جدید
            </Button>
          </Stack>
          <DataGrid
            rows={articles}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[4]}
            getRowId={(row) => row.id}
            /* loading         
          {...users} */
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </div>
      <ArticlemanagerDialog
        openModalProp={openModal}
        modalModeProp={modalMode}
        handleCloseModalProp={handleCloseModal}
        idProp={id}
        /* fetchArticle={fetchArticleMain} */
        /* ref={childRef} */
      ></ArticlemanagerDialog>
    </>
  );
};

export default ArticleManager;
