"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { MoreHorizontal, Search } from "lucide-react";

import { AdminDataTable } from "./AdminDataTable";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import {
  useAdminUsers,
  useDeleteAdminUser,
  useUpdateAdminUser,
} from "@/features/admin/hooks/use-admin";
import {
  AdminUserRow,
  AdminUsersQuery,
  UpdateAdminUserPayload,
} from "@/features/admin/interfaces/admin.interfaces";
import {
  RoleType,
  RoleTypes,
} from "@/features/user/interfaces/user.interfaces";

type AdminUsersTabProps = {
  isActive: boolean;
};

const userColumns = [
  { key: "uuid", label: "USER ID" },
  { key: "identity", label: "NAME / EMAIL" },
  { key: "role", label: "ROLE" },
  { key: "tokens", label: "TOKEN BALANCE / USAGE" },
  { key: "generations", label: "GENERATIONS (IMAGE / VIDEO)" },
  { key: "projects", label: "PROJECTS / FINAL PROJECTS" },
  { key: "created_at", label: "CREATED AT" },
  { key: "actions", label: "ACTIONS" },
];

export function AdminUsersTab({ isActive }: AdminUsersTabProps) {
  const [usersQuery, setUsersQuery] = useState<AdminUsersQuery>({
    page: 1,
    limit: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const [usersSearchInput, setUsersSearchInput] = useState("");

  const [editingUser, setEditingUser] = useState<AdminUserRow | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [userToDelete, setUserToDelete] = useState<AdminUserRow | null>(null);

  const [editForm, setEditForm] = useState<UpdateAdminUserPayload>({
    email: "",
    full_name: "",
    phone: null,
    role: RoleTypes.USER,
    credits_balance: 0,
  });

  const { data: usersData, isLoading: usersLoading } = useAdminUsers(
    usersQuery,
    { enabled: isActive },
  );

  const { mutate: updateUser, isPending: isUpdatingUser } =
    useUpdateAdminUser();

  const { mutate: deleteUser, isPending: isDeletingUser } =
    useDeleteAdminUser();

  const userControls = (
    <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:items-end lg:flex lg:w-auto lg:min-w-0 lg:flex-1 lg:flex-wrap lg:justify-end lg:gap-2">
      <Input
        className="min-w-0 sm:col-span-2 lg:max-w-xs lg:flex-1"
        placeholder="Search user id, name, or email"
        startContent={<Search className="size-4 text-default-400" />}
        value={usersSearchInput}
        onValueChange={setUsersSearchInput}
      />
      <Select
        aria-label="Sort users by"
        className="min-w-0 w-full sm:min-w-0 lg:w-44"
        selectedKeys={[usersQuery.sort_by ?? "created_at"]}
        onSelectionChange={(keys) =>
          setUsersQuery((prev) => ({
            ...prev,
            page: 1,
            sort_by: Array.from(keys)[0] as AdminUsersQuery["sort_by"],
          }))
        }
      >
        <SelectItem key="created_at">Newest</SelectItem>
        <SelectItem key="full_name">Name</SelectItem>
        <SelectItem key="email">Email</SelectItem>
        <SelectItem key="role">Role</SelectItem>
        <SelectItem key="credits_balance">Credit Balance</SelectItem>
      </Select>
      <Button
        className="w-full sm:w-auto"
        variant="flat"
        onPress={() =>
          setUsersQuery((prev) => ({
            ...prev,
            page: 1,
            sort_order: prev.sort_order === "asc" ? "desc" : "asc",
          }))
        }
      >
        {usersQuery.sort_order === "asc" ? "Ascending" : "Descending"}
      </Button>
      <Button
        className="w-full sm:col-span-2 sm:w-auto lg:col-span-1"
        onPress={() =>
          setUsersQuery((prev) => ({
            ...prev,
            page: 1,
            search: usersSearchInput.trim() || undefined,
          }))
        }
      >
        Search
      </Button>
    </div>
  );

  const openEditModal = (user: AdminUserRow) => {
    setEditingUser(user);

    setEditForm({
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role as RoleType,
      credits_balance: user.credits_balance,
    });
  };

  const closeEditModal = () => {
    setEditingUser(null);
  };

  const onSaveUser = () => {
    if (!editingUser) {
      return;
    }

    updateUser(
      {
        userUuid: editingUser.uuid,
        payload: {
          ...editForm,
          credits_balance: Number(editForm.credits_balance) || 0,
          phone:
            editForm.phone && editForm.phone.trim().length
              ? editForm.phone
              : null,
        },
      },
      {
        onSuccess: () => {
          closeEditModal();
        },
      },
    );
  };

  const onDeleteUser = () => {
    if (!userToDelete) {
      return;
    }

    deleteUser(userToDelete.uuid, {
      onSuccess: () => {
        setIsDeleteConfirmOpen(false);

        setUserToDelete(null);
      },
    });
  };

  return (
    <div className="mt-4">
      <AdminDataTable<AdminUserRow>
        columns={userColumns}
        controls={userControls}
        emptyContent="No users found."
        isLoading={usersLoading}
        limit={usersData?.limit ?? usersQuery.limit ?? 10}
        page={usersData?.page ?? usersQuery.page ?? 1}
        renderCell={(row, columnKey) => {
          if (columnKey === "uuid") return row.uuid;

          if (columnKey === "identity") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">{row.full_name}</span>
                <span className="text-xs text-default-500">{row.email}</span>
              </div>
            );
          }

          if (columnKey === "role") {
            return <Chip variant="flat">{row.role}</Chip>;
          }

          if (columnKey === "tokens") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">
                  {row.credits_balance.toLocaleString()} balance
                </span>
                <span className="text-xs text-default-500">
                  {row.token_usage.toLocaleString()} used
                </span>
              </div>
            );
          }

          if (columnKey === "actions") {
            return (
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User row actions">
                  <DropdownItem key="edit" onPress={() => openEditModal(row)}>
                    Edit user
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onPress={() => {
                      setUserToDelete(row);

                      setIsDeleteConfirmOpen(true);
                    }}
                  >
                    Delete user
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            );
          }

          if (columnKey === "generations") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">
                  {(row.image_generations ?? 0).toLocaleString()} images
                </span>
                <span className="text-xs text-default-500">
                  {(row.video_generations ?? 0).toLocaleString()} videos
                </span>
              </div>
            );
          }

          if (columnKey === "projects") {
            return (
              <div className="flex flex-col">
                <span className="font-medium">
                  {(row.projects_count ?? 0).toLocaleString()} projects
                </span>
                <span className="text-xs text-default-500">
                  {(row.final_projects_count ?? 0).toLocaleString()} final
                </span>
              </div>
            );
          }

          return new Date(row.created_at).toLocaleString();
        }}
        rows={usersData?.items ?? []}
        title="Users"
        total={usersData?.total ?? 0}
        onPageChange={(page) => setUsersQuery((prev) => ({ ...prev, page }))}
      />

      <Modal
        isOpen={Boolean(editingUser)}
        onOpenChange={(isOpen) => !isOpen && closeEditModal()}
      >
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <div className="grid gap-3">
              <Input
                isDisabled
                label="User ID"
                value={editingUser?.uuid ?? ""}
              />
              <Input
                label="Full Name"
                value={editForm.full_name}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, full_name: value }))
                }
              />
              <Input
                label="Email"
                type="email"
                value={editForm.email}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, email: value }))
                }
              />
              <Input
                label="Phone"
                value={editForm.phone ?? ""}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, phone: value || null }))
                }
              />
              <Select
                label="Role"
                selectedKeys={[editForm.role]}
                onSelectionChange={(keys) =>
                  setEditForm((prev) => ({
                    ...prev,
                    role: Array.from(keys)[0] as RoleType,
                  }))
                }
              >
                <SelectItem key={RoleTypes.USER}>USER</SelectItem>
                <SelectItem key={RoleTypes.ADMIN}>ADMIN</SelectItem>
                <SelectItem key={RoleTypes.SUPER_ADMIN}>SUPER_ADMIN</SelectItem>
                <SelectItem key={RoleTypes.SUPPORT}>SUPPORT</SelectItem>
              </Select>
              <Input
                label="Credits Balance"
                type="number"
                value={String(editForm.credits_balance)}
                onValueChange={(value) =>
                  setEditForm((prev) => ({
                    ...prev,
                    credits_balance: Number(value) || 0,
                  }))
                }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={closeEditModal}>
              Cancel
            </Button>
            <Button
              color="primary"
              isLoading={isUpdatingUser}
              onPress={onSaveUser}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ConfirmationModal
        confirmColor="danger"
        confirmText="Delete User"
        description={`Delete ${userToDelete?.email ?? "this user"} and all associated projects/assets from cloud storage? This action cannot be undone.`}
        isLoading={isDeletingUser}
        isOpen={isDeleteConfirmOpen}
        title="Delete User"
        onClose={() => {
          setIsDeleteConfirmOpen(false);

          setUserToDelete(null);
        }}
        onConfirm={onDeleteUser}
      />
    </div>
  );
}
