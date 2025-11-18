import Navbar from "./Navbar";
import AdminDashboard from "./AdminDashboard";
import Footer from "./Footer";

export default function Admin() {
  return (
 <div className="d-flex flex-column min-vh-100">
  <Navbar />

  <div className="flex-grow-1 p-3 bg-light mt-20">
    <AdminDashboard />
  </div>

  <Footer />
</div>
  );
}
