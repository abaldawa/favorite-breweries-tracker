import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Offline } from "../shared/components/app-components/offline/offline";
import { breweryContainers } from "../modules/brewery";
import { NotFound } from "../shared/components/app-components/not-found/not-found";
import { Footer } from "../shared/components/app-components/footer/footer";
import { Menu } from "../shared/components/app-components/menu/menu";

const AppRouter = () => (
  <BrowserRouter>
    <Menu>
      <Offline />
      <Routes>
        <Route index element={<breweryContainers.Home />} />
        <Route path="beer">
          <Route index element={<breweryContainers.BeerList />} />
          <Route path=":id" element={<breweryContainers.Beer />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Menu>
  </BrowserRouter>
);

export { AppRouter };
