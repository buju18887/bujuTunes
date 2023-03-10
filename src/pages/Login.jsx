import { FaHeadphones, FaSpotify } from "react-icons/fa";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=b7a585475c4847eb87196c1ae984624e&response_type=code&redirect_uri=https://bujutunes.onrender.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function Login() {
  return (
    <div className=" text-gray-300">
      <div className="w-1/3 rounded-lg absolute right-20 h-5/6 object-cover top-14 overflow-hidden shadow-lg shadow-purple-900">
        <img src="cover2.jpeg" alt="picture" />
      </div>
      <div className="p-5 w-2/3">
        <h1 className="text-lg text-gray-200 flex items-center gap-1 font-bold">
          <FaHeadphones />
          bujuTunes
        </h1>
        <div className="mt-32 pr-32 pl-10">
          <h1 className="font-extrabold text-3xl text-yellow-400">
            Your Ultimate Destination for All Things Music
          </h1>
          <p className="pt-5 pr-10 text-lg">
            Our music streaming website offers a vast collection of music across
            all genres, constantly updated with the latest releases. Our
            user-friendly interface makes it easy to search for tracks, create
            playlists, and connect with other music lovers. The platform is
            available on all devices, so you can enjoy your favorite tunes
            anywhere and anytime. Join us today for the ultimate music listening
            experience!
          </p>
          <div className="mt-24">
            <a href={AUTH_URL} className="btn flex gap-1 items-center w-48">
              <FaSpotify />
              LOGIN WITH SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
