import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

// Define Props interface to specify the type of props expected by the component
// In TypeScript, interfaces are used to define the structure of objects, including the props passed to React components.
// Here, we're defining an interface named Props. It has one property called "children", which is expected to be of type React.ReactNode.
// React.ReactNode is a type that represents any valid JSX expression, such as JSX elements, strings, or fragments.
interface Props {
  children: React.ReactNode; // The children prop allows the component to render its child components or elements
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;