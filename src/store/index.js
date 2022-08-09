import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index";
import requestsModule from "./modules/requests/index";

export default createStore({
  modules: {
    coachesModule,
    requestsModule
  }
})