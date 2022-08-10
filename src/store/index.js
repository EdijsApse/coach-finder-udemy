import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index";
import requestsModule from "./modules/requests/index";
import authModule from "./modules/auth/index";

export default createStore({
  modules: {
    coachesModule,
    requestsModule,
    authModule
  }
})