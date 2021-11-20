import { useLocation } from "react-router";

interface PopularProps {}

const Popular: React.FunctionComponent<PopularProps> = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return <div>Popular</div>;
};

export default Popular;
