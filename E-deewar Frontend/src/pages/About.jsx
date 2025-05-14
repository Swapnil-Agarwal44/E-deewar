import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      {/* Section Title */}
      <h1 className="text-center mb-4">About Techno Clubs Portal</h1>

      {/* Introduction Section */}
      <section className="mb-5">
        <h3>🌟 Our Mission</h3>
        <p>
          The **Techno Clubs Portal** is designed to **revolutionize** student-led 
          tech communities by creating a **unified digital ecosystem**. Whether you're a 
          student, a club admin, or a system administrator, our platform **simplifies club 
          management, enhances collaboration, and ensures transparency** in operations.
        </p>
      </section>

      {/* Core Features */}
      <section className="mb-5">
        <h3>🚀 Key Features</h3>
        <ul>
          <li><strong>📌 Unified Membership Hub:</strong> Manage multi-club enrollments with ease.</li>
          <li><strong>📅 Event Lifecycle Automation:</strong> Plan, execute, and analyze events effortlessly.</li>
          <li><strong>🧠 AI-Powered Credit System:</strong> Track student participation and contributions automatically.</li>
          <li><strong>🔐 Secured Resource Governance:</strong> Manage club assets and documentation securely.</li>
          <li><strong>📊 Intelligent Documentation:</strong> Auto-generate reports, minutes, and archives.</li>
          <li><strong>💬 Community Forum:</strong> Foster discussions and collaborations among tech enthusiasts.</li>
        </ul>
      </section>

      {/* Why It Matters */}
      <section className="mb-5">
        <h3>💡 Why It Matters</h3>
        <p>
          Many tech clubs **struggle with fragmented communication, inefficient event logistics, 
          and outdated management processes**. Our platform eliminates these issues by integrating 
          **automation, AI, and real-time analytics** into one seamless experience.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h3>🔗 Get Started Today!</h3>
        <p>Join the revolution in student-led tech communities. <strong>Sign up now</strong> and transform your club experience!</p>
        <a href="/register" className="btn btn-primary">Join Now</a>
      </section>
    </div>
  );
}

export default About;
