import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css"; // Optional: For additional custom styling

function Home() {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div>
      <main className="container my-2">
        <section className="bg-light py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-xxl-8">
                <div className="text-center my-5" data-aos="fade-up">
                  <h2
                    className="display-5 fw-bolder"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <span className="text-gradient d-inline">About Me</span>
                  </h2>
                  <p
                    className="lead fw-light mb-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    My name is MERN CRUD and I Create, Read, Update, & Delete.
                  </p>
                  <p
                    className="text-muted"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    I am a full-stack web application built using the MERN stack
                    (MongoDB, Express.js, React.js, Node.js), following the MVC
                    (Model-View-Controller) architecture. In addition to
                    standard CRUD operations, I now offer enhanced data
                    management features. With soft deletion, records are not
                    permanently removed; instead, they are marked as deleted,
                    allowing you to recover them if needed. This ensures better
                    data retention and compliance, especially for sensitive or
                    critical information. I also include a versioning feature,
                    which captures a snapshot of each record before any update,
                    preserving its previous state. This means you can easily
                    track changes, view the history of edits, and maintain a
                    complete audit trail.
                  </p>
                  <div
                    className="d-flex justify-content-center fs-2 gap-4"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <a className="text-gradient icon-hover" href="#!">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a className="text-gradient icon-hover" href="#!">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a className="text-gradient icon-hover" href="#!">
                      <i className="bi bi-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
