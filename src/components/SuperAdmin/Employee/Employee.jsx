import { useState, useEffect } from "react";
import { Table } from "antd";
import Header from "../../Header/Header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperSidebar from "../SuperSidebar/SuperSidebar";

const Employee = () => {
  const [view, setView] = useState(true);
  const [employees, setEmployees] = useState([]);

  const employeeId = sessionStorage.getItem('employeeId');
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/employee/all');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error("Failed to fetch employees.");
    }
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Designation",
      dataIndex: "employeeDesignation",
      key: "employeeDesignation",
    },
    {
      title: "Grade",
      dataIndex: "employeeGrade",
      key: "employeeGrade",
    },
    {
      title: "Location",
      dataIndex: "employeeLocation",
      key: "employeeLocation",
    },
    {
      title: "DOJ",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
    {
      title: "Employee Email",
      dataIndex: "employeeEmail",
      key: "employeeEmail",
    },
    {
      title: "Reporting Manager",
      dataIndex: "reportingManager",
      key: "reportingManager",
    },
    {
      title: "Reporting Manager Email",
      dataIndex: "reportingManagerEmailId",
      key: "reportingManagerEmailId",
    },
  ];

  const toggleView = () => {
    setView(!view);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      employeeId: e.target.employeeId.value,
      employeeName: e.target.employeeName.value,
      employeeEmail: e.target.employeeEmail.value,
      employeeContact: e.target.contact.value,
      employeeDepartment: e.target.department.value,
      employeeGrade: e.target.grade.value,
      employeeLocation: e.target.location.value,
      employeeDesignation: e.target.designation.value,
      dateOfJoining: e.target.doj.value,
      reportingManager: e.target.reportingManager.value,
      reportingManagerEmailId: e.target.reportingEmail.value,
    };

    try {
      await axios.post(`http://localhost:8080/api/v1/employee/save?employeeId=${employeeId}`, formData);
      toast.success("Employee added successfully!");

      e.target.reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add employee.");
    }
  };

  return (
    <>
      {view && (
        <>
        <Header/>
        <div className="min-h-screen flex">
          <SuperSidebar/>
          <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4 mt-14">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
                <h2 className="text-2xl font-semibold">Add Employee</h2>
                <button
                  onClick={toggleView}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                >
                  View
                </button>
              </div>
              <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                      Employee ID
                    </label>
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="LD000143"
                    />
                  </div>
                  <div>
                    <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Name
                    </label>
                    <input
                      id="employeeName"
                      name="employeeName"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Human Resources"
                    />
                  </div>
                  <div>
                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Manager"
                    />
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      id="grade"
                      name="grade"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Senior"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label htmlFor="doj" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Joining (DOJ)
                    </label>
                    <input
                      id="doj"
                      name="doj"
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123-456-7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="employeeEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Email
                    </label>
                    <input
                      id="employeeEmail"
                      name="employeeEmail"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="JaneSmith@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="reportingManager" className="block text-sm font-medium text-gray-700 mb-1">
                      Reporting Manager
                    </label>
                    <input
                      id="reportingManager"
                      name="reportingManager"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jane Smith"
                    />
                  </div>
                
                  <div>
                    <label htmlFor="reportingEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Reporting Manager Email
                    </label>
                    <input
                      id="reportingEmail"
                      name="reportingEmail"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="JaneSmith@example.com"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                  onSubmit={handleSubmit}
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                  <ToastContainer/>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
      )}

      {!view && (
        <>
        <Header/>
        <div className="min-h-screen flex">
          <SuperSidebar/>
          <div className="flex-1 bg-gray-100 flex flex-col p-4 mt-14">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
                <h2 className="text-2xl font-semibold">Employee Information</h2>
                <button
                  onClick={toggleView}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                >
                  Add
                </button>
              </div>
              <div className="overflow-x-auto">
                <Table 
                  columns={columns} 
                  dataSource={employees} 
                  rowKey="employeeId"
                  style={{whiteSpace: 'nowrap'}}
                />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Employee;
