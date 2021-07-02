import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import setupAxiosInterceptors from "./app/config/axios-interceptor";
import { SubheaderProvider, BrandingProvider } from "./_ui/layout";
import store from "./app/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ConfigurationRepository from "./app/repositories/configuration/configurationRepository";
import Utils from "./app/utils/utils";

const abp = window.abp;

setupAxiosInterceptors();

ReactDOM.render(
  <Provider store={store}>
    <SubheaderProvider>
      <BrandingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BrandingProvider>
    </SubheaderProvider>
  </Provider>,
  document.getElementById("root")
);

// ConfigurationRepository.getAll().then((data) => {
//   console.log(data);
//   Utils.extend(true, abp, data.data.result);
//   abp.clock.provider = Utils.getCurrentClockProvider(
//     data.data.result.clock.provider
//   );

//   ReactDOM.render(
//     <Provider store={store}>
//       <SubheaderProvider>
//         <BrandingProvider>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </BrandingProvider>
//       </SubheaderProvider>
//     </Provider>,
//     document.getElementById("root")
//   );

//   serviceWorker.unregister();
// });
