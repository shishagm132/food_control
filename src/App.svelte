<script>
  import "./app.css";
  import { Router, Link, Route } from "svelte-routing";
  import HomeIcon from "./assets/HomeIcon.svg?component";
  import HistoryIcon from "./assets/History.svg?component";
  import FoodsIcon from "./assets/FoodsIcon.svg?component";
  import AddCircleIcon from "./assets/AddCircleIcon.svg?component";
  import SettingsIcon from "./assets/SettingsIcon.svg?component";

  import * as routes from "./routes";

  import {
    BottomNavigation,
    NavigationName as NavName,
  } from "./components/BottomNavigation";

  export let url = "";
</script>

<Router {url}>
  <main>
    <Route path="/" component={routes.MainView} />
    <Route path="/history" component={routes.History} />
    <Route path="/foods" component={routes.FoodsList} />
    <Route path="/settings" component={routes.Settings} />
  </main>
  <BottomNavigation>
    <Link
      to="/"
      type="button"
      class="peer inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <HomeIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>Главная</NavName>
    </Link>
    <Link
      to="/foods"
      type="button"
      class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <FoodsIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>Продукты</NavName>
    </Link>
    <Link
      to="/history"
      type="button"
      class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <HistoryIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>История</NavName>
    </Link>
    <Link
      to="/settings"
      type="button"
      class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <SettingsIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>Настройки</NavName>
    </Link>
  </BottomNavigation>
</Router>
<div class="fixed bottom-16 right-0 p-5">
  <button
    class="bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center"
  >
    <AddCircleIcon
      height="36px"
      width="36px"
      class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    />
  </button>
</div>

<style>
  :global([aria-current="page"] > *) {
    @apply text-blue-600;
  }
</style>
