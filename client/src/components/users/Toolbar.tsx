import React from "react";
import { Lock, LockOpen, Trash2 } from "lucide-react";
import { blockUsers, deleteUser, unBlockUsers } from "@/api/user";
import { getUserData, removeToken, removeUserData } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { User } from "@/api/types";

interface Props {
  selected: User[];
  selectAll: boolean;
  setSelected: React.Dispatch<React.SetStateAction<User[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toolbar: React.FC<Props> = ({
  selected,
  selectAll,
  setSelected,
  setLoading,
  setSelectAll,
}) => {
  const router = useRouter();

  const isSelected = selected?.length === 0;

  const handleBlock = async () => {
    setLoading(true);
    let isUserWarning = false;

    const selectedIds = selected.map((item) => item?.id);

    const UserData = getUserData();


    //@ts-ignore
    const isUserBlocked = selected.find((item) => item?.id === UserData);

    if (isUserBlocked?.email) {
      console.log("User is already blocked");
      isUserWarning = true;
    }

    try {
      await blockUsers(selectedIds);
      setSelected([]);
      setSelectAll(false);

      if (isUserWarning) {
        console.log("User is already blocked two");
        removeToken();
        removeUserData();
        if (selectAll) {
          router.push("/login");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async () => {
    setLoading(true);

    const selectedIds = selected.map((item) => item?.id);

    try {
      await unBlockUsers(selectedIds);
      setSelected([]);
      setSelectAll(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    let isUserWarning = false;

    const UserData = getUserData();

    //@ts-ignore

    const isUserBlocked = selected.find((item) => item?.id === UserData);

    const selectedIds = selected.map((item) => item?.id);

    if (isUserBlocked?.email) {
      console.log("User is already blocked");
      isUserWarning = true;
    }

    try {
      await deleteUser(selectedIds);

      setSelected([]);

      if (isUserWarning) {
        console.log("User is already blocked two");
        removeToken();
        removeUserData();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("somothing went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleBlock}
        className={`bg-red-500 flex items-center gap-2 text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer ${
          isSelected ? "cursor-no-drop opacity-75" : ""
        }`}
        disabled={isSelected}
      >
        <Lock className="w-4 h-4" />
        <p className="text-sm">Block</p>
      </button>
      <button
        onClick={handleUnblock}
        type="button"
        disabled={isSelected}
        className={`rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
          isSelected ? "cursor-no-drop opacity-75" : ""
        }`}
      >
        <LockOpen className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        type="button"
        disabled={isSelected}
        className={`rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 shadow-sm cursor-pointer ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
          isSelected ? "cursor-no-drop opacity-75" : ""
        }`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toolbar;
