import { Button } from "@radix-ui/themes";
import { BiHome } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import notFound from "@assets/Not Found.svg";

export default function NotFound() {
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <img src={notFound} alt="not found" className="w-96 mx-auto" />
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-gray-700 dark:text-white">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground text-gray-500 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital wilderness. Don't worry though – let's get you back on track
            to your financial learning journey!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => router(-1)}
            variant="soft"
            size={"3"}
            radius="medium"
            className="group hover:bg-muted/50 transition-all duration-300"
          >
            <BsArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </Button>
          <Button
            asChild
            size={"3"}
            radius="medium"
            className="bg-gradient-to-r from-crimson-600 to-emerald-600 hover:from-crimson-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/">
              <BiHome className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team or visit our{" "}
            <Link
              to="/contact"
              className="text-crimson-600 hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300 underline underline-offset-4"
            >
              help center
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
