import { logoutAction } from "@/actions/auth";
import { cookies } from "next/headers";
import Link from "next/link";

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <header className="py-4 px-4 shadow">
      <nav className="flex justify-between items-center">
        <h1>
          <Link href={"/"} className="text-xl tracking-wide">
            Todo List App
          </Link>
        </h1>
        <ul className="flex space-x-4">
          {token ? (
            <>
              <li>
                <Link href={"/tasks"} className="hover:underline">
                  My Tasks
                </Link>
              </li>
              <li>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="text-red-600 hover:underline focus:outline-none focus:ring"
                  >
                    Logout
                  </button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/register"} className="hover:underline">
                  Register
                </Link>
              </li>
              <li>
                <Link href={"/login"} className="hover:underline">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
