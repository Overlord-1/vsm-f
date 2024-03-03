import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

// const Login = () => {
//   const [teamCode, setTeamCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginErr, setLoginErr] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/auth/login", {
//         teamCode,
//         password,
//       });

//       const token = response.data.data.token;
//       console.log("Login Successful! Token:", token);
//     } catch (error) {
//       console.error("Login Failed:", error.response?.data);
//       setLoginErr(true);
//     }
//   };

//   return (
//     <>
//       <div className="main flex mx-auto items-center justify-center h-screen flex-col bg-gradient-to-b from-slate-700 to-white">
//         <div className="flex mx-auto items-center justify-center md:justify-center h-screen flex-col">
//           <h1 className="text-6xl mb-7 mainText font-bold uppercase">
//             VSM 2024
//           </h1>
//           <form
//             className="flex flex-col justify-center items-center"
//             onSubmit={handleLogin}
//           >
//             <input
//               type="text"
//               placeholder="Team code"
//               value={teamCode}
//               onChange={(e) => setTeamCode(e.target.value)}
//               className="bg-black p-5 rounded-xl m-3"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="p-5 bg-black rounded-xl m-3"
//             />
//             <button
//               type="submit"
//               className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 active:scale-110 active:bg-indigo-500 duration-300 w-[150px]  p-5 rounded-xl"
//             >
//               Login
//             </button>
//             {loginErr && (
//               <p className="text-red-500 text-center mt-3">
//                 Invalid team code or password
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

const Login = () => {
  const navigate = useNavigate();
  const [teamCode, setTeamCode] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email:teamCode,
        password:password,
      });

      const token = response.data.data.token;
      console.log("Login Successful! Token:", token);
      localStorage.setItem("authToken", token);
      setLoginErr(false); // Reset loginErr on successful login
      navigate("/loading");
    } catch (error) {
      console.error("Login Failed:", error.response?.data);
      setLoginErr(true);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main flex mx-auto items-center justify-center h-screen flex-col bg-gradient-to-b from-slate-700 to-white">
      <div className="flex mx-auto items-center justify-center md:justify-center h-screen flex-col">
        <h1 className="text-6xl mb-7 mainText font-bold uppercase">VSM 2024</h1>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="E-mail"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            className="bg-black p-5 rounded-xl m-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-5 bg-black rounded-xl m-3"
          />
          <button
            type="submit"
            className={`transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 active:scale-110 active:bg-indigo-500 duration-300 w-[150px]  p-5 rounded-xl ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {loginErr && (
            <p className="text-red-500 text-center bg-black p-2 rounded-lg mt-3">
              ⚠️ Invalid team code or password
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
