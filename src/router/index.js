import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/Home";
import Question from "@/page/Question";
import Result from "@/page/Result";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/question",
      name: "Question",
      component: Question
    },
    {
      path: "/result",
      name: "Result",
      component: Result
    }
  ]
});
