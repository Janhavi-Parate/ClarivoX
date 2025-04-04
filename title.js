import { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    document.title = "ClarivoX"; // Set title
  }, []); // Runs only once when component mounts

};

export default MyComponent;
