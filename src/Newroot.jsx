import {BrowserRouter} from "react-router-dom";
const root = createRoot(document.getElementById("root"));
import Routing from './components/Routing/Route'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient()
root.render(
     <BrowserRouter>
        <Routing/>
     </BrowserRouter>
);