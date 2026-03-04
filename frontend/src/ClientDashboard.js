import { useEffect, useState } from "react";
import Sidebar from "./sideBar";
import API from "./api";

export default function ClientDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch all jobs (only for demo, later we filter by client)
  const fetchJobs = async () => {
    try {
      const res = await API.get("/job");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/job/create",
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert("Job posted successfully 🚀");

      setForm({
        title: "",
        description: "",
        budget: ""
      });

      fetchJobs(); // refresh job list

    } catch (err) {
      console.log(err);
      alert("Failed to post job");
    }
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">

      <Sidebar role="client" />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">
          Welcome {user?.name}
        </h1>

        {/* Post Job Form */}
        <div className="bg-slate-800 p-6 rounded-lg mb-10">
          <h2 className="text-xl mb-4">Post New Job</h2>

          <form onSubmit={handlePostJob}>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full mb-3 p-3 text-black rounded"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Job Description"
              className="w-full mb-3 p-3 text-black rounded"
              required
            />

            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="Budget"
              className="w-full mb-3 p-3 text-black rounded"
              required
            />

            <button className="bg-blue-600 px-6 py-2 rounded">
              Post Job
            </button>

          </form>
        </div>

        {/* Job List */}
        <div className="bg-slate-800 p-6 rounded-lg">

          <h2 className="text-xl mb-4">My Jobs</h2>

          {jobs.length === 0 && <p>No jobs posted yet.</p>}

          {jobs.map((job) => (
            <div key={job._id} className="border-b border-gray-600 pb-4 mb-4">
              <h3 className="font-semibold">{job.title}</h3>
              <p>{job.description}</p>
              <p>Budget: ₹{job.budget}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}