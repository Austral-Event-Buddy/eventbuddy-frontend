import {useLocation} from "react-router-dom";
import {Routes} from "./routes";

export const useRoute = () => {
    const location = useLocation();

    return Object.keys(Routes).find(key => Routes[key] === location.pathname) || null;
}