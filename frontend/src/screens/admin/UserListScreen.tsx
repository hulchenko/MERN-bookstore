import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import { UserInterface } from "../../interfaces/user.interface";
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/usersApiSlice";
import { APIError } from "../../types/api-error.type";
import { apiErrorHandler } from "../../utils/errorUtils";

const UserListScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageNum = searchParams.get("page") || "1";
  const { data, refetch, isLoading, error } = useGetUsersQuery({ pageNum });
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        toast.success("User removed");
        refetch();
      } catch (error) {
        apiErrorHandler(error);
      }
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message color="danger" title="Error" description={(error as APIError)?.data?.message} />;

  return (
    <>
      <h1 className="text-lg font-bold py-4">Users</h1>
      <Table className="mb-2">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Admin</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No users found."}>
          {data?.users?.map((user: UserInterface) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? <FaCheck style={{ color: "green" }} /> : <FaTimes style={{ color: "red" }} />}</TableCell>
              <TableCell className="flex gap-2">
                {!user.isAdmin && (
                  <>
                    <Button color="primary" variant="faded" onClick={() => navigate(`/admin/user/${user._id}/edit`)}>
                      Edit
                    </Button>
                    <Button color="danger" variant="bordered" onClick={() => deleteHandler(user._id || "")}>
                      <FaTrash />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          )) || []}
        </TableBody>
      </Table>
      <Paginate pages={data?.pages} currPage={data?.page} />
    </>
  );
};

export default UserListScreen;
