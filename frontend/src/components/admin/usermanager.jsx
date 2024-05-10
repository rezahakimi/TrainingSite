import React, { useEffect, useRef, useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";
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
import UsermanagerDialog from "./usermanagerDialog";

const UserManager = () => {
  // const childRef = useRef(null);
  const {
    data: users = [],
    isLoading: isGetUsersLoading,
    isSuccess: isGetUsersSuccess,
    isError: isGetUsersError,
    error: getGetUsersError,
    isFetching: isGetUsersFetching,
  } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [id, setId] = useState("");

  //console.log(user)

  const columns = [
    /* {
      field: "nationalId",
      headerName: "کد ملی",
    }, */
    {
      field: "firstname",
      headerName: "نام",
      width: 250,
    },
    {
      field: "lastname",
      headerName: "نام خانوادگی",
      width: 250,
    },
    {
      field: "phone",
      headerName: "موبایل",
    },
    {
      field: "email",
      headerName: "پست الکترونیکی",
    },
    {
      field: "roles",
      headerName: "نقش",
    },
    /* {
      field: "age",
      headerName: "سن",
    },
    {
      field: "gender",
      headerName: "جنسیت",
    }, */
    /* ,
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    } */
    {
      field: "actions2",
      headerName: "Actions2",
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
    //console.log(id)
    /* userService
      .get(row._id)
      .then((response) => {
        let user = response.data.userData;
        setDisplayUserModal({
          id: user._id,
          nationalId: user.nationalId,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          mobile: user.mobile,
          email: user.email,
          age: user.age,
          gender: user.gender,
        }); */

    setOpenModal(true);
    /*  })
      .catch(function (error) {
        console.log(error);
      }); */
  };

  const onDisplayAddModalButtonClick = (e) => {
    setModalMode("add");
    //childRef.current.handleSetDisplayUserModal({});
    setOpenModal(true);
  };

  const onDisplayDeleteModalButtonClick = async (e, row) => {
    deleteUser(row.id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  if (isGetUsersLoading && !users) {
    return <div>Loading...</div>;
  }
  if (isGetUsersFetching) {
    return <div>Fetching...</div>;
  }
  if (isGetUsersError) {
    return <div>Message: {getGetUsersError}</div>;
  }
  return (
    /*     <h2>
      {user.map((item) => (
        <div>
        <div>{item.firstname }</div>
        <div>{item.phone }</div>
        <div>{item.roles }</div>
        </div>
      ))}
    </h2> */
    <>
      <div style={{ height: 700, width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            {/* <Button size="small" onClick={removeRow}>
              Remove a row
            </Button> */}
            {/* <Button size="small" onClick={addRow}>
              Add a row
            </Button> */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={(e) => onDisplayAddModalButtonClick(e)}
            >
              کاربر جدید
            </Button>
          </Stack>
          <DataGrid
            rows={users}
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
      <UsermanagerDialog
        openModalProp={openModal}
        modalModeProp={modalMode}
        handleCloseModalProp={handleCloseModal}
        idProp={id}
        /* ref={childRef} */
      ></UsermanagerDialog>
    </>
  );
};

export default UserManager;
