import React, { useState } from "react";
import { Button, Modal, Space, Table, Tag, Typography, message } from "antd";
import type { TableProps } from "antd";

interface DataType {
  id: string;
  name: string;
  email: string;
  age: number;
  contact: number;
  address: string;
}

const CrudLocal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DataType>({} as any);
  const [data, setData] = useState<DataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const showModal = () => {
    setIsModalOpen(true);
    setFormData({} as DataType);
  };

  const handleOk = () => {
    const newData = { ...formData, id: String(Date.now()) };
    if (isEditing) {
      setData(data.map((item) => (item.id === formData.id ? formData : item)));
      message.success("User Updated Successfully");
    } else {
      setData([...data, newData]);
      message.success("User Added Successfully");
    }
    setFormData({} as any);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({} as DataType);
  };

  // handle Delete

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
    message.success("User deleted successfully");
  };

  // handle Delete

  // handle Edit
  const handleEdit = (id: string) => {
    setIsModalOpen(true);
    setIsEditing(true);
    const editedUser = data.find((item: DataType) => item.id === id);

    if (editedUser) {
      setFormData({ ...editedUser });
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",

      render: (name) => <a>{name}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",

      render: (email) => <a>{email}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (age) => <a>{age}</a>,
    },
    {
      title: "Contact",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address: any) => <Typography>{address}</Typography>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button type="primary" onClick={(e: any) => handleEdit(record.id)}>
            Edit
          </Button>
          <Button danger onClick={(e: any) => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5 w-full mt-10 ">
        <div className="text-end">
          <Button className="bg-black text-white " onClick={showModal}>
            Add User
          </Button>
        </div>
        <div className="border rounded">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>

      <Modal
        title="Add User"
        open={isModalOpen}
        onOk={handleOk}
        okText={"Submit"}
        onCancel={handleCancel}>
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Name here..."
              className="w-full px-4  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter Age here..."
              className="w-full px-4  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Email here..."
              className="w-full px-4  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter Contact here..."
              className="w-full px-4  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="contact"
              value={formData.contact || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Address here..."
              className="w-full px-4  py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CrudLocal;
