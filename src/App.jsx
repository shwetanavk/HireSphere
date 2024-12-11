import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  //Add new Job
  const addJob = async (newJob) => {
    await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    return;
  };

  const deleteJob = async (id) => {
    console.log(id);
    await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    });
  };

  const updateJob = async (updatedJob) => {
    await fetch(`${API_BASE_URL}/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" index element={<JobsPage />} />
        <Route
          path="/edit-job/:id"
          index
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />{" "}
        <Route
          path="/jobs/:id"
          index
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/add-job"
          index
          element={<AddJobPage AddJobSubmit={addJob} />}
        />
        <Route path="*" index element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
