import { useEffect, useState } from "react";
import Sidebar from "./sideBar.js";
import API from "./api";

export default function FreelancerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/job/all");
    setJobs(res.data);
  };

  // ✅ 👉 PUT handleBid HERE
  const handleBid = async (jobId) => {
    const amount = prompt("Enter your bid amount:");
    const proposal = prompt("Enter your proposal:");

    if (!amount || !proposal) return;

    try {
      await API.post("/bid",
        { jobId, amount, proposal }, {
        headers:
        {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

      alert("Bid submitted successfully 🚀");
    } catch (err) {
      console.log(err);
      alert("Failed to submit bid");
    }
  };

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">

      <Sidebar role="freelancer" />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">
          Welcome {user?.name}
        </h1>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Available Jobs</h2>
            <p className="text-3xl mt-2">{jobs.length}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Active Projects</h2>
            <p className="text-3xl mt-2">0</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Completed</h2>
            <p className="text-3xl mt-2">0</p>
          </div>

        </div>

        {/* Dynamic Job List */}
        <div className="bg-slate-800 p-6 rounded-lg">

          <h2 className="text-xl mb-4">Available Jobs</h2>

          {jobs.length === 0 && (
            <p>No jobs available.</p>
          )}

          {jobs.map((job) => (
          <div key={job._id}>
          <h3>{job.title}</h3>
          <p>₹{job.budget}</p>

          <button
                onClick={() => handleBid(job._id)}
                className="bg-green-600 px-4 py-2 rounded"
          >
      Bid
    </button>
  </div>
))}

        </div>

      </div>
    </div>
  );
}