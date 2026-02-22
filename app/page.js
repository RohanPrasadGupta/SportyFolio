"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import profilepic from "../public/profile.png";

// Simple LinkArrow component for the download button
const LinkArrow = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={`w-6 ml-1 ${className}`}
    {...rest}
  >
    <path
      fill="currentColor"
      d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
    ></path>
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("profile");

  // Refs for sections
  const sectionRefs = {
    profile: useRef(null),
    experience: useRef(null),
    education: useRef(null),
  };

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      // Determine which section is in view
      const scrollPosition = window.scrollY + 100; // offset for nav

      Object.keys(sectionRefs).forEach((section) => {
        const element = sectionRefs[section].current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation Bar */}
      <nav
        className={`bg-gray-800 p-4 fixed w-full top-0 z-10 shadow-md transition-all duration-300 ${
          scrollPosition > 50 ? "bg-opacity-90" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-yellow-400 cursor-pointer flex items-center justify-center h-10 w-10 bg-gray-700 rounded-full hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
            onClick={scrollToTop}
          >
            S
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-center space-x-6 text-white font-semibold">
            <li>
              <a
                onClick={() => scrollToSection("profile")}
                className={`cursor-pointer hover:text-yellow-400 transition-all px-3 py-2 rounded-md ${
                  activeSection === "profile"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : ""
                }`}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("experience")}
                className={`cursor-pointer hover:text-yellow-400 transition-all px-3 py-2 rounded-md ${
                  activeSection === "experience"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : ""
                }`}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("education")}
                className={`cursor-pointer hover:text-yellow-400 transition-all px-3 py-2 rounded-md ${
                  activeSection === "education"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : ""
                }`}
              >
                Education
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                  isMenuOpen ? "transform rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all ${
                  isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4 px-2 animate-fadeIn">
            <ul className="space-y-4 text-white font-semibold text-center">
              <li>
                <a
                  onClick={() => scrollToSection("profile")}
                  className={`block py-2 hover:text-yellow-400 hover:bg-gray-700 rounded cursor-pointer ${
                    activeSection === "profile"
                      ? "text-yellow-400 bg-gray-700"
                      : ""
                  }`}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("experience")}
                  className={`block py-2 hover:text-yellow-400 hover:bg-gray-700 rounded cursor-pointer ${
                    activeSection === "experience"
                      ? "text-yellow-400 bg-gray-700"
                      : ""
                  }`}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("education")}
                  className={`block py-2 hover:text-yellow-400 hover:bg-gray-700 rounded cursor-pointer ${
                    activeSection === "education"
                      ? "text-yellow-400 bg-gray-700"
                      : ""
                  }`}
                >
                  Education
                </a>
              </li>
              `
            </ul>
          </div>
        )}
      </nav>
      {/* Profile Section */}
      <section
        id="profile"
        ref={sectionRefs.profile}
        className={`min-h-screen pt-20 flex flex-col items-center justify-center px-4 transition-opacity duration-700 ease-in-out ${
          activeSection === "profile" ? "opacity-100" : "opacity-95"
        }`}
      >
        <div
          className={`text-center max-w-5xl transform transition-all duration-700 ${
            activeSection === "profile" ? "translate-y-0" : "translate-y-10"
          }`}
        >
          {/* Profile Header with Image and Contact Icons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            {/* Profile Image */}
            <div className="relative rounded-full overflow-hidden w-40 h-40 border-4 border-gray-800 shadow-lg">
              <Image
                src={profilepic}
                alt="Sima Yadav"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            {/* Contact Icons */}
            <div className="flex flex-col items-start space-y-3">
              <div className="flex items-center hover:translate-x-2 transition-transform duration-300">
                <div className="text-yellow-400 text-xl mr-4">📞</div>
                <div className="text-gray-300 hover:text-white transition-colors">
                  +977-9803756679
                </div>
              </div>
              <div className="flex items-center hover:translate-x-2 transition-transform duration-300">
                <div className="text-yellow-400 text-xl mr-4">📧</div>
                <div className="text-gray-300 hover:text-white transition-colors">
                  sy.sima.yadav@gmail.com
                </div>
              </div>
              <div className="flex items-center hover:translate-x-2 transition-transform duration-300">
                <div className="text-yellow-400 text-xl mr-4">📍</div>
                <div className="text-gray-300 hover:text-white transition-colors">
                  Narephat, Jadibutti, Nepal
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sima-yadav-a78b8220b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white hover:bg-blue-600 h-9 w-9 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <span className="text-lg font-bold">in</span>
                </a>
                {/* Email */}
                <a
                  href="mailto:sy.sima.yadav@gmail.com"
                  className="bg-gray-700 text-white hover:bg-red-600 h-9 w-9 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Send Email"
                >
                  <span className="text-lg">✉️</span>
                </a>
                {/* Updated Resume Download Link */}
                <Link
                  href="/SIMA_YADAV(CV.).pdf"
                  target="_blank"
                  className="flex items-center bg-gray-800 text-yellow-400 p-1.5 px-3 rounded-md text-sm font-semibold hover:bg-yellow-400 hover:text-gray-900 border-2 border-solid border-transparent hover:border-yellow-500 transition-all"
                  download={true}
                >
                  Resume <LinkArrow />
                </Link>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-2">SIMA YADAV</h1>
          <p className="text-xl text-gray-400 mb-6">
            HUMAN RESOURCES ASSISTANT
          </p>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              PROFILE
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed text-justify">
              Motivated and detail-oriented HR professional with more than 1 year
              of experience in recruitment, onboarding, and employee support,
              combined with 2 years of expertise in customer service. Skilled in
              building strong professional relationships, managing
              administrative processes, and ensuring a positive employee and
              client experience. Known for adaptability, problem-solving,
              handling staff concerns with empathy to foster a positive and
              collaborative workplace culture and delivering results in
              fast-paced environments. Eager to contribute to organizational
              growth through effective HR practices and people-focused
              solutions.
            </p>
          </div>

          {/* Skills & Proficiencies integrated into profile section */}
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
              SKILLS & PROFICIENCIES
            </h2>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Professional Skills */}
              <div className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-white text-lg mb-3 border-b border-gray-700 pb-2">
                  PROFESSIONAL SKILLS
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "Communication Skills",
                    "Problem Solving",
                    "Teamwork",
                    "Time Management",
                    "Attention to Detail",
                    "Onboarding",
                    "Offboarding",
                    "Critical Thinking",
                    "Training",
                    "Payroll",
                    "Recruiting",
                    "Record Maintenance",
                    "Performance Appraisal",
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-2 text-yellow-400">✓</div>
                      <span className="text-gray-300 text-sm whitespace-nowrap">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-white text-lg mb-3 border-b border-gray-700 pb-2">
                  LANGUAGES
                </h3>
                <ul className="space-y-3">
                  {[
                    { lang: "English", level: "Fluent" },
                    { lang: "Nepali", level: "Fluent" },
                    { lang: "Hindi", level: "Fluent" },
                    { lang: "Maithili", level: "Fluent" },
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300">
                      <div className="flex justify-between mb-1">
                        <span>{item.lang}</span>
                        <span className="text-yellow-400 text-sm">
                          {item.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full w-full"></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Software Skills */}
              <div className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="font-bold text-white text-lg mb-3 border-b border-gray-700 pb-2">
                  SOFTWARE SKILLS
                </h3>
                <div className="flex flex-wrap gap-1.5 justify-start">
                  {[
                    "Microsoft Office Suite",
                    "HRIS Proficiency",
                    "SPSS",
                    "SmartPLS",
                    "HTML",
                    "CSS",
                    "Adobe Photoshop",
                    "Canva",
                    "Microsoft Teams",
                    "Linkus",
                    "Zoom",
                    "Elementix Media"
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section
        id="experience"
        ref={sectionRefs.experience}
        className={`min-h-screen py-20 px-4 transition-opacity duration-700 ease-in-out ${
          activeSection === "experience" ? "opacity-100" : "opacity-95"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto transform transition-all duration-700 ${
            activeSection === "experience" ? "translate-y-0" : "translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-12">
            WORK EXPERIENCE
          </h2>

          {/* Experience 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl">
              Greenhill Education Group Pty Ltd (Australia )
            </h3>
            <p className="text-gray-400 italic mb-4">
              HR & Admin Officer (Remote - Nepal) (December 2024 – November 2025)
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Provide HR and administrative support across multiple institutes
                under Greenhill, including RGIT Australia, Ultimate Institute of
                Australia (UIA), and Evolve Education and Migration (Australia &
                Nepal).
              </li>
              <li>
                Led the implementation of HR policies aligned with business
                objectives, culture, and industry standards, fostering a
                positive and inclusive workplace.
              </li>

              <li>
                Designed and executed a performance review process based on Key
                Performance Indicators (KPIs) and Key Result Areas (KRAs).
              </li>

              <li>
                Streamlined the entire recruitment process, reducing
                time-to-hire by 20%, through enhanced job descriptions,
                postings, candidate screening, interviewing. onboarding and
                induction sessions.
              </li>
              <li>
                Helped new staff by providing them required resources, set-up
                their workstation and supported to login into the system.
              </li>

              <li>
                Updated the employee handbook to reflect current legal
                requirements and company values.
              </li>
              <li>
                Collaborated with senior management to align HR strategies with
                long-term business goals.
              </li>
              <li>
                Benchmarked HR practices against industry standards, ensuring
                Greenhill remains competitive.
              </li>

              <li>
                Implemented performance improvement plans (PIPs) for
                underperforming staff, resulting in a 15% increase in overall
                productivity.
              </li>

              <li>
                Prepared contracts, sponsorship letters, warning letters,
                variation letters and onboarding materials for staffs,
                applicants and clients.
              </li>
              <li>
                Maintained accurate records of applicants, staffs, and clients.
                Communicated and coordinated with national and international
                client for 407,482 and 500 visa.
              </li>
              <li>Conducted training for staffs.</li>
              <li>Handled conflicts that arises between staff members.</li>
              <li>Maintained accurate leave records of staffs.</li>
              <li>
                Manage office supplies, vendor coordination, and facility
                maintenance to ensure a well-functioning workspace.
              </li>
              <li>
                Conducted refreshment party for the refreshment of the staffs.
              </li>
            </ul>
          </div>

          {/* Experience 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl">
              E. Vidhya Pvt. Ltd.
            </h3>
            <p className="text-gray-400 italic mb-4">
              Human Resource Intern (March 2023 - May 2023)
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Assisted in end-to-end recruitment processes, from drafting job
                postings to coordinating interviews and following up with
                candidates.
              </li>
              <li>
                Supported the onboarding of new employees by preparing
                orientation materials and coordinating induction sessions.
              </li>
              <li>
                Maintained and updated employee records, including personal
                information, attendance, and leave management.
              </li>
              <li>
                Conducted employee feedback sessions to gather insights on
                workplace satisfaction and identify areas for improvement.
              </li>
              <li>Prepared HR documents like job descriptions.</li>
              <li>
                Contributed creative ideas and organized fun activities, such as
                games, for a New Year party to boost employee engagement.
              </li>
            </ul>
          </div>

          {/* Experience 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl">
              Foodie Woodie Pvt. Ltd.
            </h3>
            <p className="text-gray-400 italic mb-4">
              Human Resource Assistant (July 2019 - June 2021)
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Supported the recruitment process by assisting with job postings
                and interviews.
              </li>
              <li>
                Assisted in scheduling interviews and coordinating with
                candidates for open positions.
              </li>
              <li>
                Handled customer calls and inquiries, ensuring high-quality
                service and customer satisfaction.
              </li>
              <li>
                Assisted customers with placing, modifying, or canceling food
                delivery orders through both phone and online platforms, and
                updating records promptly to maintain accuracy.
              </li>
              <li>
                Investigated and resolved issues related to delayed or incorrect
                deliveries in coordination with delivery personnel.
              </li>
              <li>
                Maintained up-to-date records of delivery staff and stocks.
              </li>
              <li>
                Collaborated with delivery personnel to resolve real-time
                challenges and ensure customer satisfaction.
              </li>
              <li>
                Actively participated in employee engagement initiatives,
                including conducting feedback sessions and addressing workplace
                concerns.
              </li>
            </ul>
          </div>

          {/* Experience 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl">
              Online Saathi Pvt. Ltd.
            </h3>
            <p className="text-gray-400 italic mb-4">
              Intern Web Developer (Feb 2021 - May 2021)
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                Acquired practical experience in web development using HTML and
                CSS, translating web design UI/UX concepts into visually
                appealing and functional websites.
              </li>
              <li>
                Collaborated closely with a team of professionals to ensure
                timely project completion while consistently delivering
                high-quality work.
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Education Section */}
      <section
        id="education"
        ref={sectionRefs.education}
        className={`min-h-screen py-20 px-4 transition-opacity duration-700 ease-in-out ${
          activeSection === "education" ? "opacity-100" : "opacity-95"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto transform transition-all duration-700 ${
            activeSection === "education" ? "translate-y-0" : "translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-12">
            EDUCATION
          </h2>

          {/* MBA */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl">
              Master of Business Administration
            </h3>
            <p className="text-gray-400 mb-1">2021 - 2024</p>
            <p className="text-gray-300">
              School of Management | Tribhuvan University
            </p>
            <p className="text-yellow-400 mt-2">GPA: 3.56 / 4.0</p>
          </div>

          {/* BIM */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl">
              Bachelor of Information Management
            </h3>
            <p className="text-gray-400 mb-1">2016 - 2020</p>
            <p className="text-gray-300">
              Nepal Commerce Campus | Tribhuvan University
            </p>
            <p className="text-yellow-400 mt-2">GPA: 3.00 / 4.0</p>
          </div>

          {/* Certifications */}
          <h2 className="text-2xl font-semibold text-yellow-400 text-center mb-8 mt-12">
            CERTIFICATIONS
          </h2>

          {/* SHRM */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="font-bold text-white text-xl flex items-center">
              <span className="text-yellow-400 mr-2">🏆</span>
              SHRM Senior Certified Professional (SHRM-SCP) Udemy Short Courses
            </h3>
            <p className="text-gray-400 mb-1">2025 </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Human Resources Management</span>
              </li>
              <li className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Employee Training & Development</span>
              </li>
              <li className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Performance Management</span>
              </li>
              <li className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Recruitment & Selection</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Footer Bottom */}
          <div className="pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sima Yadav. All Rights Reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Human Resources Professional
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
