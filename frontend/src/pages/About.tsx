import { Link } from "react-router-dom";
import gebre from "../../public/assets/gebre.jpg";
const About = () => {
  return (
    <div className="flex flex-col space-y-20">
      <section className="container ">
        <div className="container px-6 py-5 mx-auto">
          <div className="items-center md:flex">
            <div className="w-full md:w-1/2">
              <div className="md:max-w-md">
                <h1 className="text-3xl  font-bold text-[#1F284F] dark:text-white md:text-4xl">
                  Behind the name and estabilishment why equb
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  The Equb System redefines savings in the digital era,
                  fostering collective prosperity through democratized access
                  and community collaboration, reshaping financial cooperation.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
              <img
                src="equb1.jpg"
                alt="Logo"
                className="w-full h-full md:max-w-3xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
          <div className="flex flex-col items-start bg-white shadow-lg p-6 rounded-lg mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl text-[#1F284F] font-bold mb-2 md:mb-4">
              Vision
            </h2>
            <p className="text-gray-600 text-left">
              The Equb System redefines savings in the digital era, fostering
              collective prosperity through democratized access and community
              collaboration, reshaping financial cooperation.
            </p>
          </div>
          <div className="flex flex-col items-start bg-white shadow-lg p-6 rounded-lg mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl text-[#1F284F] font-bold mb-2 md:mb-4">
              Mission
            </h2>
            <p className="text-gray-600 text-left">
              The Equb System redefines savings in the digital era, fostering
              collective prosperity through democratized access and community
              collaboration, reshaping financial cooperation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 md:text-xl dark:text-gray-400">
              At Equb system, we pride ourselves on our diverse and talented
              team, united by a shared passion for project mission or values.
              Get to know the individuals behind our success, each bringing
              unique expertise and dedication to their roles.
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            <div className="items-center bg-gray-50 rounded-lg shadow md:flex dark:bg-gray-800 dark:border-gray-700">
              <Link to="">
                <img
                  className="w-full rounded-lg md:rounded-none md:rounded-l-lg"
                  src="data:image/jpeg;base64,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"
                  alt="Jese Avatar"
                />
              </Link>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to="">Chalachew Tsegaye</Link>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  CEO & Web Developer
                </span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  As CEO, he provides strategic leadership and direction,
                  guiding our team towards achieving our mission and goals.
                </p>
                <ul className="flex space-x-4 md:mt-0">
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow md:flex dark:bg-gray-800 dark:border-gray-700">
              <Link to="">
                <img
                  className="w-full rounded-lg md:rounded-none md:rounded-l-lg"
                  src="data:image/jpeg;base64,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"
                  alt="Bonnie Avatar"
                />
              </Link>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to="#">Muluken Demis</Link>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">CTO</span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  As the CTO, he is responsible for overseeing the development
                  and implementation of our technology roadmap, ensuring that
                  our products and services are built on the latest advancements
                  in technology.
                </p>
                <ul className="flex space-x-4 md:mt-0">
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow md:flex dark:bg-gray-800 dark:border-gray-700">
              <Link to="">
                <img
                  className="w-full rounded-lg md:rounded-none md:rounded-l-lg"
                  src="data:image/jpeg;base64,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"
                  alt="Michael Avatar"
                />
              </Link>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to="">Nathnael Chilot</Link>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Full-stack Developer
                </span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  he is our skilled Full-stack Developer, proficient in both
                  front-end and back-end technologies.
                </p>
                <ul className="flex space-x-4 md:mt-0">
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow md:flex dark:bg-gray-800 dark:border-gray-700">
              <Link to="">
                <img
                  className="w-full rounded-lg md:rounded-none md:rounded-l-lg"
                  src={gebre}
                  alt="Sofia Avatar"
                />
              </Link>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to="">G/hiwot agumass</Link>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Marketing & Sale
                </span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  he is our dynamic Marketing & Sales specialist, spearheading
                  our company's efforts to connect with customers and drive
                  revenue growth.
                </p>
                <ul className="flex space-x-4 md:mt-0">
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
