import React, { useEffect, useRef, useState } from "react";
import {
  useGetAllArticleCatsQuery,
  useDeleteArticleCatMutation,
} from "../../slices/articleCatApiSlice";
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
import ArticleCatmanagerDialog from "./articleCatmanagerDialog";

const ArticlePostManager = () => {
  // const childRef = useRef(null);
  const { data: articleCats = [] } = useGetAllArticleCatsQuery();
  const [deleteArticleCat] = useDeleteArticleCatMutation();
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [id, setId] = useState("");
  const [fetchArticleCatMain, setFetchArticleCatMain] = useState(true);
  //console.log(user)

  useEffect(() => {}, [id]);

  const onDisplayUpdateModalButtonClick = async (e, row) => {
    e.stopPropagation();
    setModalMode("update");
    setId(row.id);
    setOpenModal(true);
    setFetchArticleCatMain(false);
  };

  const onDisplayAddModalButtonClick = (e) => {
    setModalMode("add");
    //childRef.current.handleSetDisplayUserModal({});
    setOpenModal(true);
  };

  const onDisplayDeleteModalButtonClick = async (e, row) => {
    deleteArticleCat(row.id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div style={{ height: 700, width: "100%" }}></div>
    </>
  );
};

export default ArticlePostManager;
